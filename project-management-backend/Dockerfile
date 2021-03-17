FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

ENV MYSQL_USERNAME=admin
ENV MYSQL_PASSWORD=MhZReZbnBXFT7pAk
ENV MYSQL_URL=mysql-database.czquwjpoz8xt.us-east-1.rds.amazonaws.com
ENV MYSQL_NAME=project_management

CMD ["npm", "start"]