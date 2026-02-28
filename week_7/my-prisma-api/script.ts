import { error } from "node:console";
import { prisma } from "./lib/prisma";

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'natthawut',
            email: '66112106@dpu.ac.th',
        },
    })
    console.log('Created user: ', user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })