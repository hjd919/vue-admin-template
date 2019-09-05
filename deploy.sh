#!/bin/bash

git add -A
git commit -m "admin" -a
git pull
git push

server_host=101.200.57.206
server_user=hjd
deploy_dir=/home/hjd/brush/admin

deployAdmin() {
    echo "--编译源码"
    npm run build:prod
    echo "--创建服务器上的部署目录"
    ssh ${server_user}@${server_host} "mkdir -p ${deploy_dir}"
    echo "--推送dist到服务器目录"
    scp -r ./dist/* ${server_user}@${server_host}:${deploy_dir}
}
deployAdmin $1
