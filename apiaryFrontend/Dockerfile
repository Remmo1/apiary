FROM node:18-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

# docker image build -t <image_name>:<tag> <path>
# docker image build -t remmo1/apiary-frontend:0.0.1-SNAPSHOT .
# docker run -p 4200:4200 remmo1/apiary-frontend:0.0.1-SNAPSHOT
