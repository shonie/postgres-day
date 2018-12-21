FROM 'node'
LABEL maintainer="shonie.starnikov@gmail.com"
WORKDIR /app
COPY . /app
RUN npm i
EXPOSE 8080
CMD ["npm", "start"]