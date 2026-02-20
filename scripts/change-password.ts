import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const args = process.argv.slice(2);
    const email = args[0];
    const newPassword = args[1];

    if (!email || !newPassword) {
        console.error('Usage: npx ts-node scripts/change-password.ts <email> <new_password>');
        process.exit(1);
    }

    try {
        const passwordHash = await hash(newPassword, 12);

        // Check if user exists first
        const existingUser = await prisma.admin.findUnique({
            where: { email },
        });

        if (!existingUser) {
            console.error(`❌ User with email "${email}" not found.`);
            console.log('Use "npx prisma db seed" to create the default admin if needed.');
            process.exit(1);
        }

        const updatedUser = await prisma.admin.update({
            where: { email },
            data: { passwordHash },
        });

        console.log(`✅ Password updated successfully for: ${updatedUser.email}`);
    } catch (e) {
        console.error('Error updating password:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
