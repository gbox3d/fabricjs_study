// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;

function main() {

    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#000',
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setWidth(640);
    fbCanvas.setHeight(640);
    //원점이 화면 가운데로 오도록 설정
    fbCanvas.viewportTransform = fabric.util.composeMatrix({ translateX: 320, translateY: 320 })

    document.addEventListener('keydown', async (evt) => {
        console.log(evt)
        switch (evt.key) {
            case 'r': // 파일읽기
                {
                    let resp = await fetch("http://ubiqos001.iptime.org:21030/api/v2/webdisk/readFile", {
                        method: 'POST',
                        body: ['/home/gbox3d/work/dataset/fruts_nuts/images', '0.jpg'].join('\n'),
                        //body : '/home/gbox3d/work/dataset/fruts_nuts',
                        headers: new Headers({
                            "Content-Type": 'application/text'
                        })
                    })

                    console.log(resp)
                    if (resp.ok) {

                        let responseAsBlob = await resp.blob() //바이너리 원본데이터얻기 
                        let imgUrl = URL.createObjectURL(responseAsBlob); //url 객체로 변환

                        fabric.Image.fromURL(imgUrl, ((object) => {
                            console.log(object);

                            //원점 으로 위치변환 
                            fabric.util.applyTransformToObject(object, fabric.util.composeMatrix({}))
                            object.setCoords();

                            fbCanvas.add(object);
                        }));
                    }

                }
                break;
        }
    })
}

export default main;