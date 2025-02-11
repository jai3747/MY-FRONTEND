# Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.27.4-alpine
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
