Start Dev
npm run start:dev

[FOR PROD]
Build the Docker image:
docker build -t chat .

Run the Docker container:
docker run -p 1050:1050 -d --name chat chat
