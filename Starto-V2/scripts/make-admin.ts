import { prisma } from "../src/lib/prisma";

const EMAIL = "krishnamurthikm07@gmail.com";

async function main() {
    console.log(`Checking user: ${EMAIL}...`);
    const user = await prisma.user.findUnique({
        where: { email: EMAIL }
    });

    if (!user) {
        console.error("User not found! Please ensure the user has signed up first.");
        return;
    }

    console.log("Current Role:", user.role);

    if (user.role === 'ADMIN') {
        console.log("User is already ADMIN.");
        return;
    }

    console.log("Updating role to ADMIN...");
    const updated = await prisma.user.update({
        where: { email: EMAIL },
        data: { role: 'ADMIN' }
    });

    console.log("Success! New Role:", updated.role);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
