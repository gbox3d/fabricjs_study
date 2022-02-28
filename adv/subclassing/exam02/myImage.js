// 참고 : http://fabricjs.com/fabric-intro-part-3#subclassing

fabric.MyImage = fabric.util.createClass(
    fabric.Image, // Image 클래스를 상속받음
    {
        type: 'MyImage',
        initialize: function (element, options) {

            options || (options = {});

            this.callSuper('initialize', element, options);

            this.set('webDiskSrc', options.webDiskSrc || {});
            this.set('labelName', options.labelName || '');

            console.log(options)
        },

        // initialize: function (img,options) {
        //     options || (options = {});

        //     this.callSuper('initialize', options);

        //     console.log(options)
        //     // this.set('label', options.label || '');
        // },
        toObject: function () {
            return fabric.util.object.extend(this.callSuper('toObject'), {
                webDiskSrc: this.get('webDiskSrc'),
                labelName: this.get('labelName'),
            });
        },
        _render: function (ctx) {
            console.log('MyImage render code ')

            //부모 함수 콜
            this.callSuper('_render', ctx);

            // this._renderPaintInOrder(ctx);

            ctx.fillStyle = "#FF0000";
            ctx.fillRect(0, 0, 150, 75);

            ctx.fillStyle = "rgb(255,255,255)";
            ctx.font = "30px Arial";
            ctx.fillText(this.get('labelName'), 0, 32);

        }
    }
);

//클로닝 또는 데이터로딩시에 사용
fabric.MyImage.fromObject = async function (_object, callback) {
    var object = fabric.util.object.clone(_object);

    console.log(object)

    const webDiskSrc = object.webDiskSrc;

    let resp = await (fetch(`${webDiskSrc.host_url}/api/v2/webdisk/readFile`, {
        method: 'POST',
        body: `${webDiskSrc.root_path}\n${webDiskSrc.image_file}`,
        headers: {
            'Content-Type': 'text/plain'
        }
    }))

    if (resp.ok) {
        let responseAsBlob = await resp.blob() //바이너리 원본데이터얻기 
        let imgUrl = URL.createObjectURL(responseAsBlob); //url 객체로 변환

        fabric.util.loadImage(imgUrl, function (img, error) {
            if (error) {
                callback && callback(null, error);
                return;
            }
            fabric.Image.prototype._initFilters.call(object, object.filters, function (filters) {
                object.filters = filters || [];
                fabric.Image.prototype._initFilters.call(object, [object.resizeFilter], function (resizeFilters) {
                    object.resizeFilter = resizeFilters[0];
                    fabric.util.enlivenObjects([object.clipPath], function (enlivedProps) {
                        object.clipPath = enlivedProps[0];
                        var image = new fabric.MyImage(img, object);
                        callback(image);
                    });
                });
            });
        }, null, object.crossOrigin);
    }
};

// fabric.MyImage.fromURL = function (url, callback, imgOptions) {
//     fabric.util.loadImage(url, function (img) {
//         callback && callback(new fabric.MyImage(img, imgOptions));
//     }, null, imgOptions && imgOptions.crossOrigin);
// };