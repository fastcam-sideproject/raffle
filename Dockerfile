# Node.js 이미지 사용
FROM node:18

# 앱 디렉토리 생성
WORKDIR /app

# 의존성 설치를 위해 package.json과 package-lock.json 복사
COPY package*.json ./

# 프로덕션 모드 설정
ENV NODE_ENV=production

# 의존성 설치
RUN npm install --production

# 소스 코드 복사
COPY . .

# Next.js 빌드
RUN npm run build

# 애플리케이션 시작
CMD ["npm", "start"]