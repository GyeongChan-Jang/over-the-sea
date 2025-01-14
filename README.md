# <img width="30" alt="logo" src="https://user-images.githubusercontent.com/90392240/193596882-0039f118-039e-4b53-ade8-588897987f30.png" /> 바다어때

<div aling="center">
  <img width="550" src="https://user-images.githubusercontent.com/90392240/193597867-7e0ca834-11b2-4960-bb9e-485f36e5d092.gif" /><img width="150" src="https://user-images.githubusercontent.com/90392240/193597561-4d1cb1a5-4c8b-4cdd-ad6e-4ecd23de8613.gif" />
</div>

# 🧑🏻‍💻 프로젝트 개요

### 🏖 해수욕장 여행을 위한 바다의 안전정보, 날씨정보, 위치정보 후기를 제공합니다.

> **수질 정보**

- 적합여부, 대장균, 장구균 수치
- 해양수산부 해수욕장 수질 적합여부 API 활용

> **백사장 정보**

- 적합여부, 카드뮴, 수은 수치
- 해양수산부 해수욕장 백사장 적합여부 API 활용

> **날씨 정보**

- 대기상황, 기온, 습도, 풍향
- 기상청 단기예보 조회 API 활용

## 🧐 Why?

- 여름 휴가철 안전한 해수욕장 여행을 위한 정보들을 쉽게 볼 수 있는 서비스가 있었으면 좋겠다는 생각을 했습니다.

- 파편적인 해수욕장 정보들을 한번에 볼 수 있다면 유용하다고 생각했습니다.

- 실제적인 날씨 정보와 위치정보 그리고 잘 찾지 못하는 해수욕장의 안전정보를 한번에 볼 수 있는 서비스는 기존에 없었습니다.

# 🛠 기술 스택

- **언어**: TypeScript
- **상태관리**: Redux Toolkit
- **서버/DB**: Firebase
- **스타일링**: TailWind CSS, Flowbite, MUI
- **주요 라이브러리**: 카카오맵 API

## 🤔 How?

> **Firebase**

- 단순히 정보만 획득하는 서비스가 아닌 소통이 가능한 SNS성 서비스를 만들고 싶었습니다.

- 사용자의 정보를 저장하고, 포스팅을 할 수 있으며 댓글을 남기고, 좋아요 기능이 필요했습니다.

- Firebase를 통해 그 기능들을 구현하였고 프론트 뿐만 아니라 백엔드의 이해도를 높일 수 있었습니다.

> **Redux Toolkit**

- 회원가입, 로그인을 구현하고 로그인 상태를 전역에서 관리하기 위해 Redux Toolkit을 사용하였습니다.

- createAsyncThunk를 통해 비동기 처리를 하였습니다. 회원가입, 이메일 로그인, 소셜로그인, 로그아웃, 유저정보 가져오기 등의 기능을 구현하였습니다.

- persistedReducer를 통해 새로고침해도 로그인 상태를 유지할 수 있도록 하였습니다.

> **카카오맵 API**

- 시각적 요소와 실제 해변위치에 대한 정보를 제공하기 위해 카카오맵 API를 사용하였습니다.

- 해수욕장의 위치를 지도에 표시하고, 마커와 오버레이를 통해 해당 해수욕장의 정보를 볼 수 있게 하였습니다.

- 최대한 지도 API가 제공하는 다양한 기능을 사용해 보려고 노력하였습니다. 그러기 위해선 공식문서를 깊이 분석해야했습니다.

- 마커 찍기, 커스텀 오버레이, 인포 윈도우, 마커 클러스터, 줌인/아웃, 내 위치 찾기, 지도 타입 변경, 지도 위치 이동 기능을 구현했습니다.

> **TypeScript**

- 타입스크립트를 사용하면서 타입에 대한 이해도를 높일 수 있었고, 코드의 가독성을 높일 수 있었습니다.

- 직접 사용하면서 사용의 필요성을 느낄 수 있었고 시간이 오래 걸렸지만 사전에 에러를 방지할 수 있어서 좋았습니다.

