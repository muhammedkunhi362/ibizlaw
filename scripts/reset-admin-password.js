const { hash } = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@ibizlaw.in';
    const newPassword = 'ibizlaw807<>';

    console.log(`Updating password for ${email}...`);

    try {
        const passwordHash = await hash(newPassword, 12);

        const existingUser = await prisma.admin.findUnique({
            where: { email },
        });

        if (!existingUser) {
            console.error(`❌ User with email "${email}" not found.`);
            process.exit(1);
        }

        await prisma.admin.update({
            where: { email },
            data: { passwordHash },
        });

        console.log(`✅ Password updated successfully!`);
    } catch (e) {
        console.error('Error updating password:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
