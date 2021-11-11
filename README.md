# 🔥 Assignment_8Percent (with NestJS)

🧱 wanted x wecode 프리온보딩 백엔드 코스 - [Assignment 4] 8percent

[8퍼센트 사이트](https://8percent.kr/)

[원티드 채용 링크](https://www.wanted.co.kr/wd/64695)



## ☄️ 팀원 소개

| 이름                                     | 담당 기능 |
| ---------------------------------------- | --------- |
| [김바다](https://github.com/sally0226)   |           |
| [김효민](https://github.com/luckyhyom)   |           |
| [원동균](https://github.com/WonDongGyun) |           |
| [이나영](https://github.com/bokiri409)   |           |
| [장희진](https://github.com/heejin99)    |           |
| [조재복](https://github.com/ildang100)   |           |



## 🌎 배포

주소 : 



## 🛠 프로젝트 빌드 및 서버 실행 방법

1. 상단의 Code 버튼을 눌러 경로를 복사한 후 클론 받습니다.

```
$ git clone https://github.com/preOnboarding-Team13/Assignment-3-redbrick.git
```

1. 패키지를 설치합니다.

```
$ npm install
```

1. 서버를 실행해 줍니다.

```
$ npm start
```

1. 정해진 API에 접근하여 서비스를 이용합니다.



## 📝 과제 요구사항

### [필수 포함 사항]

- READ.ME

   작성

  - 프로젝트 빌드, 자세한 실행 방법 명시
  - 구현 방법과 이유에 대한 간략한 설명
  - 완료된 시스템이 배포된 서버의 주소
  - Swagger나 Postman을 통한 API 테스트할때 필요한 상세 방법
  - 해당 과제를 진행하면서 회고 내용 블로그 포스팅

- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현

  

**✔️ API 목록**

거래내역 조회 API

- 입금 API
- 출금 API

**✔️ 주요 고려 사항은 다음과 같습니다.**

- 계좌의 잔액을 별도로 관리해야 하며, 계좌의 잔액과 거래내역의 잔액의 무결성의 보장

- DB를 설계 할때 각 칼럼의 타입과 제약

**✔️ 구현하지 않아도 되는 부분은 다음과 같습니다.**

- 문제와 관련되지 않은 부가적인 정보. 예를 들어 사용자 테이블의 이메일, 주소, 성별 등

- 프론트앤드 관련 부분

**✔️  제약사항은 다음과 같습니다.**

- (**8퍼센트가 직접 로컬에서 실행하여 테스트를 원하는 경우를 위해**) 테스트의 편의성을 위해 mysql, postgresql 대신 sqllite를 사용해 주세요.

**✔️  상세설명**

**1)** 거래내역 조회 **API**

거래내역 API는 다음을 만족해야 합니다.

- 계좌의 소유주만 요청 할 수 있어야 합니다.
- 거래일시에 대한 필터링이 가능해야 합니다.
- 출금, 입금만 선택해서 필터링을 할 수 있어야 합니다.
- Pagination이 필요 합니다.
- 다음 사항이 응답에 포함되어야 합니다.
  - 거래일시
  - 거래금액
  - 잔액
  - 거래종류 (출금/입금)
  - 적요

**2)** 입금 **API**

입금 API는 다음을 만족해야 합니다.

- 계좌의 소유주만 요청 할 수 있어야 합니다.

**3)** 출금 **API**

출금 API는 다음을 만족해야 합니다.

- 계좌의 소유주만 요청 할 수 있어야 합니다.
- 계좌의 잔액내에서만 출금 할 수 있어야 합니다. 잔액을 넘어선 출금 요청에 대해서는 적절한 에러처리가 되어야 합니다.

**4)** 가산점

다음의 경우 가산점이 있습니다.

- Unit test의 구현
- Functional Test 의 구현 (입금, 조회, 출금에 대한 시나리오 테스트)
- 거래내역이 1억건을 넘어갈 때에 대한 고려
  - 이를 고려하여 어떤 설계를 추가하셨는지를 README에 남겨 주세요.



## :world_map: API 설계

[API 설계 노션 링크](https://gifted-catboat-f9b.notion.site/API-ef383ed2b15d4904b5087ee3cf33ba35)



## :sailboat: 도메인 주도 설계

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a7e2aaf8-3623-4736-94c8-28608b02016f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211111T151051Z&X-Amz-Expires=86400&X-Amz-Signature=110da49dcbe74d3937bddfa7f6dab6406d724e0d8f66402bccac22b3908675e6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)



## 🧬 DB 모델링

![img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ddb804eb-e67e-48d3-a3c1-85be93a3338f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211111T151137Z&X-Amz-Expires=86400&X-Amz-Signature=1ac1be80242ac3aa1034701eb134118c445c32a694c7f8d7488313ed4618008d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)



## 🏫 사용 기술

-   Backend : <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=NestJS&logoColor=white"/></a> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/></a> 
-   DataBase : <img src="https://img.shields.io/badge/SQLite-003B57?style=flat&logo=SQLite&logoColor=white"/></a>
-   Collaboration : <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white"/></a>
-   Deploy : <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat&logo=Amazon AWS&logoColor=white"/>



## 📂 폴더 구조

```
```



## 🔗 구현 기능

#### 1) Check List

- User

  [ ]  회원가입

  [ ]  로그인

- 계좌 관리

  [ ]  계좌 생성

  [ ]  계좌 삭제

- 거래 및 조회

  [ ]  거래내역 조회 API

  - 입금/ 출금/ 전체 내역 조회
  - 시작날짜 ~ 종료날짜 검색
  - 최소금액 ~ 최대금액 검색
  - 적요 검색

  [ ]  입금 API

  [ ]  출금 API

- 테스트 코드

  [ ]  Unit Test

  [ ]  Functional Test  (입금, 조회, 출금에 대한 시나리오 테스트)

- 추가 고려 사항

  [ ]  거래 내역이 1억건 이상일 때에 대한 고려

#### 2) 상세 내용

##### [DB설계 관련 논의사항](https://github.com/preOnboarding-Team13/Assignment-4-8percent/wiki/DB%EC%84%A4%EA%B3%84-%ED%9A%8C%EC%9D%98-%EB%82%B4%EC%9A%A9) 



## 🐾 API

[Postman 주소-링크]()



## 🐾 API Test 방법

#### 1. 위의 Postman 주소 링크를 클릭하여 Postman으로 들어갑니다.

#### 2. 서버 주소가 알맞은지 확인합니다.



## 🍭 TIL 주소

| 김바다 | 김효민 | 원동균 | 이나영 | 장희진 | 조재복 |
| :----: | :----: | :----: | :----: | :----: | :----: |
|        |        |        |        |        |        |
