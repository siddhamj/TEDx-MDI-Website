# Stage 1: Build the React application
FROM node:18-alpine AS build

# Add a cache-busting argument to ensure fresh builds
ARG CACHE_BUSTER=1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the application from a lightweight server
FROM nginx:stable-alpine

# Copy the built files from the 'build' stage to the Nginx server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (the default port for Nginx)
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]