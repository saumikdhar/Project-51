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
ENV FRONT_END_URL='https://project-management-001.herokuapp.com'
ENV PORT=8080

CMD ["npm", "start"]
