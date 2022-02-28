// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;

const host_url = 'http://cam2us.ubiqos.co.kr:24030'
const root_path = '/home/ubiqos/work/repository/world'
const image_file = 'oota_nao.jpg'

// import './labelRect.js';
import './myImage.js';


globalThis.theApp = {

}

function main() {

    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        preserveObjectStacking: true, //선택한 오브잭트 현재 z 순서  유지
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(640);
    fbCanvas.setWidth(640);

    theApp.fbCanvas = fbCanvas;

    document.querySelector('#add').addEventListener('click', async () => {

        let resp = await (fetch(`${host_url}/api/v2/webdisk/readFile`, {
            method: 'POST',
            body: `${root_path}\n${image_file}`,
            headers: {
                'Content-Type': 'text/plain'
            }
        }))

        if (resp.ok) {
            let responseAsBlob = await resp.blob() //바이너리 원본데이터얻기 
            let imgUrl = URL.createObjectURL(responseAsBlob); //url 객체로 변환
            let _imgObj = await new Promise((resolve, reject) => {
                fabric.util.loadImage(imgUrl, function (imgElement) {
                    resolve(new fabric.MyImage(imgElement,{
                        labelName : '오오타나오',
                        webDiskSrc: {
                            root_path : root_path,
                            image_file : image_file,
                            host_url : host_url
                        }
                    }));

                });
            });

            fbCanvas.add(_imgObj);
        }
        else {
            console.log('error', resp.status)
        }
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