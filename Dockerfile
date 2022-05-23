FROM mhart/alpine-node:14
WORKDIR /src
COPY . .
RUN npm install
EXPOSE 9999
CMD ["node", "app.js"]
