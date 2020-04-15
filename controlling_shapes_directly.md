# Modifing Drawn Shapes Directly

## SVG Renderer
SVG Shapes That Are Drawn Located In Array `svg_shapes` With Index Starts From 0,When SVG Shape Is Drawn It Pushes The SVG Shape To The Array `svg_shapes`

```javascript
crosskit.init({
    w: crosskit.compatible_width,
    h: crosskit.compatible_height,
    renderer: SVG
});

//This Rect It's In Index 0 Of svg_shapes Array
crosskit.rect({
    x: 100,
    y: 100,
    w: 50,
    h: 50,
    fill: "blue",
    stroke: "black",
    angle: 0,
    r: 0
});

//Our Rectangle,And We Modified It's Radius
svg_shapes[0].setAttribute("rx",10);
svg_shapes[0].setAttribute("ry",10);
```

## CANVAS Renderer And WEBGL Renderer
Here We Don't Have Arrays For Shapes,Except Images Which Stored In `images` Array

```javascript

var px = 100;

crosskit.init({
    w: crosskit.compatible_width,
    h: crosskit.compatible_height,
    renderer: CANVAS  //Same Result Will Given In WEBGL Renderer
});

function dr()
{
    //Increasing X Of Our Rectangle(Note The Clearing)
    px += 25;    
    crosskit.clear();
    crosskit.rect({
        x: px,
        y: 100,
        w: 50,
        h: 50,
        r: 10,
        fill: "blue",
        stroke: "black"
    });
}

var interv = crosskit.interval(dr,1);
```

## DOM Renderer
DOM Shapes Stored In Array Named `dom_shapes`,Except Some Shapes Stored In `dom_svgs_shapes` Cause Using Embedded SVG,They Are:

- Triangle
- Polygon
- Line

```javascript
crosskit.init({
    w: crosskit.compatible_width,
    h: crosskit.compatible_height,
    renderer: DOM
});

//This Will Push To dom_shapes Array And Store This Shape
crosskit.rect({
    x: 100,
    y: 100,
    w: 100,
    h: 100,
    r: 20,
    fill: "blue",
    stroke: "black"
});

//This Will Push To dom_svgs_shapes Array And Store This Shape
//This Shape Will Drawn Using SVG
crosskit.line({
    pos1: [ 100,200 ],
    pos2: [ 300,400 ],
    stroke: "purple"
});

//These Will Not Do Thing,Cause It Changed After Drawing
//And Crosskit Does Not Apply Changes
//So Use crosskit.interval Or crosskit.animate When Drawing
dom_shapes[0].style.top = 200;            //Setting Y To 200 For Our Rectangle

//Setting pos1 Of The Line To [ 0,0 ]
dom_svgs_shapes[0].setAttribute("x1",0);
dom_svgs_shapes[0].setAttribute("y1",0);
```
