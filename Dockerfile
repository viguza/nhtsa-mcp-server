FROM node:23-slim

# Apply security updates
RUN apt-get update && apt-get upgrade -y

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port specified in the .env or default to 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"] 