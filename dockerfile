# Use an official Node.js runtime as a parent image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 5500

# Define environment variable (optional, if needed)
# ENV NODE_ENV production

# Run the application
CMD ["node", "index.js"]
