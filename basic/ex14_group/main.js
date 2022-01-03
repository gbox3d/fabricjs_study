// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;

function main() {

    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(640);
    fbCanvas.setWidth(640);

    console.log(fabric.version)

    var red = new fabric.Rect({
        top: 100,
        left: 0,
        width: 80,
        height: 50,
        fill: 'red'
    });
    var blue = new fabric.Rect({
        top: 0,
        left: 100,
        width: 50,
        height: 70,
        fill: 'blue'
    });
    var green = new fabric.Rect({
        top: 100,
        left: 100,
        width: 60,
        height: 60,
        fill: 'green'
    });
    // canvas.add(red, blue, green);
    // circle.add(text);

    var group = new fabric.Group([], {
        left: 0,
        top: 0
    });

    group.addWithUpdate(red);
    
    group.on('mousedown', _ => {
        console.log(_)
    })

    fbCanvas.add(group);

    document.addEventListener('keydown', _ => {
        console.log(_)
        if(_.code === 'KeyA') {
            // group.getObjects()
            group.addWithUpdate(blue);
            group.addWithUpdate(green);
            fbCanvas.setActiveObject(red);
            fbCanvas.requestRenderAll();
        }
        else if(_.code === 'KeyD') {
            group.removeWithUpdate(blue);
            group.removeWithUpdate(green);
            fbCanvas.add(blue);
            fbCanvas.add(green);
            
            fbCanvas.requestRenderAll();
        }
    })


}

export default main;