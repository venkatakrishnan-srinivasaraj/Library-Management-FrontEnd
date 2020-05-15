yarn build
docker build . -t library-management-frontend
docker run -p 3000:3000 library-management-frontend:latest
