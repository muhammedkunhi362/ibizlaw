import { z } from 'zod';

export const CaseStatusEnum = z.enum([
    'OPEN',
    'IN_PROGRESS',
    'HEARING_SCHEDULED',
    'ADJOURNED',
    'CLOSED',
]);

export const createCaseSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    clientName: z.string().min(1, 'Client name is required').max(100),
    status: CaseStatusEnum.optional().default('OPEN'),
    description: z.string().max(2000).optional().nullable(),
    nextHearingDate: z.string().optional().nullable(),
    notes: z.string().max(5000).optional().nullable(),
});

export const updateCaseSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    clientName: z.string().min(1).max(100).optional(),
    status: CaseStatusEnum.optional(),
    description: z.string().max(2000).optional().nullable(),
    nextHearingDate: z.string().optional().nullable(),
    notes: z.string().max(5000).optional().nullable(),
});

export const updateStatusSchema = z.object({
    status: CaseStatusEnum,
});

export type CreateCaseInput = z.infer<typeof createCaseSchema>;
export type UpdateCaseInput = z.infer<typeof updateCaseSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
