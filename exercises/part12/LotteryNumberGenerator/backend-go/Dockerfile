# https://hub.docker.com/_/golang
FROM golang:1.19

WORKDIR /usr/lns_golang
COPY go.mod ./
RUN go mod download
COPY . .

RUN go build -v  -o /usr/local/bin ./...

EXPOSE 8080

CMD ["/usr/local/bin/lns_golang"]