FROM node:latest

# Create the directory!
RUN mkdir -p /src
WORKDIR /src

# Copy and Install our bot
COPY src/package.json /src
RUN npm install

# Our precious bot
COPY . /src

# Start me!
CMD ["ts-node", "./src/index.ts"]