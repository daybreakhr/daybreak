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
            { uid: 'SfVQfbDIPsYxpxJp7iNMRE2tdla2', role: 'admin' },
            { uid: 'q1UpFEVAdTTu9veX2iVeO2r4KK83', role: 'admin' },
            { uid: 'Lv5CXnqUVBg16pDHrb6jJwmZXi92', role: 'admin' },
            { uid: 'H9XljsZk6BURxGJ4qloNNUHv6lm1', role: 'admin' },
            { uid: 'fFIckQBTQafx2uvpQTp4DEgaaCM2', role: 'admin' },
            { uid: 'gsEE1eUr1hcnkaVjmuiRqDDAghr2', role: 'admin' },
            { uid: 'GsXpySMPAfPgjJc1Vs3EbXpjaso1', role: 'admin' },
            { uid: 'MGA8O7J1yNaLqw0VomefVus6G7j2', role: 'admin' },
          ],
        },
      },
    },
  })

  await prisma.template.createMany({
    data: [
      {
        title: 'Manager – India Enterprise Sales',
        workspaceId: '6317158147089f094cd4598e',
        description:
          'Daybreak is looking for a Manager – Enterprise Sales with the drive and passion for building profitable enterprises from the ground up.',
        responsibilities: [
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Have a customer-first mentality',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Develop and manage sales pipeline, prospect and assess sales and move many transactions simultaneously through the pipeline.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Operational responsibilities include accurate pipeline reporting, and quarterly sales forecasts are done smoothly and effectively.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Practice effective, excellent communication with management, customers and support staff.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Identify Key Decision Makers by performing research and using prospecting tools.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Perform Client-need Analysis, and track their pain points to develop a reach-out strategy.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Leverage insight team, customer success team and presales team',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: "    • Build Daybreak's brand awareness amongst relevant customers, explain the core offerings and identify need-based areas to propose a solution",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • End-to-end revenue ownership right from prospecting to deal closure',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Build deep relationships with existing accounts and continually map opportunities to expand business with them',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Work closely with solution architects in devising use case-based appropriate solutions.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Consistently identify opportunities for cross-selling and upselling. ',
              },
            ],
          },
        ],
        capabilities: [
          {
            type: 'paragraph',
            children: [
              {
                text: "    • Capability to demonstrate software solutions basis customer's specific business process and pain points",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • 3-6 years of B2B sales experience in solution selling, preferably in the software domain',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Exceptional written and verbal communication skills',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Loves building relationships with CXO-level stakeholders',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: "    • Bachelor's degree in technology, MBA would be an additional advantage",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Proficiency in reaching out to new prospects, identifying sales opportunities and building a long-term pipeline',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Existing network with decision-making stakeholders in the Indian market',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: "    • A go-getter attitude and a willingness to listen to customer's pain points",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Skilled at using LinkedIn Sales Navigator, Lusha and other such sales enablement tools',
              },
            ],
          },
        ],
      },
      {
        title: 'Manager – Key Accounts',
        workspaceId: '6317158147089f094cd4598e',
        description:
          'Daybreak is looking for a Manager – Key Accounts with the drive and passion for building great relationships and helping our customers realize the full potential of the Daybreak product suite. ',
        responsibilities: [
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Deliver 100% customer retention by ensuring successful adoption and integration of the Daybreak platform across your customers',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Build, own and maintain a healthy pipeline of opportunities from your accounts – short-term and long term',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: "    • Deep understanding of the customer's business and their top objectives at various organizational levels",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Building a high degree of mindshare for our solutions and company within the key stakeholders in your account list',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Ability to understand business and technology challenges and align them with possible solutions from our portfolio',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Act as a link between the sales, services, support, and other internal teams, ensuring that customer requirements are prioritized and resolved in a timely manner',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Build and maintain an account map, plan for each customer, and develop close relationships with key stakeholders in your accounts',
              },
            ],
          },
        ],
        capabilities: [
          {
            type: 'paragraph',
            children: [
              {
                text: "    • Capability to demonstrate software solutions basis customer's specific business process and pain points",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Exceptional written and verbal communication skills',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Loves building relationships with CXO-level stakeholders',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: "    • Bachelor's degree in technology, MBA would be an additional advantage",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Excellent organizational skills with a strong bias for action',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • High ability in data-driven problem-solving and negotiation',
              },
            ],
          },
        ],
      },
      {
        title: 'Senior Software Engineer Golang',
        workspaceId: '6317158147089f094cd4598e',
        description:
          'Daybreak is looking for developers who have experience building high-performance microservices using Golang, Redis and other AWS Services.',
        responsibilities: [
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Deliver 100% customer retention by ensuring successful adoption and integration of the Daybreak platform across your customers',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Build, own and maintain a healthy pipeline of opportunities from your accounts – short-term and long term',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: "    • Deep understanding of the customer's business and their top objectives at various organizational levels",
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Building a high degree of mindshare for our solutions and company within the key stakeholders in your account list',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Ability to understand business and technology challenges and align them with possible solutions from our portfolio',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Act as a link between the sales, services, support, and other internal teams, ensuring that customer requirements are prioritized and resolved in a timely manner',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Build and maintain an account map, plan for each customer, and develop close relationships with key stakeholders in your accounts',
              },
            ],
          },
        ],
        capabilities: [
          {
            type: 'paragraph',
            children: [
              {
                text: '    • 4+ years of experience in building high-performance APIs and services, preferably with Golang.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Strong knowledge of Relational and NoSQL databases, preferably MySQL and MongoDB.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Experience in working on large-scale enterprise applications following best practices.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Must have strong debugging and troubleshooting skills with a clear understanding of how to design and develop reusable, maintainable and debuggable applications.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • GIT experience is a prerequisite',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Background of working on Kubernetes and microservice.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Experience with OLAP DB/DW like Clickhouse/Redshift.',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: '    • Working experience in building and deploying applications on the AWS platform.',
              },
            ],
          },
        ],
      },
    ],
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
