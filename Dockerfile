FROM alpine:latest

RUN apk add --no-cache curl

WORKDIR /root

COPY entrypoint.sh .

ENTRYPOINT [ "/root/entrypoint.sh" ]
