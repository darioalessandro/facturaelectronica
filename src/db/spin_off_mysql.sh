#!/usr/bin/env bash

docker volume create crv_mysql2

docker run \
    --env-file .env \
    --mount type=volume,src=crv_mysql2,dst=/var/lib/mysql \
    -p 3306:3306 \
    -d \
    mysql:5.7.22