[install docker](https://docs.docker.com/engine/install/linux-postinstall/)


[//]: # (opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],)

[//]: # (library: 'digital envelope routines',)

[//]: # (reason: 'unsupported',)

[//]: # (code: 'ERR_OSSL_EVP_UNSUPPORTED')

[//]: # (})

```
export NODE_OPTIONS=--openssl-legacy-provider

docker-compose -f docker-compose.dev.yml down --volumes
docker-compose -f docker-compose.dev.yml up

REDIS_URL=redis://localhost:6379 MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database PORT=3001 npm run dev

REACT_APP_BACKEND_URL=http://localhost:3001 npm start
```


### record terminal output and save to file
`script -c "docker start -i nervous_sinoussi" -a script-answers/exercise12_8.txt `
`script -c "docker start -i nervous_sinoussi" -a ../../script-answers/exercise12_8.txt `


### Manage Docker as a non-root user
```
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
docker run hello-world
```


### docker commands:

```
docker container ls -a
docker image ls
docker image rm
docker volume ls
docker volume inspect
docker volume rm

docker start <CONTAINER ID > or <NAME> : docker start -i tender_zhukovsky

docker container run -it --name hello-node node:16 bash

docker container cp index.js hello-node:/usr/src/app/

docker kill tender_zhukovsky

//commit CONTAINER-ID-OR-CONTAINER-NAME NEW-IMAGE-NAME will create a new image that includes the changes made
docker commit nervous_sinoussi hello-node-world

docker build -t fs-hello-world . 
docker build -t express-server .

docker run -p 3123:3000 express-server
docker build -t express-server . && docker run -p 3123:3000 express-server

docker-compose up --build

docker-compose up -d (-d for detached)

docker-compose down

docker-compose -f docker-compose.dev.yml logs -f

//execute bash inside the container
docker exec -it compassionate_wescoff bash

docker build -f ./dev.Dockerfile -t hello-front-dev .
docker run -p 3000:3000 -v "$(pwd):/usr/src/app/" hello-front-dev

docker-compose -f docker-compose.dev.yml up
docker-compose run debug-helper wget -O - http://app:3000
```