# 🎮 기능 설명

## 소셜 로그인

> 구글과 페이스북 소셜 로그인

<img width="700" src='https://user-images.githubusercontent.com/90392240/193623291-00c25b06-3709-4399-acca-69951e9f1189.gif' />

- Firebase Authentication을 연동해 구현했습니다.

## 🎯 내 위치 찾기

> Geolocation API 사용

<img width="700" src="https://user-images.githubusercontent.com/90392240/193602698-6e569c09-6052-41b2-9c9b-18ca23650066.png" />

- 우측 상단 '내 위치' 토글을 통해 언제나 나의 위치로 이동 가능합니다.

- 브라우저 위치 동의시 내 위치로 이동할 수 있습니다.

- useGeolocation 커스텀 훅을 사용하여 latitude, longitude 위치 값을 가져왔습니다.

## 🔍 해수욕장 검색

> 시도별 버튼 클릭 하여 마커 hover시 마커 윈도우로 간단 정보 표시

<img width="700" src="https://user-images.githubusercontent.com/90392240/193604058-f6d713c4-51ca-40d3-b16e-b1616ad082df.png" />

- 시도별 지역에 따라 API 호출을 달리하여 해당 지역의 해수욕장 정보를 가져왔습니다.

- 지역의 해수욕장 정보를 가져와 마커로 표시하였습니다.

- 마커에 마우스 hover시 인포 윈도우를 통해 해수욕장 간단 정보를 표시했습니다.

## 🏝 해수욕장 날씨, 수질, 백사장 정보

> 해수욕장 마커 클릭시 커스텀 오버레이로 날씨, 수질, 백사장 정보 표시

<img width="700" src="https://user-images.githubusercontent.com/90392240/193615682-7c81eb3f-1e08-4c9b-a059-0971276d2a25.gif" />

- 커스텀 오버레이를 통해 직접 스타일링 하였습니다.

- 오버레이에 날씨, 수질, 백사장 전부를 모두 볼 수 있게 하였습니다.

- 탭 클릭시마다 로딩을 제거하기 위해 오버레이 클릭시 날씨, 수질, 백사장 정보를 모두 가져오도록 API를 호출하였습니다.

## ☀️ 해수욕장의 상세날씨 정보

> 해수욕장의 상세한 날씨 정보 제공(현재/최저/최고 기온, 습도, 풍속)

<img width="700" src="https://user-images.githubusercontent.com/90392240/193617468-3cb2d614-369d-46cc-b1e5-c27a79ee8a93.gif" />

- 가장 어려웠던 기능 중 하나였습니다.

  - API 명세에 나와있는 예보 시간을 계산하여 그 예보 시간에 가장 가까운 정보를 가져오는 것이 어려웠습니다.

    - useTime 커스텀 훅을 만들어 현재 시간을 기준으로 가장 가까운 예보 시간을 계산하였습니다.
    - 향후 24시간의 초단기 예보를 가져오도록 코드를 작성하였습니다.

  - 컨테이너의 크기가 크지 않아 시간에 맞게 그래프로 정보를 나타내기 어려웠습니다.
  
    - 스와이퍼를 통해 컨테이너 크기에 맞게 시각적으로 표현했습니다.
    - 복잡할 수 있는 정보들을 한눈에 보기 쉽게 UI를 구성하였습니다.
    - 그래프 라이브러리 Docs를 적극 참고하여 값들을 표시했습니다.

## 🌊 해수욕장 정보 상세페이지

> 해수욕장의 상세한 정보와 좋아요, 리뷰 기능

<img width="340" src="https://user-images.githubusercontent.com/90392240/193626129-5b22e1fe-ff4a-4a44-9647-6cb9a08a2d13.gif" /> <img width="340" src="https://user-images.githubusercontent.com/90392240/193626233-2944ad45-d831-46f5-913b-24250a4a323d.gif" />

- 해수욕장의 상세한 정보를 제공하는 페이지를 따로 만들었습니다.

  - 리뷰 기능과 좋아요 기능을 구현하기 위해서, 정제된 해수욕장 정보를 제공하기 위해서입니다.
  
