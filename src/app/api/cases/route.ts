import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createCaseSchema } from '@/lib/validations';
import { v4 as uuidv4 } from 'uuid';

// GET /api/cases — List cases with filters, search, pagination
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
        isArchived: false,
    };

    if (search) {
        where.OR = [
            { caseId: { contains: search, mode: 'insensitive' } },
            { title: { contains: search, mode: 'insensitive' } },
            { clientName: { contains: search, mode: 'insensitive' } },
        ];
    }

    if (status && status !== 'ALL') {
        where.status = status;
    }

    const skip = (page - 1) * limit;

    const [cases, total] = await Promise.all([
        prisma.case.findMany({
            where,
            orderBy: { [sortBy]: sortOrder },
            skip,
            take: limit,
        }),
        prisma.case.count({ where }),
    ]);

    return NextResponse.json({
        cases,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
}

// POST /api/cases — Create a new case
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validatedData = createCaseSchema.parse(body);

        // Generate unique case ID
        const lastCase = await prisma.case.findFirst({
            orderBy: { createdAt: 'desc' },
            select: { caseId: true },
        });

        let nextNumber = 1;
        if (lastCase?.caseId) {
            const match = lastCase.caseId.match(/IBZ-(\d+)/);
            if (match) {
                nextNumber = parseInt(match[1], 10) + 1;
            }
        }
        const caseId = `IBZ-${String(nextNumber).padStart(3, '0')}`;

        const newCase = await prisma.case.create({
            data: {
                id: uuidv4(),
                caseId,
                title: validatedData.title,
                clientName: validatedData.clientName,
                status: validatedData.status || 'OPEN',
                description: validatedData.description || null,
                nextHearingDate: validatedData.nextHearingDate
                    ? new Date(validatedData.nextHearingDate)
                    : null,
                notes: validatedData.notes || null,
            },
        });

        // Log creation
        await prisma.caseUpdateLog.create({
            data: {
                caseId: newCase.id,
                actionType: 'CREATED',
                newValue: JSON.stringify({
                    caseId: newCase.caseId,
                    title: newCase.title,
                    clientName: newCase.clientName,
                    status: newCase.status,
                }),
                updatedBy: session.user?.email || 'admin',
            },
        });

        return NextResponse.json(newCase, { status: 201 });
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validation failed', details: error }, { status: 400 });
        }
        console.error('Error creating case:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
