import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { updateStatusSchema } from '@/lib/validations';

// PATCH /api/cases/[caseId]/status — Update case status
export async function PATCH(
    req: NextRequest,
    { params }: { params: { caseId: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const validatedData = updateStatusSchema.parse(body);

        const existingCase = await prisma.case.findUnique({
            where: { caseId: params.caseId },
        });

        if (!existingCase) {
            return NextResponse.json({ error: 'Case not found' }, { status: 404 });
        }

        const oldStatus = existingCase.status;

        const updatedCase = await prisma.case.update({
            where: { caseId: params.caseId },
            data: { status: validatedData.status },
        });

        // Log status change
        await prisma.caseUpdateLog.create({
            data: {
                caseId: existingCase.id,
                actionType: 'STATUS_CHANGED',
                oldValue: oldStatus,
                newValue: validatedData.status,
                updatedBy: session.user?.email || 'admin',
            },
        });

        return NextResponse.json(updatedCase);
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json({ error: 'Validation failed', details: error }, { status: 400 });
        }
        console.error('Error updating status:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
