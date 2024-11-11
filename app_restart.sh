#!/bin/bash

# 애플리케이션 종료
echo "기존 애플리케이션 종료 중..."
pm2 delete all

# 프로세스가 완전히 종료될 때까지 대기
#while pm2 pid nestjs-practice > /dev/null 2>&1; do
#while pm2 describe nestjs-practice | grep online; do
#    echo "기존 프로세스가 아직 실행 중입니다. 대기 중..."
#    sleep 1
#done

# 새 버전 배포
echo "새 버전 배포 중..."
#git pull
#npm install
npm run build

# 새 버전 시작
echo "새 버전 시작 중..."
pm2 start ecosystem.config.js

echo "재배포 완료"