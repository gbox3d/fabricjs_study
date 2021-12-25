// import { fabric } from "fabric"; //es6 방식
import { fabric } from "../../libs/fabric_util.js";
// import FontFaceObserver from "../../node_modules/fontfaceobserver/fontfaceobserver.js";

const FontFaceObserver = window.FontFaceObserver;

function main () {
    
    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(640);
    fbCanvas.setWidth(640);

    function loadAndUse(font) {
        var myfont = new FontFaceObserver(font)
        myfont.load()
          .then(function () {
            // when font is loaded, use it.
            //fbCanvas.getActiveObject().set("fontFamily", font);
            //fbCanvas.requestRenderAll();
            console.log(`font loaded : ${font}`);
  
            var text = new fabric.Text('2021 Hello',
              {
                left: 0,
                top: 0,
                fontFamily: 'digital-7',
                fill : '#ff0',
                
              });
            // "add" rectangle onto canvas
            fbCanvas.add(text);
          }).catch(function (e) {
            console.log(e)
            alert('font loading failed ' + font);
          });
      }
  
      loadAndUse('digital-7')
    
}

export default main;