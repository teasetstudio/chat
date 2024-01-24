Build the Docker image:
docker build -t chat .


Run the Docker container:
docker run -p 5500:3000 -d chat
