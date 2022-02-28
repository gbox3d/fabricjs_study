// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;

import './labelRect.js';


globalThis.theApp = {

}

function main() {
    
    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        preserveObjectStacking : true, //선택한 오브잭트 현재 z 순서  유지
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(640);
    fbCanvas.setWidth(640);

    

    theApp.fbCanvas = fbCanvas;

    document.querySelector('#add').addEventListener('click', () => {
        const labeledRect = new fabric.LabeledRect({
            width: 100,
            height: 50,
            left: 100,
            top: 100,
            label: 'test',
            fill: '#faa'
          });
    
        fbCanvas.add(labeledRect);
    });

    const textAreaData = document.querySelector('#canvasData')

    document.querySelector('#load').addEventListener('click', () => {
        // theApp.

        let _data = textAreaData.value;

        console.log(_data)

        fbCanvas.loadFromJSON(_data, 
            (evt) => { //로딩이완료되면 호출
            // console.log(evt)
            console.log('load complete')
            fbCanvas.requestRenderAll();
        },
            (json_object, fabric_object) => { //객체하나가 로딩될때마다 호출됨
                console.log(json_object)
                // console.log(fabric_object)
                // console.log('load complete')
            }
        );
    });

    document.querySelector('#save').addEventListener('click', () => {
        let json = theApp.fbCanvas.toJSON();
        // console.log(JSON.stringify(json));
        let _strJson = JSON.stringify(json);
        textAreaData.value = _strJson;

        localStorage.setItem('canvasData', _strJson);
    });

    textAreaData.value = localStorage.getItem('canvasData');

    console.log(fabric.version)
}

export default main;