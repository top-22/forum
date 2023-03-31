# Use the official Node.js image as a base
FROM node:16-bullseye-slim

# Set the working directory
WORKDIR /app

# Copy package.json, yarn.lock, tsconfig.json, and next.config.js
COPY package.json yarn.lock tsconfig.json next.config.js .eslintrc.json ./


# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN yarn build

# Set environment for prisma database url
ENV DATABASE_URL=$DATABASE_URL

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
