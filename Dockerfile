#Build in a docker and deploy on ngnix
## Stage 1
#FROM node:8 as react-build
#WORKDIR /app
#COPY . ./
#RUN yarn
#RUN yarn build
#
## Stage 2 - the production environment
#FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=react-build /app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

#Deploy the locally Built code using nginx
#FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY /build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

#Deploy the code using static serve
FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY /build /app/build
CMD ["serve", "-s", "build", "-l", "3000"]