- 리뷰는 Firebase DB 상의 각각의 해변정보에 posts 컬렉션을 만들어 저장했습니다.

  - 사진 업로드 기능을 구현하기 위해 Firebase Storage를 사용했습니다.
  - Firebase Storeage에 저장한 사진은 링크만 DB에 저장됩니다.
  
- 좋아요 기능은Firebase DB 해변 도큐먼트 안에 likes 컬렉션을 만들어 유저의 ID를 넣어 구현했습니다.

## ⛱ 해변 한번에 모아보기&필터 기능

> 해변 필터링

<img width="700" src="https://user-images.githubusercontent.com/90392240/193631318-af691bfb-c81f-4ddf-942f-e87d6ac943d3.gif" />

- 검색 가능한 해변 한번에 모아볼 수 있습니다.

- 해변 데이터는 한번에 모든 데이터를 가져와 클라이언트단에서 필터링을 적용했습니다.

  - 데이터를 가져와 필터링시 초기 로딩 이후 필터되는 속도가 상당히 빨랐습니다.
  - 특정 지역의 해변이 몰릴 경우 로딩이 오래 걸릴 수 있어 프론트에서 필터링을 적용했습니다.

## ✍️ 후기 한번에 모아보기&필터

> 후기 필터링

<img width="700" src="https://user-images.githubusercontent.com/90392240/193632379-df2c1dae-0ff5-45f3-81e7-7e19a5fa2027.gif" />

- 해수욕장 리뷰들을 한번에 모아볼 수 있습니다.

- 후기를 필터링 하는 방식은 해변 필터링과는 다르게 시도 버튼 클릭시 서버에서 가져오는 방식으로 구현했습니다.

  - 후기 데이터는 해변 데이터보다 많지 않기 때문에 버튼 누를때마다 가져와도 된다고 판단했습니다.
  - 따라서 DB에 직접 접근해서 where 문으로 쿼리 조건을 걸어 필터링해 리뷰 데이터를 가져왔습니다.

## ❤️ 좋아요 Top 10 해수욕장

> 조건에 맞는 해수욕장을 가져오는 함수 사용

<img width="700" src="https://user-images.githubusercontent.com/90392240/193633715-8c7b1662-bc39-4200-b099-7679d78cc00b.png" />

- 사용자들이 가장 많이 좋아요를 누른 해수욕장 상위 10개를 보여줍니다.
- Firebase DB에 where문의 쿼리조건을 통해 좋아요가 가장 많은 순서대로 해수욕장 데이터를 가져왔습니다.

## 📱 모바일 반응형

> 모바일 사용자 고려

<img width="200" src="https://user-images.githubusercontent.com/90392240/197249911-997ba0e3-cdc3-4e6a-b01d-9e9082b47779.png" /> <img width="200" src="https://user-images.githubusercontent.com/90392240/197249837-429e1753-f45b-4583-b7e6-50f57ae04134.png" /> <img width="200" src="https://user-images.githubusercontent.com/90392240/197249883-d0c9c479-6bc9-41c8-a692-175c9cbe9124.png" /> <img width="200" src="https://user-images.githubusercontent.com/90392240/197249817-d6698460-1b9b-4c24-b192-9c427a1639b2.gif" />

- 처음 기획부터 모바일을 고려하여 반응형으로 컴포넌트들을 설계했습니다.

## Trouble Shooting

> 해수욕장 데이터를 Firebase DB에 입력

<img width="700" src="https://user-images.githubusercontent.com/90392240/197250258-ccc72725-83ff-48ae-9966-a7a9d5a6cb6b.png" />

- 해수욕장 API를 통해 모든 해수욕장 정보를 불러와 Firebase DB에 입력하는 것이 난관이었습니다.

- Firebase 공식문서를 찾아보며 Firebase DB 접근 방법을 찾아보았습니다.

- 데이터를 입력하는 함수를 통해서 반복문을 사용해 데이터를 입력했습니다.

> 해수욕장 이미지 데이터

