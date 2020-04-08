# Getting Started With Crosskit
There Are 2 Ways

## Way 1 - Online 

### CDN
In HTML,Add This To Your HTML File Code
```html
<!-- Unminimifed -->
<script src="https://cdn.jsdelivr.net/gh/Rabios/crosskit@master/build/crosskit.js"></script>

<!-- Minimifed -->
<script src="https://cdn.jsdelivr.net/gh/Rabios/crosskit@master/build/crosskit.min.js"></script>
```

### Initializing Crosskit
Then In HTML File,Create `<script>` Tags To Start Our Work,With Following
```html
<script>
    crosskit.init({
        w: crosskit.compatible_width,
        h: crosskit.compatible_height,
        renderer: CANVAS               //Yes,We Will Use CANVAS Renderer
        //There Is 4 Renderers You Can Use: SVG,CANVAS,WEBGL,DOM
    });
</script>
```


### Drawing A Shape With Crosskit
Then Let's Continue And Draw A Rectangle With `crosskit.rect()`
```js
crosskit.rect({
    x: 200,
    y: 200,
    w: 100,
    h: 100,
    r: 20                 //We Will Make A Rounded Rectangle
    fill: "dodgerblue",   //Shape Fill Color
    stroke: "black"       //Shape Stroke Color
});
```

--------------------------
## Way 2 - Offline

### Download And Installation
Download Crosskit Repository As ZIP And Extract It In Any Place Would You Like

### Setting Up
Create HTML File Named `index.html` Beside `crosskit.js` Or `crosskit.min.js`,Or Create HTML File Everywhere Then Copy `crosskit.js` Or `crosskit.min.js` Beside HTML File,With Content As Mentioned In CDN Way:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Crosskit Example</title>    
    </head>
    <body></body>
    <script src="crosskit.js"></script>
    <script>
        crosskit.init({
            w: crosskit.compatible_width,
            h: crosskit.compatible_height,
            renderer: CANVAS               //Yes,We Will Use CANVAS Renderer
            //There Is 4 Renderers You Can Use: SVG,CANVAS,WEBGL,DOM
        });

        crosskit.rect({
            x: 200,
            y: 200,
            w: 100,
            h: 100,
            r: 20                 //We Will Make A Rounded Rectangle
            fill: "dodgerblue",   //Shape Fill Color
            stroke: "black"       //Shape Stroke Color
        });
    </script>
</html>
```

--------------------------
## Full Code - Offline
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Crosskit Example</title>    
    </head>
    <body></body>
    <script src="crosskit.js"></script>
    <script>
        crosskit.init({
            w: crosskit.compatible_width,
            h: crosskit.compatible_height,
            renderer: CANVAS               //Yes,We Will Use CANVAS Renderer
            //There Is 4 Renderers You Can Use: SVG,CANVAS,WEBGL,DOM
        });

        crosskit.rect({
            x: 200,
            y: 200,
            w: 100,
            h: 100,
            r: 20                 //We Will Make A Rounded Rectangle
            fill: "dodgerblue",   //Shape Fill Color
            stroke: "black"       //Shape Stroke Color
        });
    </script>
</html>
```

## Full Code - CDN
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Crosskit Example</title>    
    </head>
    <body></body>
    <script src="https://cdn.jsdelivr.net/gh/Rabios/crosskit@master/build/crosskit.js"></script>
    <script>
        crosskit.init({
            w: crosskit.compatible_width,
            h: crosskit.compatible_height,
            renderer: CANVAS               //Yes,We Will Use CANVAS Renderer
            //There Is 4 Renderers You Can Use: SVG,CANVAS,WEBGL,DOM
        });

        crosskit.rect({
            x: 200,
            y: 200,
            w: 100,
            h: 100,
            r: 20                 //We Will Make A Rounded Rectangle
            fill: "dodgerblue",   //Shape Fill Color
            stroke: "black"       //Shape Stroke Color
        });
    </script>
</html>
```
## For More 
1. [API Functions Reference](https://github.com/Rabios/crosskit/blob/master/crosskit_api.md)