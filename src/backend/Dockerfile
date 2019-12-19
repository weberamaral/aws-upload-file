FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./

ENV APP_NODE_PORT=8080
ENV BUCKET_NAME='aws-s3-upload-sample'
ENV ACCESS_KEY_ID=''
ENV SECRET_ACCESS_KEY=''
ENV ENDPOINT=''

RUN npm install

COPY . .
EXPOSE ${APP_NODE_PORT}

CMD [ "npm", "start" ]