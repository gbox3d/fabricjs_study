// import fabric from "../node_modules/fabric/dist/fabric.min.js";

//계층적 변환 관련 함수
function updateRelation(evt) {
    let obj = evt.transform.target
    if (obj.parent) {
        obj.relationMatrix = fabric.util.multiplyTransformMatrices(
            fabric.util.invertTransform(obj.parent.calcTransformMatrix()),
            obj.calcTransformMatrix()
        );
    }
}

function updateRootTransform(evt) {
    let target = evt.transform.target
    target.children.forEach(o => {
        if (o.relationMatrix) {
            let newTransform = fabric.util.multiplyTransformMatrices(
                o.parent.calcTransformMatrix(),
                o.relationMatrix
            );
            fabric.util.applyTransformToObject(o, newTransform)
            o.setCoords();
        }
    });
}

//폴리건 에디팅 관련 메소드
// define a function that can locate the controls.
// this function will be used both for drawing and for interaction.
function polygonPositionHandler(dim, finalMatrix, fabricObject) {
    var x = (fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x),
        y = (fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y);
    return fabric.util.transformPoint(
        { x: x, y: y },
        fabric.util.multiplyTransformMatrices(
            fabricObject.canvas.viewportTransform,
            fabricObject.calcTransformMatrix()
        )
    );
}

// define a function that will define what the control does
// this function will be called on every mouse move after a control has been
// clicked and is being dragged.
// The function receive as argument the mouse event, the current trasnform object
// and the current position in canvas coordinate
// transform.target is a reference to the current object being transformed,
function actionHandler(eventData, transform, x, y) {
    var polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(new fabric.Point(x, y), 'center', 'center'),
        polygonBaseSize = polygon._getNonTransformedDimensions(),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
            x: mouseLocalPosition.x * polygonBaseSize.x / size.x + polygon.pathOffset.x,
            y: mouseLocalPosition.y * polygonBaseSize.y / size.y + polygon.pathOffset.y
        };
    polygon.points[currentControl.pointIndex] = finalPointPosition;
    return true;
}

// define a function that can keep the polygon in the same position when we change its
// width/height/top/left.
function anchorWrapper(anchorIndex, fn) {
    return function (eventData, transform, x, y) {
        var fabricObject = transform.target,
            absolutePoint = fabric.util.transformPoint({
                x: (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x),
                y: (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y),
            }, fabricObject.calcTransformMatrix()),
            actionPerformed = fn(eventData, transform, x, y),
            // eslint-disable-next-line
            newDim = fabricObject._setPositionDimensions({}),
            polygonBaseSize = fabricObject._getNonTransformedDimensions(),
            newX = (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) / polygonBaseSize.x,
            newY = (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) / polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        updateRelation({ transform: { target: fabricObject } })
        // fabricObject.setCoords()

        return actionPerformed;
    }
}


function setupEdit(object) {
    // clone what are you copying since you
    // may want copy and paste on different moment.
    // and you do not want the changes happened
    // later to reflect on the copy.
    var poly = object
    //fbCanvas.setActiveObject(poly);

    var lastControl = poly.points.length - 1;
    poly.cornerStyle = 'circle';
    poly.cornerColor = 'rgba(0,0,255)';
    poly.controls = poly.points.reduce(function (acc, point, index) {
        acc['p' + index] = new fabric.Control({
            positionHandler: polygonPositionHandler,
            actionHandler: anchorWrapper(index > 0 ? index - 1 : lastControl, actionHandler),
            actionName: 'modifyPolygon',
            pointIndex: index
        });
        return acc;
    }, {});

    poly.hasBorders = false;
}

function clearEdit(object) {
    object.cornerColor = 'blue';
    object.cornerStyle = 'rect';
    object.controls = fabric.Object.prototype.controls;
}

function makeAbsoluteBBox(obj) {
    let _xs = []
    let _ys = []

    obj.points.forEach(o => {
        let absolutePoint = fabric.util.transformPoint({
            x: (o.x - obj.pathOffset.x),
            y: (o.y - obj.pathOffset.y),
        }, obj.calcTransformMatrix());
        _xs.push(absolutePoint.x)
        _ys.push(absolutePoint.y)
    })

    return {
        xmin: Math.min(..._xs),
        xmax: Math.max(..._xs),
        ymin: Math.min(..._ys),
        ymax: Math.max(..._ys)
    }
}

function makeAbsolutePoints(obj) {
    return obj.points.reduce((acc, o) => {
        let absolutePoint = fabric.util.transformPoint({
            x: (o.x - obj.pathOffset.x),
            y: (o.y - obj.pathOffset.y),
        }, obj.calcTransformMatrix());

        acc.push(absolutePoint)
        return acc
    }, [])

}

/**
 * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in a given polygon.
 * This runs in O(n) where n is the number of edges of the polygon.
 *
 * @param {Array} polygon an array representation of the polygon where polygon[i][0] is the x Value of the i-th point and polygon[i][1] is the y Value.
 * @param {Array} point   an array representation of the point where point[0] is its x Value and point[1] is its y Value
 * @return {boolean} whether the point is in the polygon (not on the edge, just turn < into <= and > into >= for that)
 */
const _pointInPolygon = function (polygon, point) {
    //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
    let odd = false;
    //For each edge (In this case for each point of the polygon and the previous one)
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        //If a line from the point into infinity crosses this edge
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) // One point needs to be above, one below our y coordinate
            // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
            && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
            // Invert odd
            odd = !odd;
        }
        j = i;

    }
    //If the number of crossings was odd, the point is in the polygon
    return odd;
};

function pointInPolygon(poly, pt) {
    let polygon = poly.reduce((acc, o) => {
        acc.push([o.x, o.y])
        return acc
    }, [])
    let point = [pt.x, pt.y]
    // console.log(polygon, point)
    return _pointInPolygon(polygon,point)

}

export { setupEdit, clearEdit, updateRootTransform, updateRelation, makeAbsoluteBBox, makeAbsolutePoints, pointInPolygon }