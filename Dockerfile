# Use Node.js as the only environment
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your source code
COPY . .

# Expose the port your React app runs on
EXPOSE 5174

# Run the development server
# --host ensures it is accessible from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174"]