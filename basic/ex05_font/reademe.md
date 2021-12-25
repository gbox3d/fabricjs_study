## 외부 폰트 읽기

fabrics 에서 외부 폰트를 읽어 올 수 있습니다. 그러기 위해서는 fontfaceobserver 의존성이 필요합니다.  

의존성 추가

```
npm install --save fontfaceobserver
```

스타일 태그 사용 해서 폰트 등록 하기

```css
<style>
    body {
        margin: 0;
        padding: 0;
    }

    @font-face {
        font-family: 'digital-7';
        src: url('./font/DS-DIGI.TTF');
    }
</style>
```