- 공공 API를 통해서 받아온 해변 정보의 이미지가 존재하지 않았습니다.

- 따라서 임의의 해변 데이터를 넣어줘야 했습니다.

- 이미지 저장 툴을 통해 300개 가량의 해변 이미지 데이터를 구했고, 이를 Firebase Storage에 저장했습니다.

- 저장한 이미지 링크들을 Firebase DB에 접근해 해수욕장 각각의 필드의 값으로 넣어주는 함수를 만들어 해결했습니다.

> CORS 에러

- 공공데이터 API 호출시 CORS 에러가 발생했습니다.

- 프론트에서 임시로 해결할 수 있는 방법인 proxy 서버 우회를 통해 해결했습니다.

# 🧐 회고&느낀점

하나의 완성된 프로젝트를 스스로의 힘으로 완성했다는 것이 큰 성취감을 주었습니다.
공공데이터 API 여러개를 사용하고 데이터를 파싱하고 파이어베이스 코드를 다루고 전역상태관리를 하는 등
어떤 것 하나 쉬운 것이 없었지만 끝까지 포기하지 않고 여러번의 시도끝내 해낼 수 있었습니다.
이 프로젝트를 통해 해결될 때 까지 코드를 붙잩고 계속 고민하는 과정이 개발의 필수적이란 것을 느낄 수 있었습니다.

프로젝트를 진행하며 '내가 이 서비스의 사용자라면 어떨까?'라는 생각을 계속했습니다.
사용자의 입장에서 기능들을 만드려고 노력했고 UX를 해친다고 판단하면 과감히 제외시켰습니다.
또한 초기 기획의 중요성을 알게되었습니다. 프로젝트 기획이 제대로 되어있지 않아 개발하면서 어떻게 만들지 생각하다보니 더 많은 시간이 소모 됐습니다.
처음 프로젝트 설계가 얼마나 중요한지 깨닫게 되었습니다.
바로 코드를 작성하기 보다는 시간을 들여 테크 스팩과 디자인, 컨셉등을 고민하여 확정하는 것이더 빠른 개발을 할 수 있는 밑거름이라는 것을 알게 되었습니다.

아직 부족한 프로젝트이고 제대로 최적화도 안되어있지만 정말 배운 것이 많고 개발에 흥미를 느끼게 해준 프로젝트라서 앞으로도 기억에 많이 남을 것 같습니다.
만족하지 않고 부족했던 것을 바로잡아 더 발전하는 개발자가 될 것입니다.

# ✨ 결과&배운점

### - Firebase를 통해 백엔드 서버를 구축하고 DB를 생성해 데이터를 관리할 수 있습니다.

    - Firebase의 NoSQL DB인 Cloud Firestore를 사용할 수 있습니다.
    - Firestore의 구조인 Collection과 Document를 이해하고 활용할 수 있습니다.

### - Firebase의 인증기능을 사용하여 회원가입과 로그인을 구현 가능합니다.

     - 이미지는 DB의 직접 저장하지 않고 storage에 저장하여 URL을 받아와 사용한다는 개념을 알았습니다.
     - 이를 위해 Firebase의 storage를 구성해 활용했습니다.

### - TypeScript를 통해 사전 에러를 방지하고 타입을 명확히하여 개발의 효율성을 높일 수 있습니다.

### - Redux Toolkit으로 전역관리와 비동기 통신을 할 수 있습니다.

    - createAsyncThunk를 사용하여 비동기 통신을 처리할 수 있습니다.

### - 지도 API를 사용하여 지도를 구현하고 지도 관련 기능을 개발할 수 있습니다.

    - 마커 찍기, 커스텀 오버레이, 인포 윈도우, 마커 클러스터, 줌인/아웃, 내 위치 찾기, 지도 타입 변경, 지도 위치 이동 기능을 구현할 수 있습니다.

### - 커스텀 Hook을 만들어 사용하여 재사용 가능한 코드를 작성할 수 있습니다.

### - 차트를 활용해서 복잡한 데이터를 보기 쉽게 시각화 할 수 있습니다.
