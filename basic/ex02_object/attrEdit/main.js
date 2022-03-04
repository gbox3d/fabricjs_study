// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;

import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

function main() {

    console.log(_.random(1, 100));

    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        preserveObjectStacking: true, //선택한 오브잭트 현재 z 순서  유지
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(512);
    fbCanvas.setWidth(512);

    console.log(fabric.version)

    this.fbCanvas = fbCanvas;

    const objView = document.querySelector('#objView');
    const attrFrom = document.querySelector('#attrFrom');

    function deSerialize(targetObj) {

        attrFrom.objId.value = targetObj.id;
        attrFrom.left.value = targetObj.left;
        attrFrom.top.value = targetObj.top;
        attrFrom.radius.value = targetObj.radius;
        attrFrom.fill.value = targetObj.fill;
    }

    //object selection process
    fbCanvas.on('mouse:down', (evt) => {
        // console.log(evt)
        let targetObj = evt.target;

        if (targetObj) {
            deSerialize(targetObj);
        }
        else {
            attrFrom.objId.value = '';
            attrFrom.left.value = '';
            attrFrom.top.value = '';
            attrFrom.radius.value = '';
        }
    });

    fbCanvas.on('object:moving', (evt) => {
        let targetObj = evt.target;

        if (targetObj) {
            deSerialize(targetObj);
        }
    });

    objView.querySelector('.add').addEventListener('click', (evt) => {

        let obj = new fabric.Circle(
            {
                fill: `rgb(${_.random(0, 255)}, ${_.random(0, 255)}, ${_.random(0, 255)})`,
                left: _.random(0, fbCanvas.width),
                top: _.random(0, fbCanvas.height),
                radius: _.random(16, 64),
                id: nanoid(10)
            }
        )

        fbCanvas.add(obj)
    });

    objView.querySelector('.remove').addEventListener('click', (evt) => {
        let targetObj = fbCanvas.getActiveObject();
        if (targetObj) {
            fbCanvas.remove(targetObj)
        }
    });

    objView.querySelector('.edit').addEventListener('click', (evt) => {
        let targetObj = fbCanvas.getActiveObject();
        if (targetObj) {
            targetObj.set({
                left: parseInt(attrFrom.left.value),
                top: parseInt(attrFrom.top.value),
                radius: parseInt(attrFrom.radius.value),
                fill: attrFrom.fill.value
            })
            targetObj.setCoords();
            fbCanvas.requestRenderAll();
        }
    });

    objView.querySelector('.insert').addEventListener('click', (evt) => {

        let targetObj = fbCanvas.getActiveObject();

        let _index = _.findIndex(fbCanvas._objects, (obj) => {
            return targetObj === obj;
        })

        targetObj.clone(function (clone) {
            // fbCanvas.remove(targetObj);
            clone.set({
                left: targetObj.left + _.random(-20, 20),
                top: targetObj.top + _.random(-20, 20),
                fill: '#' + Math.floor(Math.random() * 16777215).toString(16)
            })
            clone.setCoords();
            fbCanvas.insertAt(clone, _index ,
                false //true 이면 지우고 삽입 (덮어쓰는효과)
                );
            fbCanvas.requestRenderAll();
            // clone.bringToFront();
        });

    });

}

export default main;