# Use an official Node.js runtime as the base image
FROM node:18.13.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm i --force

# Copy all project files to the container
COPY . .

# Expose the port that the Vue.js app will run on
EXPOSE 8081

# Command to start the Vue.js application
CMD ["npm", "run", "serve"]
