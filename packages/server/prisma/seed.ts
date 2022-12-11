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
        category: 'sales',
        description:
          '[\n  {\n    "type": "heading-two",\n    "children": [\n      {\n        "text": "Job Description:"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "Daybreak is looking for a Manager – Enterprise Sales with the drive and passion for building profitable enterprises from the ground up."\n      }\n    ]\n  },\n  {\n    "type": "heading-two",\n    "children": [\n      {\n        "text": "Key Responsibilities:"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Have a customer-first mentality"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Develop and manage sales pipeline, prospect and assess sales and move many transactions simultaneously through the pipeline."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Operational responsibilities include accurate pipeline reporting, and quarterly sales forecasts are done smoothly and effectively."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Practice effective, excellent communication with management, customers and support staff."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Identify Key Decision Makers by performing research and using prospecting tools."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Perform Client-need Analysis, and track their pain points to develop a reach-out strategy."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Leverage insight team, customer success team and presales team"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Build Daybreak\'s brand awareness amongst relevant customers, explain the core offerings and identify need-based areas to propose a solution"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • End-to-end revenue ownership right from prospecting to deal closure"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Build deep relationships with existing accounts and continually map opportunities to expand business with them"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Work closely with solution architects in devising use case-based appropriate solutions."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Consistently identify opportunities for cross-selling and upselling. "\n      }\n    ]\n  },\n  {\n    "type": "heading-two",\n    "children": [\n      {\n        "text": "Key Capabilities:"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Capability to demonstrate software solutions basis customer\'s specific business process and pain points"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • 3-6 years of B2B sales experience in solution selling, preferably in the software domain"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Exceptional written and verbal communication skills"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Loves building relationships with CXO-level stakeholders"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Bachelor\'s degree in technology, MBA would be an additional advantage"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Proficiency in reaching out to new prospects, identifying sales opportunities and building a long-term pipeline"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Existing network with decision-making stakeholders in the Indian market"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • A go-getter attitude and a willingness to listen to customer\'s pain points"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Skilled at using LinkedIn Sales Navigator, Lusha and other such sales enablement tools"\n      }\n    ]\n  }\n]',
      },
      {
        title: 'Manager – Key Accounts',
        category: 'accounts',
        description:
          '[\n  {\n    "type": "heading-two",\n    "children": [\n      {\n        "text": "Job Description:"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "Daybreak is looking for a Manager – Key Accounts with the drive and passion for building great relationships and helping our customers realize the full potential of the Daybreak product suite. "\n      }\n    ]\n  },\n  {\n    "type": "heading-two",\n    "children": [\n      {\n        "text": "Key Responsibilities:"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Deliver 100% customer retention by ensuring successful adoption and integration of the Daybreak platform across your customers"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Build, own and maintain a healthy pipeline of opportunities from your accounts – short-term and long term"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Deep understanding of the customer\'s business and their top objectives at various organizational levels"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Building a high degree of mindshare for our solutions and company within the key stakeholders in your account list"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Ability to understand business and technology challenges and align them with possible solutions from our portfolio"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Act as a link between the sales, services, support, and other internal teams, ensuring that customer requirements are prioritized and resolved in a timely manner"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Build and maintain an account map, plan for each customer, and develop close relationships with key stakeholders in your accounts "\n      }\n    ]\n  },\n  {\n    "type": "heading-two",\n    "children": [\n      {\n        "text": "Key Capabilities:"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Capability to demonstrate software solutions basis customer\'s specific business process and pain points"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Exceptional written and verbal communication skills"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Loves building relationships with CXO-level stakeholders"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Bachelor\'s degree in technology, MBA would be an additional advantage"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Excellent organizational skills with a strong bias for action"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • High ability in data-driven problem-solving and negotiation"\n      }\n    ]\n  }\n]',
      },
      {
        title: 'Senior Software Engineer Golang',
        category: 'engineering',
        description:
          '[\n  {\n    "type": "heading-two",\n    "children": [\n      {\n        "text": "Job Description:"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "Daybreak is looking for developers who have experience building high-performance microservices using Golang, Redis and other AWS Services."\n      }\n    ]\n  },\n  {\n    "type": "heading-two",\n    "children": [\n      {\n        "text": "Key Capabilities:"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • 4+ years of experience in building high-performance APIs and services, preferably with Golang."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Strong knowledge of Relational and NoSQL databases, preferably MySQL and MongoDB."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Experience in working on large-scale enterprise applications following best practices."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Must have strong debugging and troubleshooting skills with a clear understanding of how to design and develop reusable, maintainable and debuggable applications."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • GIT experience is a prerequisite"\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Background of working on Kubernetes and microservice."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Experience with OLAP DB/DW like Clickhouse/Redshift."\n      }\n    ]\n  },\n  {\n    "type": "paragraph",\n    "children": [\n      {\n        "text": "    • Working experience in building and deploying applications on the AWS platform."\n      }\n    ]\n  }\n]',
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
