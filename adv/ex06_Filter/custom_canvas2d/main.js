// import { fabric } from "fabric"; //es6 방식
const fabric = window.fabric;
//참고 : http://fabricjs.com/image-filters , http://fabricjs.com/fabric-filters

function main() {

    const fbCanvas = new fabric.Canvas('main-canvas', {
        backgroundColor: '#a278ff',
        enableRetinaScaling: false //레티나 비활성화
    })
    fbCanvas.setHeight(640);
    fbCanvas.setWidth(640);

    var canvas2dBackend = new fabric.Canvas2dFilterBackend()
    //캔버스 필터링 방식으로...강제 지정
    fabric.filterBackend = canvas2dBackend;

    fabric.Image.filters.Redify = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
        type: 'Redify',
        applyTo2d: function (options) {
            var imageData = options.imageData;

            // ctx.getImageData(0, 0, sourceWidth, sourceHeight);
            console.log(options)
            let data = imageData.data;

            for (var i = 0, len = data.length; i < len; i += 4) {
                //kill green
                data[i + 1] = 0;
                //kill blue
                data[i + 2] = 0;
                data[i + 3] = 128; //50%투명
            }
        }
    });
    //클로닝 또는 데이터로딩시에 사용
    fabric.Image.filters.Redify.fromObject = function () {
        return new fabric.Image.filters.Redify();
    };

    fabric.Image.fromURL('../../../res/oota_nao.jpg', ((object) => {

        console.log(object);
        // testObj = object
        object.set("left", 10)
        object.set("top", 20)
        // object.set("selectable",false)
        object.set("scaleX", 0.5)
        object.set("scaleY", 0.5)


        object.filters.push(new fabric.Image.filters.Redify())
        object.applyFilters()
        fbCanvas.add(object)

        imgObj = object

    }));
}

export default main;