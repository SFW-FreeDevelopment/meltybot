FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Copy and Install our bot
COPY src/package.json .
RUN npm install

# Our precious bot
COPY ./src .

# Start me!
CMD ["npm", "start"]