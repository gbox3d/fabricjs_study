## 준비하기 

**라이브러리 다운받기**

```sh
wget https://raw.githubusercontent.com/fabricjs/fabric.js/master/dist/fabric.js
wget https://raw.githubusercontent.com/fabricjs/fabric.js/master/dist/fabric.min.js
```

**npm 으로 설치하기**
```
npm install --save fabric
```

## es6방식으로 사용하기

```js
import { fabric } from "fabric"; 
```
이런 식으로는 사용할수 없어서 아래와 같이 사용합니다.

먼저 html에서 script 태그를 추가하고
```html
<script src="../../node_modules/fabric/dist/fabric.js" ></script>
```
main.js 에서 다음과 같이 해서 사용합니다.  
```js
const fabric = window.fabric;
```

basic/ex01 예제 참고 하세요.  

## 확장 라이브러리 사용하기

### undo redo 구현

https://github.com/lyzerk/fabric-history

다운받기   
```sh
wget https://raw.githubusercontent.com/lyzerk/fabric-history/master/src/index.js -O fabric-history.js
wget https://raw.githubusercontent.com/lyzerk/fabric-history/master/src/index.min.js -O fabric-history.min.js
```

## 기타
- 씬관리 기능은없으므로 직접 만들어 써야할듯하다.


**참고자료**
공식  
http://fabricjs.com/

코드모음   
https://m.blog.naver.com/PostView.nhn?blogId=freegunkng&logNo=220954153648&proxyReferer=https%3A%2F%2Fwww.google.com%2F

튜토리얼  
https://github.com/fabricjs/fabric.js/wiki/Tutorial
