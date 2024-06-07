FROM node:18-alpine

WORKDIR /frontend/

COPY src/ /frontend/src
COPY tsconfig.app.json /frontend/
COPY tsconfig.spec.json /frontend/
COPY tsconfig.json /frontend/
COPY package.json /frontend/
COPY angular.json /frontend/

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]

# docker image build -t <image_name>:<tag> <path>
# docker image build -t remmo1/apiary-frontend:0.0.1-SNAPSHOT .
# docker run -p 4200:4200 remmo1/apiary-frontend:0.0.1-SNAPSHOT
