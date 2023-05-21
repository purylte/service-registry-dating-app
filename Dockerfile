FROM node:lts

ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD

ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_PORT=$DATABASE_PORT
ENV DATABASE_USERNAME=$DATABASE_USERNAME
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5000

# Start the Nest.js application
CMD ["npm", "start"]