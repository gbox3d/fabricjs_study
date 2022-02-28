// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;

// http://jsfiddle.net/fabricjs/S9sLu/

function main() {

    const grid = 64
    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        preserveObjectStacking: true, //선택한 오브잭트 현재 z 순서  유지
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(512);
    fbCanvas.setWidth(512);

    fbCanvas.on('object:moving', function (options) {
        options.target.set({
            left: Math.round(options.target.left / grid) * grid,
            top: Math.round(options.target.top / grid) * grid
        });
    });

    //사각형 오브잭트 생성
    var rect = new fabric.Rect({
        fill: 'red',
        width: 64,
        height: 64
    });
    //오브잭트 등록
    fbCanvas.add(rect);


    for (var i = 0; i < (600 / grid); i++) {
        fbCanvas.add(new fabric.Line([i * grid, 0, i * grid, 600], { stroke: '#ccc', selectable: false }));
        fbCanvas.add(new fabric.Line([0, i * grid, 600, i * grid], { stroke: '#ccc', selectable: false }))
    }



    console.log(fabric.version)
}

export default main;