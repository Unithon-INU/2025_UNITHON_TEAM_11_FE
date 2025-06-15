#!/bin/sh
cd ../

# 2. 의존성 설치
npm install

# 3. 빌드 실행 (next.config.ts에서 output: 'export' 및 distDir: 'output' 설정 필요)
npm run build

# 4. 빌드 산출물이 output 디렉토리에 생성되는지 확인
ls -la output

cp -R ./2025_UNITHON_TEAM_11_FE/* ./output
cp -R ./output ./2025_UNITHON_TEAM_11_FE/