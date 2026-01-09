# 🚀 Vercel 배포 가이드

이 가이드는 GitHub을 통해 Vercel에 배포하는 방법을 안내합니다.

## 📋 사전 준비사항

- [x] GitHub 계정
- [x] Vercel 계정 ([vercel.com](https://vercel.com)에서 GitHub 계정으로 가입 가능)
- [x] Git 설치 (시스템에 설치되어 있어야 함)

---

## 1️⃣ GitHub 저장소 생성 및 코드 푸시

### Step 1: GitHub에서 새 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 **"+"** 버튼 클릭 → **"New repository"** 선택
3. 저장소 이름 입력 (예: `personal-color-ai`)
4. **Public** 또는 **Private** 선택 (무료 배포는 둘 다 가능)
5. **"Create repository"** 클릭

### Step 2: 로컬 프로젝트를 GitHub에 푸시

PowerShell 또는 터미널에서 다음 명령을 실행하세요:

```bash
# 프로젝트 디렉토리로 이동
cd c:\Users\soobin\.gemini\antigravity\personalColorAI

# Git 초기화 (아직 초기화되지 않은 경우)
git init

# 모든 파일을 스테이징
git add .

# 첫 번째 커밋
git commit -m "Initial commit: AI 퍼스널 컬러 진단 POC"

# GitHub 저장소 연결 (YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/personal-color-ai.git

# 기본 브랜치 이름을 main으로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

> **참고**: `YOUR_USERNAME`을 본인의 GitHub 사용자명으로 변경하세요.
> GitHub에서 생성한 저장소 페이지에 표시되는 명령어를 복사해서 사용하는 것이 가장 정확합니다.

---

## 2️⃣ Vercel에 배포하기

### Step 1: Vercel에 로그인

1. [vercel.com](https://vercel.com)에 접속
2. **"Sign Up"** 또는 **"Login"** 클릭
3. **"Continue with GitHub"** 선택하여 GitHub 계정으로 로그인

### Step 2: 프로젝트 Import

1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. **"Import Git Repository"** 섹션에서 GitHub 저장소 목록 확인
3. 방금 생성한 `personal-color-ai` 저장소를 찾아 **"Import"** 클릭

### Step 3: 프로젝트 설정

1. **Project Name**: 자동으로 설정됨 (원하면 변경 가능)
2. **Framework Preset**: Next.js가 자동으로 감지됨
3. **Root Directory**: 변경하지 않음 (프로젝트 루트)
4. **Build and Output Settings**: 기본값 사용
5. **Environment Variables**: 현재는 필요 없음 (추후 n8n 웹훅 연동 시 추가)

### Step 4: 배포 시작

1. **"Deploy"** 버튼 클릭
2. 배포 진행 상황 확인 (보통 1-2분 소요)
3. 배포 완료 시 **"Visit"** 버튼이 나타남

---

## 3️⃣ 배포 완료 및 공유

### 배포 URL 확인

배포가 완료되면 다음과 같은 URL이 생성됩니다:
```
https://your-project-name.vercel.app
```

이 URL을 친구들에게 공유하면 됩니다! 📱

### 모바일 테스트

- **iPhone/Android**: 브라우저에서 URL 접속 시 카메라 권한 요청이 나타남
- **PC**: 웹캠이 있는 경우 정상 작동

---

## 4️⃣ 코드 수정 후 재배포

코드를 수정한 후 다시 배포하려면:

```bash
# 수정된 파일을 스테이징
git add .

# 커밋 메시지와 함께 커밋
git commit -m "Update: 기능 개선"

# GitHub에 푸시
git push
```

**Vercel이 자동으로 감지하여 재배포합니다!** (보통 30초~1분 소요)

---

## 5️⃣ 환경 변수 설정 (추후 n8n 웹훅 연동 시)

1. Vercel 대시보드에서 프로젝트 선택
2. **"Settings"** 탭 클릭
3. **"Environment Variables"** 섹션으로 이동
4. 환경 변수 추가:
   - **Key**: `NEXT_PUBLIC_API_ENDPOINT`
   - **Value**: n8n 웹훅 URL
5. **"Save"** 클릭
6. **"Deployments"** 탭에서 **"Redeploy"** 실행

---

## 🎯 배포 체크리스트

- [ ] GitHub 저장소 생성 완료
- [ ] 로컬 코드를 GitHub에 푸시 완료
- [ ] Vercel 계정 생성 및 GitHub 연동 완료
- [ ] Vercel에서 프로젝트 Import 완료
- [ ] 배포 성공 및 URL 확인 완료
- [ ] 모바일 기기에서 테스트 완료
- [ ] 친구들에게 URL 공유 완료 🎉

---

## 🔧 문제 해결

### 배포 실패 시

1. Vercel 배포 로그 확인 (빌드 에러 메시지 확인)
2. `package.json`의 의존성 확인
3. `next.config.js` 설정 확인

### 카메라가 작동하지 않을 때

- **HTTPS 필수**: Vercel은 자동으로 HTTPS를 제공하므로 문제없음
- **권한 거부**: 브라우저에서 카메라 권한을 허용했는지 확인
- **모바일**: Safari (iOS) 또는 Chrome (Android) 최신 버전 사용 권장

---

## 📱 공유 팁

친구들에게 공유할 때 다음과 같이 안내하세요:

> "이 링크를 모바일에서 열어봐! 📱  
> https://your-project-name.vercel.app  
> 
> 카메라 권한을 허용하고, 얼굴을 가이드라인에 맞춰서 촬영해보세요!  
> (현재는 POC 버전이라 진단 기능은 준비 중입니다 😊)"

---

**축하합니다! 🎉 이제 전 세계 어디서나 접속 가능한 웹 앱이 완성되었습니다!**
