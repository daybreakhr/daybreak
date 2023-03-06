# From the root of the project, run:
# To Build Image: docker build -t daybreak-server -f packages/server/Dockerfile .
# To Run Container: docker run --rm -p 8080:8080 daybreak-server
FROM node:16-alpine

WORKDIR /day-break

# Copy package.json and yarn.lock from workspace root
COPY package.json .
COPY yarn.lock .

# Copy package.json from server package
COPY packages/server/package.json packages/server/

# Copy prisma schema which is required for postinstall script
COPY packages/server/prisma packages/server/prisma

# Install dependencies and generate prisma client
RUN yarn install

# Start the development server
WORKDIR /day-break/packages/server
COPY packages/server .
EXPOSE 8080
CMD ["yarn", "start:dev"]
