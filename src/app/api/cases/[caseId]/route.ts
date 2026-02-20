import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateCaseSchema } from '@/lib/validations';

// GET /api/cases/[caseId] — Get single case
export async function GET(
    req: NextRequest,
    { params }: { params: { caseId: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const foundCase = await prisma.case.findUnique({
        where: { caseId: params.caseId },
        include: {
            updateLogs: {
                orderBy: { updatedAt: 'desc' },
                take: 50,
            },
        },
    });

    if (!foundCase) {
        return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    return NextResponse.json(foundCase);
}

// PUT /api/cases/[caseId] — Update case
export async function PUT(
    req: NextRequest,
    { params }: { params: { caseId: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validatedData = updateCaseSchema.parse(body);

        const existingCase = await prisma.case.findUnique({
            where: { caseId: params.caseId },
        });

        if (!existingCase) {
            return NextResponse.json({ error: 'Case not found' }, { status: 404 });
        }

        // Build update data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {};
        const changes: { field: string; oldValue: string; newValue: string }[] = [];

        if (validatedData.title !== undefined && validatedData.title !== existingCase.title) {
            updateData.title = validatedData.title;
            changes.push({ field: 'title', oldValue: existingCase.title, newValue: validatedData.title });
        }

        if (validatedData.clientName !== undefined && validatedData.clientName !== existingCase.clientName) {
            updateData.clientName = validatedData.clientName;
            changes.push({ field: 'clientName', oldValue: existingCase.clientName, newValue: validatedData.clientName });
        }

        if (validatedData.status !== undefined && validatedData.status !== existingCase.status) {
            updateData.status = validatedData.status;
            changes.push({ field: 'status', oldValue: existingCase.status, newValue: validatedData.status });
        }

        if (validatedData.description !== undefined) {
            updateData.description = validatedData.description;
        }

        if (validatedData.nextHearingDate !== undefined) {
            const newDate = validatedData.nextHearingDate ? new Date(validatedData.nextHearingDate) : null;
            updateData.nextHearingDate = newDate;
            const oldDate = existingCase.nextHearingDate?.toISOString() || 'None';
            const newDateStr = newDate?.toISOString() || 'None';
            if (oldDate !== newDateStr) {
                changes.push({ field: 'nextHearingDate', oldValue: oldDate, newValue: newDateStr });
            }
        }

        if (validatedData.notes !== undefined) {
            updateData.notes = validatedData.notes;
        }

        const updatedCase = await prisma.case.update({
            where: { caseId: params.caseId },
            data: updateData,
        });

        // Log changes
        for (const change of changes) {
            await prisma.caseUpdateLog.create({
                data: {
                    caseId: existingCase.id,
                    actionType: `UPDATED_${change.field.toUpperCase()}`,
                    oldValue: change.oldValue,
                    newValue: change.newValue,
                    updatedBy: session.user?.email || 'admin',
                },
            });
        }

        return NextResponse.json(updatedCase);
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validation failed', details: error }, { status: 400 });
        }
        console.error('Error updating case:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/cases/[caseId] — Soft-delete (archive) a case
export async function DELETE(
    req: NextRequest,
    { params }: { params: { caseId: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingCase = await prisma.case.findUnique({
        where: { caseId: params.caseId },
    });

    if (!existingCase) {
        return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    await prisma.case.update({
        where: { caseId: params.caseId },
        data: { isArchived: true },
    });

    await prisma.caseUpdateLog.create({
        data: {
            caseId: existingCase.id,
            actionType: 'ARCHIVED',
            oldValue: 'active',
            newValue: 'archived',
            updatedBy: session.user?.email || 'admin',
        },
    });

    return NextResponse.json({ message: 'Case archived successfully' });
}
