// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;

function main() {

    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(640);
    fbCanvas.setWidth(640);

    // create a rectangle object
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: '#ff0000',
        width: 64,
        height: 64
    });

    var circle = new fabric.Circle({
        radius: 20, fill: 'green', left: 100, top: 100
    });
    var triangle = new fabric.Triangle({
        width: 20, height: 30, fill: 'blue', left: 50, top: 50
    });

    fbCanvas.add(rect);
    fbCanvas.add(circle);
    fbCanvas.add(triangle);

    document.addEventListener('keydown', function (evt) {

        console.log(evt)

        switch (evt.code) {
            case 'KeyA':
                rect.set('left', rect.get('left') - 10);
                rect.setCoords(); //좌표갱신
                break;
            case 'KeyD':
                rect.set('left', rect.get('left') + 10);
                rect.setCoords();
                break;
            case 'KeyW':
                rect.set('top', rect.get('top') - 10);
                rect.setCoords();
                break;
            case 'KeyS':
                rect.set('top', rect.get('top') + 10);
                rect.setCoords();
                break;
            case 'KeyQ':
                triangle.set('angle', triangle.get('angle') - 5);
                break;
            case 'KeyX':
                fbCanvas.remove(rect);
                break;
            case 'KeyZ':
                fbCanvas.add(rect);
                break;
            case 'KeyC':
                fbCanvas.setActiveObject(rect);
                break;
            case 'KeyV':
                fbCanvas.discardActiveObject();
                break;
        }

        fbCanvas.requestRenderAll();
    });

}

export default main;