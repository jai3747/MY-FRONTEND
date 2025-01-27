# # # # # # my frontend 
# # # # # FROM node:16-alpine

# # # # # WORKDIR /app

# # # # # COPY package*.json ./
# # # # # RUN npm install

# # # # # COPY . .

# # # # # RUN npm run build

# # # # # EXPOSE 3000

# # # # # CMD ["npm", "start"]

# # # # # Build stage
# # # # FROM node:18-alpine AS build
# # # # WORKDIR /app
# # # # COPY package*.json ./
# # # # RUN npm install
# # # # COPY . .
# # # # RUN npm run build

# # # # # Production stage
# # # # FROM nginx:1.24-alpine
# # # # COPY --from=build /app/build /usr/share/nginx/html
# # # # EXPOSE 80
# # # # CMD ["nginx", "-g", "daemon off;"]
# # # # Frontend Dockerfile
# # # FROM node:18-alpine AS build
# # # WORKDIR /app
# # # COPY package*.json ./
# # # RUN npm install
# # # COPY . .
# # # RUN npm run build

# # # FROM nginx:1.24-alpine
# # # # Copy custom nginx config
# # # COPY nginx.conf /etc/nginx/conf.d/default.conf
# # # # Copy built assets from build stage
# # # COPY --from=build /app/build /usr/share/nginx/html
# # # # Add nginx user and set permissions
# # # RUN chown -R nginx:nginx /usr/share/nginx/html && \
# # #     chmod -R 755 /usr/share/nginx/html && \
# # #     chown -R nginx:nginx /var/cache/nginx && \
# # #     chown -R nginx:nginx /var/log/nginx && \
# # #     chown -R nginx:nginx /etc/nginx/conf.d && \
# # #     touch /var/run/nginx.pid && \
# # #     chown -R nginx:nginx /var/run/nginx.pid

# # # USER nginx
# # # EXPOSE 80
# # # CMD ["nginx", "-g", "daemon off;"]
# # # Build stage
# # FROM node:18-alpine AS build
# # WORKDIR /app
# # COPY package*.json ./
# # RUN npm install
# # COPY . .
# # RUN npm run build

# # # Production stage
# # FROM nginx:1.24-alpine
# # # Remove default nginx config
# # RUN rm /etc/nginx/conf.d/default.conf

# # # Copy custom nginx config
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # # Copy built assets from build stage
# # COPY --from=build /app/build /usr/share/nginx/html

# # # Create nginx cache directory and set permissions
# # RUN mkdir -p /var/cache/nginx /var/run/nginx /var/log/nginx && \
# #     chmod 777 /var/cache/nginx && \
# #     chmod 777 /var/run/nginx && \
# #     chmod 777 /var/log/nginx && \
# #     chmod 777 /var/log && \
# #     chown -R nginx:nginx /var/cache/nginx && \
# #     chown -R nginx:nginx /var/run/nginx && \
# #     chown -R nginx:nginx /var/log/nginx && \
# #     chown -R nginx:nginx /usr/share/nginx/html && \
# #     chmod -R 755 /usr/share/nginx/html && \
# #     # Make nginx config writable
# #     chmod 777 /etc/nginx/conf.d

# # # Use non-root port
# # ENV PORT=8080

# # # Modify nginx.conf to use PORT environment variable
# # RUN sed -i "s/80/${PORT}/g" /etc/nginx/conf.d/default.conf
# # Build stage
# FROM node:18-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Production stage
# FROM nginx:1.24-alpine
# # Copy the build output to replace the default nginx contents
# COPY --from=build /app/build /usr/share/nginx/html

# # Copy nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Create required directories and set permissions
# RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
#     chmod -R 777 /var/cache/nginx && \
#     chmod -R 777 /var/run && \
#     chmod -R 777 /var/log/nginx && \
#     chmod -R 755 /usr/share/nginx/html && \
#     chown -R nginx:nginx /usr/share/nginx/html && \
#     chown -R nginx:nginx /var/cache/nginx && \
#     chown -R nginx:nginx /var/log/nginx && \
#     chown -R nginx:nginx /var/run

# # Switch to non-root user
# USER nginx

# EXPOSE 8080
# CMD ["nginx", "-g", "daemon off;"]

# # USER nginx
# # EXPOSE ${PORT}
# # CMD ["nginx", "-g", "daemon off;"]
# Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.24-alpine
# Copy the build output to replace the default nginx contents
COPY --from=build /app/build /usr/share/nginx/html
# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create required directories and set permissions
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx /tmp && \
    chmod -R 777 /var/cache/nginx && \
    chmod -R 777 /var/run && \
    chmod -R 777 /var/log/nginx && \
    chmod -R 777 /tmp && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /var/run && \
    chown -R nginx:nginx /tmp

USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
