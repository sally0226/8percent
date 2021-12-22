# 🔥 Assignment_8Percent (with NestJS)

🧱 wanted x wecode 프리온보딩 백엔드 코스 - [Assignment 4] 8percent

2021년 11월 한 달 동안 진행된 

[원티드x위코드] 백엔드 프리온보딩 코스의 `4 번째 과제`로 진행했던 레포입니다.

<br>

## 과제 종료 이후 개인적으로 진행한 것들

1. 미완성 상태였던 Seeding 완성
   - 블로그 포스팅 추가 예정
2. Error Handler 리팩토링
   - if문을 이용해서 작성한 기존 Error Handler는 확장성 및 유지보수에 적합하지 않음
   - 따라서, [공식문서의 Exception Filter](https://docs.nestjs.com/exception-filters)를 사용하도록 변경 
3. E2E Test 작성 
   - [에러 해결 과정 포스팅_1](https://bba-dda.tistory.com/113)

<br>

## ☄️ 팀원 소개

| 이름                                     | 담당 기능                                                    |
| ---------------------------------------- | ------------------------------------------------------------ |
| [김바다](https://github.com/sally0226)   | 회원가입, 로그인 API 기능 구현, 코드 리팩토링, Seeding 관련 작업 |
| [김효민](https://github.com/luckyhyom)   | 계좌 생성/삭제 API 기능 구현, 코드 리팩토링, AWS 배포        |
| [원동균](https://github.com/WonDongGyun) | 입/출금 내역 조회 API 기능 구현 및 테스트, 페이징 성능 향상 작업, 프로젝트 환경 설정 |
| [이나영](https://github.com/bokiri409)   | 입/출금 거래 API 기능 구현, 코드 리팩토링, AWS 배포          |
| [장희진](https://github.com/heejin99)    | 계좌 생성/삭제 API 기능 구현, Seeding 관련 작업              |
| [조재복](https://github.com/ildang100)   | -                                                            |

<br>

## 🌎 배포

-

<br>

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

<br>

## :world_map: API 설계

[API 설계 노션 링크](https://gifted-catboat-f9b.notion.site/API-ef383ed2b15d4904b5087ee3cf33ba35)

<br>

## :sailboat: 도메인 주도 설계

이미지 첨부

<br>

## 🧬 DB 모델링

이미지 첨부

<br>

## 🏫 사용 기술

-   Backend : <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=NestJS&logoColor=white"/></a> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/></a> 
-   DataBase : <img src="https://img.shields.io/badge/SQLite-003B57?style=flat&logo=SQLite&logoColor=white"/></a>
-   Collaboration : <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white"/></a>
-   Deploy : <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat&logo=Amazon AWS&logoColor=white"/>

<br>

## 📂 폴더 구조

6개의 domain을 생성했습니다.

- account
- auth
- entities
- search
- transaction
- user

test 폴더: e2e test 폴더

```
📁 src
├── 📁 domain
│  ├── 📂 account
│  │  ├── 📂 dto
│  │  │  ├── 📄 createAccountReq.dto.ts
│  │  │  ├── 📄 createAccountRes.dto.ts
│  │  │  └── 📄 deleteAccountReq.dto.ts
│  │  ├── 📄 account.controller.ts
│  │  ├── 📄 account.module.ts
│  │  ├── 📄 account.repository.ts
│  │  ├── 📄 account.service.spec.ts
│  │  ├── 📄 account.service.ts
│  ├── 📂 search
│  │  ├── ...
│  ├── 📂 transaction
│  │  ├── ...
│  ├── 📂 user
│  │  ├── ...
│  ├── 📂 auth
│  │  ├── 📂 dto
│  │  │  └── 📄 jwtPayload.dto.ts
│  │  ├── 📂 guards
│  │  │  ├── 📄 jwtGuard.guard.ts
│  │  │  └── 📄 localAuthGuard.guard.ts
│  │  ├── 📄 auth.jwtStrategy.ts
│  │  ├── 📄 auth.localStrategy.ts
│  │  ├── 📄 auth.module.ts
│  │  ├── 📄 auth.service.spec.ts
│  │  ├── 📄 auth.service.ts
│  │  └── 📄 user.decorator.ts
│  ├── 📂 entities
│  │  ├── 📂 base
│  │  │  └── 📄 base.entity.ts
│  │  ├── 📄 account.entity.ts
│  │  ├── 📄 history.entity.ts
│  │  └── 📄 user.entity.ts
├── 📂 global
│  ├── 📂 custom
│  │  ├── 📂 decorator
│  │  │  └── 📄 historyDecorator.custom.ts
│  │  ├── 📂 exception
│  │  │  ├── 📄 IncorrectPasswordException.ts
│  │  │  └── 📄 NotFoundAccountException.dto.ts
│  │  │  ├── 📄 SearchAmountException.ts
│  │  │  ├── 📄 SearchCursorException.ts
│  │  │  ├── 📄 SearchDateException.ts
│  │  │  ├── ... custom Exceptions
│  │  │  ├── 📄 ErrorCode.ts
│  │  │  ├── 📄 http-exception.filter.ts
│  ├── 📂 swagger
│  │  └── 📄 setSwagger.swagger.ts
📁 test
├── 📄 app.e2e-spec.ts
└── 📄 jest-e2e.json
📄 .env
📄 nest-cli.json
📄 package.json
📄 package-lock.json
📄 tsconfig.json
📄 tsconfig.build.json
📄 README.md
```

<br>

## 🔗 구현 기능

### 1) Check List

- User

  ✅  회원가입

  ✅  로그인

- 계좌 관리

  ✅  계좌 생성

  ✅  계좌 삭제

- 거래 및 조회

  ✅  거래내역 조회 API

  - 입금/ 출금/ 전체 내역 조회
  - 시작날짜 ~ 종료날짜 검색
  - 최소금액 ~ 최대금액 검색
  - 적요 검색

  ✅  입금 API

  ✅  출금 API

- 테스트 코드

  ✅  Unit Test

  ✖️  Functional Test  (입금, 조회, 출금에 대한 시나리오 테스트)

- 추가 고려 사항

  ✅  거래 내역이 1억건 이상일 때에 대한 고려

<br>

### 2) 상세 내용

#### [DB설계 관련 논의사항](https://github.com/preOnboarding-Team13/Assignment-4-8percent/wiki/DB%EC%84%A4%EA%B3%84-%ED%9A%8C%EC%9D%98-%EB%82%B4%EC%9A%A9) 

#### [TypeOrm에 Seed 추가](https://github.com/preOnboarding-Team13/Assignment-4-8percent/wiki/typeorm%EC%97%90-Seed-%EC%B6%94%EA%B0%80) 

#### [TypeOrm 페이지 성능 향상 도전기](https://github.com/preOnboarding-Team13/Assignment-4-8percent/wiki/TypeOrm-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%B1%EB%8A%A5-%ED%96%A5%EC%83%81-%EB%8F%84%EC%A0%84%EA%B8%B0)

<br>

## 🐾 API

[Postman 주소-링크](https://documenter.getpostman.com/view/15410333/UVC8Ckor)



## 🐾 API Test 방법

#### 1. 위의 Postman 주소 링크를 클릭하여 Postman으로 들어갑니다.

#### 2. Create User, Login API를 이용하여 회원가입과 로그인을 진행할 수 있습니다.

![image](https://user-images.githubusercontent.com/43634786/141534046-8e50e9ee-556d-4a99-b625-e7701556a86b.png)

#### 3. Create, Delete Account API를 이용하여 계좌 생성, 삭제를 진행할 수 있습니다. 

![image](https://user-images.githubusercontent.com/43634786/141534969-648289e3-1404-488d-a5b9-1264319f0fa9.png)

#### 4. Deposit, Withdraw Mondy API를 이용하여 입금, 출금을 할 수 있습니다.

![image](https://user-images.githubusercontent.com/43634786/141538649-334596b8-eac6-4af1-b78b-420f4d11e78e.png)

#### 5. Search History API를 이용하여 조건에 따른 입출금내역 조회를 할 수 있습니다.

![image](https://user-images.githubusercontent.com/63238936/141578654-1a997973-733e-449c-98b2-e4284a8671dc.png)

<br>
<br>

**입/출금 내역 조회 조건**

1. accountNum[계좌번호] (필수)  
2. type[입/출금 유형] (필수) 'all' => 전체 검색, 'deposit' => 입금 내역 검색, 'withdraw' => 출금 내역 검색  
3. startDate[시작 범위] startDate는 endDate와 같이 사용하거나 아예 같이 사용하지 않아야 합니다. 어느 한쪽만 값이 있는 경우는 오류가 납니다.   
4. endDate [종료 범위]  
5. briefs [적요]  
6. minAmount [최저 금액] minAmount는 maxAmount와 같이 사용하거나 아예 같이 사용하지 않아야 합니다. 어느 한쪽만 값이 있는 경우는 오류가 납니다.   
7. maxAmount [최고 금액]  
8. after [다음 페이지 커서] 조회 결과로 나오는 커서를 해당 쿼리에 작성해야 합니다.  
9. before [이전 페이지 커서]  
10. limit [페이지 단위] 아무것도 작성하지 않을 시 10개를 가져오게 됩니다. 

<br>


## 🍭 TIL 주소

| 김바다 |                      김효민                       |                      원동균                      | 이나영 | 장희진 | 조재복 |
| :----: | :-----------------------------------------------: | :----------------------------------------------: | :----: | :----: | :----: |
|        | [티스토리 블로그](https://baejjang.tistory.com/8) | [티스토리 블로그](https://tristy.tistory.com/46) |        |        |        |

<br>

