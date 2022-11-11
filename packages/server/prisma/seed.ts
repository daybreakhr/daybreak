import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.workspace.create({
    data: {
      name: 'Daybreak HR',
      slug: 'daybreak_hr',
      members: {
        createMany: {
          data: [
            { uid: 'SfVQfbDIPsYxpxJp7iNMRE2tdla2' },
            { uid: 'q1UpFEVAdTTu9veX2iVeO2r4KK83' },
            { uid: 'Lv5CXnqUVBg16pDHrb6jJwmZXi92' },
            { uid: 'H9XljsZk6BURxGJ4qloNNUHv6lm1' },
            { uid: 'fFIckQBTQafx2uvpQTp4DEgaaCM2' },
            { uid: 'gsEE1eUr1hcnkaVjmuiRqDDAghr2' },
            { uid: 'GsXpySMPAfPgjJc1Vs3EbXpjaso1' },
            { uid: 'MGA8O7J1yNaLqw0VomefVus6G7j2' },
          ],
        },
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
