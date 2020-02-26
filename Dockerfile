FROM node:10

# Create app directory
WORKDIR /usr/app

# Copy project files
COPY . ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN npm install

# Build state files
RUN npm run build:prod

# Start builded application
# RUN npm run preview

CMD npm run build:prod

EXPOSE 9526
