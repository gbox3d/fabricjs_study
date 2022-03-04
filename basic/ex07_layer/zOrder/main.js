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

    //사각형 오브잭트 생성
    fbCanvas.add(new fabric.Rect({
        left: 0,
        top: 0,
        fill: 'red',
        width: 64,
        height: 64,
        id: nanoid(10)
    }));

    fbCanvas.add(new fabric.Rect({
        left: 8,
        top: 8,
        fill: 'blue',
        width: 64,
        height: 64,
        id: nanoid(10)
    }));

    fbCanvas.add(new fabric.Circle(
        {
            radius: 32, fill: 'green', left: 16, top: 16,
            id: nanoid(10)
        }
    ));

    console.log(fabric.version)

    this.fbCanvas = fbCanvas;

    const objView = document.querySelector('#objView');
    const objList = document.querySelector('#objList');


    function _updateObjView() {

        //remove objList child all
        while (objList.firstChild) {
            objList.removeChild(objList.firstChild);
        }

        fbCanvas.forEachObject(function (obj) {
            console.log(obj.type)
            const li = document.createElement('li');
            li.innerText = `${obj.type} : ${obj.id}`;
            li.dataset.objid = obj.id
            if (obj === fbCanvas.getActiveObject()) {
                li.classList.add('select');
            }
            objList.appendChild(li);
        });

        //scroll last item
        objList.scrollTop = objList.scrollHeight;
    }

    _updateObjView();

    objList.addEventListener('click', function (e) {

        console.log(e.target)

        if (e.target.tagName === 'LI') {
            const children = document.querySelector('#objList').children

            _.each(children, function (child) {
                child.classList.remove('select')
            })
            e.target.classList.add('select')


            //get object by id
            const objId = e.target.dataset.objid;
            const obj = _.find(fbCanvas.getObjects(), obj => obj.id === objId);

            //set active
            fbCanvas.setActiveObject(obj);

            fbCanvas.requestRenderAll();
        }



    });

    // function objectSelectedHandler(e) {
    //     console.log(e)

    //     const children = objList.children

    //     let selobj = _.find(children, child => child.dataset.objid === e.selected[0].id);
    //     let deSelobj = _.find(children, child => e.deselected ? child.dataset.objid === e.deselected[0].id : null);

    //     selobj.classList.add('select')
    //     deSelobj?.classList.remove('select')

    //     //scroll to
    //     objList.scrollTop = selobj.offsetTop - 8;

    //     console.log(selobj)
    // }

    // fbCanvas.on(
    //     {
    //         'selection:created': objectSelectedHandler,
    //         'selection:updated': objectSelectedHandler,
    //     }
    // );

    //object selection process
    fbCanvas.on('mouse:down', (evt) => {
        // console.log(evt)
        let targetObj = evt.target;
        const children = objList.children

        _.each(children, function (child) {
            child.classList.remove('select')
        });

        let selobj = _.find(children, child => child.dataset.objid === targetObj.id);
        selobj.classList.add('select')

    })



    objView.querySelector('.up').addEventListener('click', () => {

        let selobj = fbCanvas.getActiveObject();

        if (selobj) {
            let objIndex = _.findIndex(fbCanvas.getObjects(), obj => obj.id === selobj.dataset.objid);
            console.log(objIndex)
            // let _obj = fbCanvas.getObjects()[objIndex];
            if (objIndex > 0) {
                fbCanvas.moveTo(fbCanvas.getObjects()[objIndex], objIndex - 1);
            }
        }

        _updateObjView();
    })

    //down btn handler
    objView.querySelector('.down').addEventListener('click', () => {

        let selobj = fbCanvas.getActiveObject();

        if (selobj) {
            let objIndex = _.findIndex(fbCanvas.getObjects(), obj => obj.id === selobj.dataset.objid);
            if (objIndex < fbCanvas.getObjects().length - 1) {
                fbCanvas.moveTo(fbCanvas.getObjects()[objIndex], objIndex + 1);
            }
        }

        _updateObjView();
    });

    objView.querySelector('.insert').addEventListener('click', () => {

        let selobj = fbCanvas.getActiveObject();

        if (selobj) {
            let objIndex = _.findIndex(fbCanvas.getObjects(), obj => obj.id === selobj.dataset.objid);
            let _obj = fbCanvas.getObjects()[objIndex];

            _obj.clone(function (clone) {
                // fbCanvas.add(clone);
                clone.set('id', nanoid(10));
                clone.set('left', clone.left + _.random(-32, 32));
                clone.set('top', clone.top + _.random(-32, 32));
                clone.set('fill', '#' + Math.floor(Math.random() * 16777215).toString(16));
                fbCanvas.insertAt(clone, objIndex);
            });

            // fbCanvas.insertAt(new fabric.Circle({
            //     radius: 32, 
            //     //random color
            //     fill: `rgb(${_.random(0, 255)},${_.random(0, 255)},${_.random(0, 255)})`,
            //     left: selobj.get('left') + _.random(-32, 32),
            //     top: selobj.get('top') + _.random(-32,32),
            //     id: nanoid(10)
            // }), objIndex);
        }

        _updateObjView();
    });

    objView.querySelector('.front').addEventListener('click', () => {
        let selobj = fbCanvas.getActiveObject();
        if (selobj) {
            selobj.bringToFront();
        }
        _updateObjView();
    });

    objView.querySelector('.bottom').addEventListener('click', () => {
        let selobj = fbCanvas.getActiveObject();
        if (selobj) {
            selobj.sendToBack();
        }
        _updateObjView();
    });



}

export default main;