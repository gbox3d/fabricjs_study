// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;
//참고 : http://fabricjs.com/image-filters , http://fabricjs.com/fabric-filters

// import AlphaMixer from './AlphaMixer.js';
import ColorFy from './ColorFy.js';

async function main() {

    //커스컴 필터 예제
    ColorFy({
        fabric: fabric,
    });


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

    const object = await new Promise((resolve, reject) => {
        fabric.Image.fromURL('../../../res/8_3.png', resolve);
    })

    object.set("left", 10)
    object.set("top", 20)
    object.set("scaleX", 0.5)
    object.set("scaleY", 0.5)

    const _filter = new fabric.Image.filters.ColorFy({
        colorSource: 'rgb(0,0 , 255)'
    })

    object.filters.push(_filter)
    object.applyFilters()

    fbCanvas.add(object);

    {
        const _obj = await new Promise((resolve, reject) => {
            object.clone((cloneObj) => {
                resolve(cloneObj)
            })
        })
    
        _obj.filters[0].colorSource = 'rgb(255,0,0)'
        _obj.set("left", 120)
        _obj.applyFilters()
        fbCanvas.add(_obj);
    }

    {
        const _obj = await new Promise((resolve, reject) => {
            object.clone((cloneObj) => {
                resolve(cloneObj)
            })
        })
    
        _obj.filters[0].colorSource = 'rgb(0,255,0)'
        _obj.set("left", 220)
        _obj.applyFilters()
        fbCanvas.add(_obj);
    }
    
}

export default main;