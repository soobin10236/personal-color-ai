---
description: build-poc
---

# Role
너는 10년 차 시니어 프론트엔드 개발자야.
현재 우리는 "모바일 웹 기반 AI 퍼스널 컬러 진단 서비스"의 POC(Proof of Concept) 버전을 개발 중이야.
1차 회의에서 결정된 요구사항에 맞춰, Next.js 기반의 프론트엔드 기초 공사와 카메라 및 통신 테스트 기능을 구현해줘.

# Tech Stack & Environment
- Framework: Next.js 14+ (App Router 방식 필수)
- Language: TypeScript
- Styling: Tailwind CSS
- Deployment: Vercel (배포 예정이므로 환경 고려)
- Libraries to use:
  - `react-webcam`: 전면 카메라 연동
  - `browser-image-compression`: 이미지 리사이징 및 압축
  - `axios`: API 통신

# Key Requirements (Constraints)
1. **Mobile-First Design:**
   - PC에서 접속하더라도 모바일 앱처럼 보이도록, 최상위 레이아웃에서 `max-width: 430px` (아이폰 프로 맥스 너비)로 제한하고 중앙 정렬해줘.
   - 배경색은 회색(#f0f0f0)이고, 앱 컨테이너는 흰색(#ffffff)이어야 해.

2. **No Backend Server:**
   - 별도의 백엔드 서버가 없으므로, 외부 통신은 반드시 Next.js의 `API Route` (Serverless Function)를 프록시로 사용해서 처리해야 해.

# Task List (Step-by-Step Implementation)

## Step 1: 프로젝트 기본 세팅 및 레이아웃
- `src/app/layout.tsx`에 모바일 뷰 컨테이너(max-width: 430px, min-h-screen, shadow-lg)를 적용해줘.
- 폰트는 `Pretendard`나 시스템 폰트를 사용해줘.

## Step 2: 카메라 기능 구현 (Camera Page)
- `/camera` 페이지를 생성해줘.
- `react-webcam` 라이브러리를 사용하여 모바일 전면 카메라(`facingMode: "user"`)를 전체 화면에 띄워줘.
- **[중요] 가이드라인 오버레이:** 카메라 화면 위에 얼굴 위치를 맞출 수 있는 "타원형 가이드라인(흰색 테두리, 중앙 투명)"을 CSS(`z-index`)로 겹쳐서 구현해줘.
- 하단에 [촬영하기] 버튼을 배치해줘.

## Step 3: 이미지 캡처 및 압축 로직
- [촬영하기] 버튼을 누르면:
  1. `getScreenshot()`으로 이미지를 캡처.
  2. `browser-image-compression`을 사용하여 이미지를 압축 (maxWidth: 1024px, maxSizeMB: 0.5MB).
  3. 압축된 이미지를 `Blob` -> `Base64` 문자열로 변환하고 콘솔에 로그를 찍어줘. (추후 API 전송용)

## Step 4: 통신 테스트 페이지 (Connection Test)
- `/test` 페이지를 생성해줘.
- 화면 중앙에 [Ping Test] 버튼을 만들어줘.
- 버튼 클릭 시:
  1. `/api/test` (Next.js API Route)로 요청을 보냄.
  2. `/api/test`에서는 외부의 `https://jsonplaceholder.typicode.com/todos/1` (테스트용)로 요청을 보내고 응답을 받아와.
  3. 받아온 응답을 화면에 `alert` 또는 텍스트로 띄워줘.
  - *목적: 추후 n8n 웹훅과 연결하기 전, Next.js API Route를 통한 프록시 통신이 잘 되는지 확인하기 위함.*

# Deliverables
위 단계별로 코드를 작성해주고, 필요한 패키지 설치 명령어(`npm install ...`)도 함께 알려줘.
우선 **Step 1(레이아웃)**과 **Step 2(카메라 UI)**부터 코드를 짜줘.