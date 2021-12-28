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

    const imgObject = await new Promise((resolve, reject) => {

        fabric.Image.fromURL('../../../res/oota_nao.jpg', ((object) => {

            console.log(object);
            object.set("left", 10)
            object.set("top", 20)
            object.set("scaleX", 0.5)
            object.set("scaleY", 0.5)

            resolve(object)
        }));
    })
    fbCanvas.add(imgObject)

    document.querySelector('#set').addEventListener('click', () => {
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

    document.querySelector('#change button').addEventListener('click', () => {
        if(imgObject.filters[0]){
            //기존 필터 파라메터 수정 
            imgObject.filters[0]['blur'] = parseFloat(document.querySelector('#change input').value)
        }
        else {
            imgObject.filters[0] = (new fabric.Image.filters.Blur({
                blur: parseFloat(document.querySelector('#change input').value)
            }))

        }
        imgObject.applyFilters()
        fbCanvas.requestRenderAll()
    });

}

export default main;