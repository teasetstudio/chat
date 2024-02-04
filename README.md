Start Dev
npm run start:dev

[FOR PROD]
Build the Docker image:
docker build -t chat .

Run the Docker container:
docker run -p 5500:5500 -d chat
