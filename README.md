# Sniffy: 경찰청 유실물 조회 및 알림 서비스

## 프로젝트 소개

Sniffy는 경찰청 유실물 통합포털(LOST112)의 데이터를 기반으로, 유실물 검색기능과 웹 푸시 알림을 제공하는 서비스입니다.

- 배포 주소: https://sniffy.64bit.kr
- 테스트 계정 (ID / PW): `sniffy` / `sniffy@test`

## 개발 기간

2025.11.14 ~ 2025.12.30

## 목차

- [주요 기능](#주요-기능)
- [스크린샷](#스크린샷)
- [개발 환경](#개발-환경)
- [프로젝트 구조](#프로젝트-구조)
- [실행 방법](#실행-방법)

## 주요 기능

- 유실물 검색 및 조회
  - 필터(카테고리, 날짜, 색상, 보관 장소)를 통한 상세 검색 제공
  - 페이지네이션 기반의 검색 결과 리스트 조회

- 내 주변 유실물 센터 찾기
  - Kakao Local API를 활용한 주소 기반 유실물 센터 검색
  - Geolocation API를 활용한 사용자 위치 기반 주변 유실물 센터 검색

- 사용자 맞춤형 서비스
  - 라이트 / 다크 테마 지원
  - 반응형 레이아웃 지원

- PWA 및 웹 푸시 알림
  - PWA 지원을 통한 설치형 앱 경험 제공
  - 서비스 워커를 이용한 키워드 푸시 알림 제공

## 스크린샷

<table>
  <tr>
    <td width="50%">
      <img src="https://github.com/user-attachments/assets/18218e85-bb3d-4b5e-8b43-bc35e22c9a64" />
    </td>
    <td width="50%">
      <img src="https://github.com/user-attachments/assets/a2786f24-b7f4-4b82-8965-b308141ac660" />
    </td>
  </tr>
  <tr>
    <th>라이트 모드</th>
    <th>다크 모드</th>
  </tr>
</table>

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/c3db9de1-76d6-4baf-9644-085c31b2b914" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/85de3fc8-f3d0-4364-83bf-eca2ce5228d2" />
    </td>
  </tr>
  <tr>
    <th>태블릿 레이아웃</th>
    <th>모바일 레이아웃</th>
  </tr>
</table>

<table>
  <tr>
    <td>
      <video src="https://github.com/user-attachments/assets/4d1969b0-5d48-42e4-b963-1a7b952aba5d" controls preload></video>
    </td>
  </tr>
  <tr>
    <th>PWA 및 반응형 레이아웃 시연</th>
  </tr>
</table>

## 개발 환경

- Language: JavaScript
- Framework: React 18, Vite
- State Management: Redux Toolkit
- UI Library: Material UI (MUI)
- Http Client: Axios
- Maps: React Kakao Maps SDK
- PWA: Vite Plugin PWA

## 프로젝트 구조

```
src
├── app             # 앱 전역 설정 (Store, Routes)
├── components      # 공통 컴포넌트 (Header, Footer, Layout 등)
├── constants       # 상수 데이터 (카테고리, 색상 정보)
├── features        # 기능별 모듈
│   ├── agency      # 유실물 센터 관련 (API)
│   ├── auth        # 인증 관련 (로그인, 회원가입, Slice)
│   ├── home        # 메인 페이지 구성 요소
│   ├── items       # 유실물 검색 및 상세 조회
│   ├── map         # 지도 및 위치 정보 로직 (Kakao Map)
│   ├── mypage      # 마이페이지 (프로필, 설정, 즐겨찾기)
│   ├── notice      # 알림 목록 및 관리
│   ├── push        # 푸시 알림 구독 로직
│   ├── stats       # 유실물 통계
│   └── theme       # 테마 설정 (Dark/Light)
├── hooks           # 커스텀 훅 (useApi 등)
├── styles          # MUI 테마 설정
└── utils           # 유틸리티 함수 (HttpClient 등)
```

## 실행 방법

로컬 환경에서 프로젝트를 실행하기 위한 가이드입니다.

### 1. 사전 요구 사항

- Node.js 20 이상
- [카카오 디벨로퍼스](https://developers.kakao.com) JavaScript 키
- 카카오 디벨로퍼스 앱의 카카오맵 사용설정 ON
- 로컬 환경에서 실행중인 [백엔드 서버](https://github.com/salmontaker/sniffy-be)

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 입력해주세요.

```properties
# Backend API URL
VITE_API_URL=[백엔드 API 주소]

# Kakao Map JavaScript Key
VITE_KAKAO_JS=[카카오 지도 JS 키]

# Web Push VAPID Public Key (백엔드와 일치해야 함)
VITE_VAPID_KEY=[VAPID 공개키]
```

### 3. 패키지 설치 및 실행

터미널에서 아래 명령어를 순서대로 실행합니다.

```shell
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 4. Docker로 실행하기 (선택사항)

Docker 환경에서 실행하려면 아래 명령어를 사용합니다.

```shell
# 이미지 빌드
docker build -t sniffy-fe .

# 컨테이너 실행 (80 포트)
docker run -d -p 80:80 --name sniffy-fe sniffy-fe
```