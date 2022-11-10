import { PrismaClient } from '@prisma/client'
import { encrypt } from '../src/utils'
const prisma = new PrismaClient()

async function main() {
  const cryptoKey = process.env.CRYPTO_KEY

  await prisma.iam.createMany({
    data: [
      {
        type: 'AWS',
        subType: 's3',
        description: 'aws s3 hnagrath09 us-east-1',
        credentials: {
          accessKeyId: encrypt('AWS_ACCESS_KEY_ID', cryptoKey),
          secretAccessKey: encrypt('AWS_SECRET_ACCESS_KEY', cryptoKey),
        },
        params: {
          region: 'us-east-1',
          bucket: 'daybreakhr',
        },
      },
      {
        type: 'AWS',
        subType: 'ses',
        description: 'aws ses hnagrath09 us-east-1',
        credentials: {
          accessKeyId: encrypt('AWS_ACCESS_KEY_ID', cryptoKey),
          secretAccessKey: encrypt('AWS_SECRET_ACCESS_KEY', cryptoKey),
        },
        params: {
          host: 'email-smtp.us-east-1.amazonaws.com',
          port: 587,
        },
      },
    ],
  })
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
