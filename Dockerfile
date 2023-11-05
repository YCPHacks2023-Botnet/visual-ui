# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build your Vue.js application (if applicable)
RUN npm run build

# Expose the port your application will run on
EXPOSE 3000

# Start your application
CMD [ "npm", "serve" ]
