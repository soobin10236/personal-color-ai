# 🎨 AI 퍼스널 컬러 진단 POC

모바일 웹 기반 AI 퍼스널 컬러 진단 서비스의 POC(Proof of Concept) 버전입니다.

## 📋 프로젝트 개요

이 프로젝트는 Next.js 14 App Router를 기반으로 한 모바일 웹 애플리케이션으로, 카메라를 통한 얼굴 촬영 및 이미지 압축, API 통신 테스트 기능을 제공합니다.

### 주요 기능

- ✅ **모바일 최적화 UI**: 아이폰 프로 맥스 (430px) 기준 반응형 디자인
- ✅ **카메라 기능**: 전면 카메라 촬영 및 타원형 가이드라인 제공
- ✅ **이미지 압축**: 1024px, 0.5MB 이하로 자동 압축
- ✅ **API 통신 테스트**: Next.js API Route를 통한 프록시 통신 검증
- ✅ **환경 변수 관리**: .env.local을 통한 민감 정보 보호

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Libraries**:
  - `react-webcam`: 카메라 연동
  - `browser-image-compression`: 이미지 압축
  - `axios`: HTTP 통신

## 🚀 설치 및 실행

### 1. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2. 환경 변수 설정 (선택사항)

\`.env.example\` 파일을 복사하여 \`.env.local\` 파일을 생성하고 필요한 값을 입력합니다.

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 3. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 📁 프로젝트 구조

\`\`\`
personalColorAI/
├── app/
│   ├── api/
│   │   └── test/
│   │       └── route.ts       # API 프록시 라우트
│   ├── camera/
│   │   └── page.tsx           # 카메라 페이지
│   ├── test/
│   │   └── page.tsx           # 통신 테스트 페이지
│   ├── globals.css            # 전역 스타일
│   ├── layout.tsx             # 루트 레이아웃 (모바일 컨테이너)
│   └── page.tsx               # 홈 페이지
├── utils/
│   └── imageCompression.ts    # 이미지 압축 유틸리티
├── .env.example               # 환경 변수 템플릿
├── .gitignore                 # Git 제외 파일 (환경 변수 포함)
├── next.config.js             # Next.js 설정
├── package.json               # 의존성 관리
├── tailwind.config.ts         # Tailwind CSS 설정
└── tsconfig.json              # TypeScript 설정
\`\`\`

## 🎯 사용 방법

### 카메라 테스트

1. 홈 화면에서 **"📸 카메라 테스트"** 버튼 클릭
2. 카메라 권한 허용
3. 타원형 가이드라인에 얼굴을 맞춤
4. **"촬영하기"** 버튼 클릭
5. 콘솔(F12)에서 압축된 이미지 데이터 확인

### 통신 테스트

1. 홈 화면에서 **"🔌 통신 테스트"** 버튼 클릭
2. **"Ping Test"** 버튼 클릭
3. 화면에 표시되는 응답 데이터 확인

## 🔒 보안 고려사항

- `.env.local` 파일은 `.gitignore`에 포함되어 Git에 커밋되지 않습니다
- 민감한 API 키나 엔드포인트 정보는 반드시 환경 변수로 관리하세요
- Vercel 배포 시 환경 변수는 프로젝트 설정에서 별도로 추가해야 합니다

## 📦 빌드 및 배포

### 프로덕션 빌드

\`\`\`bash
npm run build
npm start
\`\`\`

### Vercel 배포

1. [Vercel](https://vercel.com) 계정 생성 및 로그인
2. GitHub 저장소 연결
3. 자동 배포 설정
4. 환경 변수 설정 (Settings > Environment Variables)

## 🔄 다음 단계

- [ ] n8n 웹훅 연동
- [ ] AI 모델 API 통합
- [ ] 진단 결과 페이지 구현
- [ ] 사용자 데이터 저장 기능

## 📝 라이선스

MIT License

## 👨‍💻 개발자

개발 문의: [이메일 주소]
