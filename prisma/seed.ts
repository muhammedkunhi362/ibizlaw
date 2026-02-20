import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await hash('admin123', 12);

    const admin = await prisma.admin.upsert({
        where: { email: 'admin@ibizlaw.in' },
        update: {},
        create: {
            email: 'admin@ibizlaw.in',
            passwordHash,
            name: 'Admin',
        },
    });

    console.log('✅ Seeded admin user:', admin.email);

    // Create sample cases
    const sampleCases = [
        {
            caseId: 'IBZ-001',
            title: 'Cheque Bounce - Section 138',
            clientName: 'Arjun Mehta',
            status: 'OPEN' as const,
            description: 'Cheque dishonour case under NI Act Section 138. Cheque amount: ₹5,00,000.',
            nextHearingDate: new Date('2026-03-15'),
            notes: 'Demand notice sent. Awaiting response period to expire.',
        },
        {
            caseId: 'IBZ-002',
            title: 'Property Dispute - Koramangala',
            clientName: 'Priya Sharma',
            status: 'IN_PROGRESS' as const,
            description: 'Dispute over commercial property ownership in Koramangala 4th Block.',
            nextHearingDate: new Date('2026-03-22'),
        },
        {
            caseId: 'IBZ-003',
            title: 'Corporate Formation - TechStart Pvt Ltd',
            clientName: 'Vikram Patel',
            status: 'HEARING_SCHEDULED' as const,
            description: 'Company incorporation and compliance setup for new tech startup.',
            nextHearingDate: new Date('2026-04-01'),
            notes: 'MoA and AoA drafts ready for review.',
        },
        {
            caseId: 'IBZ-004',
            title: 'Employment Dispute - Wrongful Termination',
            clientName: 'Sneha Reddy',
            status: 'ADJOURNED' as const,
            description: 'Wrongful termination claim against former employer.',
        },
        {
            caseId: 'IBZ-005',
            title: 'Trademark Registration - BrandX',
            clientName: 'Rahul Gupta',
            status: 'CLOSED' as const,
            description: 'Trademark registration for consumer electronics brand.',
            notes: 'Registration complete. Certificate issued.',
        },
    ];

    for (const caseData of sampleCases) {
        await prisma.case.upsert({
            where: { caseId: caseData.caseId },
            update: {},
            create: caseData,
        });
    }

    console.log('✅ Seeded', sampleCases.length, 'sample cases');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
