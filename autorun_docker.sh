docker build . -t myapp --build-arg "PORT=3000"
docker run --rm -p 3000:3000 -t myapp