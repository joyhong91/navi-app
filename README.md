# Navigation app

react + typescript

## Getting Start
In the project directory, you can run:
### `npm install` -> `npm start`


## Request Options
- router를 이용하지 않고(페이지 전환 없이) 컴포넌트 내에서만 전환되어야한다.
- 전환된 페이지는 브라우저 새로고침을 하더라도 유지되어야한다.
- 여러 곳에서 재활용 가능한 컴포넌트로 제작 해야 한다.

## Directory
- src > components > Template > TabComponent.tsx
- src > components > Template > contentComponent.tsx

## How to use?
```
import TabComponent from "경로";

const importPages = {
    "첫번째tab이름": [해당 탭 하위 페이지들],
    "두번째tab이름": [해당 탭 하위 페이지들],
    ...
}

<TabComponent 
    tabList={Object.keys(importPages)} 
    contents={Object.values(importPages)}
    name="탭이름(ex.main, sub, profile, detail ...etc)" 
/>
```