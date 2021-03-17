FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

ENV RDS_USERNAME=admin
ENV RDS_PASSWORD=MhZReZbnBXFT7pAk
ENV RDS_URL=mysql-database.czquwjpoz8xt.us-east-1.rds.amazonaws.com
ENV RDS_DB_NAME=project_management
ENV RDS_PORT=3306

CMD ["npm", "start"]
