Start Dev
npm run start:dev

Start prod
npm run start

Build the Docker image:
docker build -t chat .

Run the Docker container:
docker run -p 5500:5500 -d chat
