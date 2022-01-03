// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;
//참고 : http://fabricjs.com/image-filters , http://fabricjs.com/fabric-filters

async function main() {

    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(640);
    fbCanvas.setWidth(640);

    //사용가능한 필터 파이프라인 생성
    fabric.initFilterBackend = function () {
        if (fabric.enableGLFiltering && fabric.isWebglSupported && fabric.isWebglSupported(fabric.textureSize)) {

            console.log('create webgl filter backend max texture size: ' + fabric.maxTextureSize);
            return (new fabric.WebglFilterBackend({ tileSize: fabric.textureSize }));
        }
        else if (fabric.Canvas2dFilterBackend) {
            console.log('create canvas2d filter backend');
            return (new fabric.Canvas2dFilterBackend());
        }
    };

    //webgl filter 사용
    // fabric.filterBackend = webglBackend;
    // fabric.isWebglSupported(fabric.textureSize);

    // const imgObject = await new Promise((resolve, reject) => {

    //     fabric.Image.fromURL('8_3.png', ((object) => {

    //         console.log(object);
    //         object.set("left", 10)
    //         object.set("top", 20)
    //         object.set("scaleX", 0.5)
    //         object.set("scaleY", 0.5)

    //         resolve(object)
    //     }));
    // })
    // fbCanvas.add(imgObject)

    const backGroundImage = await new Promise((resolve, reject) => {
        fabric.Image.fromURL('../res/oota_nao.jpg', ((object) => {
            resolve(object)
        }));
    })
    fbCanvas.setBackgroundImage(backGroundImage)

    var text = new fabric.Text('8',
        {
            left: 0,
            top: 0,
            fontFamily: 'digital-7',
            fill: '#ff0',
            scaleX : 4,
            scaleY : 4

        });
    
    

    // "add" rectangle onto canvas
    fbCanvas.add(text);

    //폰트 를 이미지로 만들기 (필터 적용위하여..)
    const imgObject = await new Promise((resolve, reject) => {

        let _url = text.toDataURL();

        fabric.Image.fromURL(_url, ((object) => {

            console.log(object);
            object.set("left", 100)
            object.set("top", 200)
            // object.set("scaleX", 0.5)
            // object.set("scaleY", 0.5)

            resolve(object)
        }));
    })
    fbCanvas.add(imgObject)



    document.querySelector('#set').addEventListener('click', () => {
        // imgObject.filters[0] = (new fabric.Image.filters.Grayscale())
        imgObject.filters[0] = (new fabric.Image.filters.Blur({
            blur: 0.25
        }))
        imgObject.applyFilters()
        fbCanvas.requestRenderAll()
    });
    document.querySelector('#clear').addEventListener('click', () => {
        imgObject.filters[0] = undefined
        imgObject.applyFilters()
        fbCanvas.requestRenderAll()
    });
}

export default main;