// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;

function main () {
    
    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        preserveObjectStacking : true, //선택한 오브잭트 현재 z 순서  유지
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(640);
    fbCanvas.setWidth(640);

    //사각형 오브잭트 생성
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 100,
        height: 100,
        angle: 45
    });
    //오브잭트 등록
    fbCanvas.add(rect);

    console.log(fabric.version)
}

export default main;