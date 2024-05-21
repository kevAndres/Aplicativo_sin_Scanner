# Stage 1: Build the Angular application
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build -- --output-path=./www --configuration production

# Stage 2: Serve the Angular application with nginx
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=build /app/www /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
