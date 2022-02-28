const LabeledRect = fabric.util.createClass(fabric.Rect, {

    type: 'LabeledRect',
    // initialize can be of type function(options) or function(property, options), like for text.
    // no other signatures allowed.
    initialize: function (options) {
        options || (options = {});

        this.callSuper('initialize', options);
        this.set('label', options.label || '');
    },

    toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            label: this.get('label') //추가적인 속성 선언 
        });
    },

    

    _render: function (ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '20px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width / 2, -this.height / 2 + 20);
    }
});

//씬로딩 시에 필요함 
LabeledRect.fromObject = function(object, callback) {
    console.log('LabeledRect fromObject');

    var klass = fabric[className];
    object = clone(object, true);
    fabric.util.enlivenPatterns([object.fill, object.stroke], function(patterns) {
      if (typeof patterns[0] !== 'undefined') {
        object.fill = patterns[0];
      }
      if (typeof patterns[1] !== 'undefined') {
        object.stroke = patterns[1];
      }
      fabric.util.enlivenObjectEnlivables(object, object, function () {
        var instance = extraParam ? new klass(object[extraParam], object) : new klass(object);
        callback && callback(instance);
      });
    });
    
    
    return fabric.Object._fromObject('LabeledRect', object, callback);
};

fabric.LabeledRect = LabeledRect; //fabric에 새로운 클래스를 추가한다.
console.log(`LabelRect plugin added`)
