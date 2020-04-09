//Crosskit Rendering Engine
//Rendering Elements
var cakecanvas, cakepen, renderer, canvas, board, svg_board;

//Index Of Views Creation
var index = biggest_x = biggest_y = 0,webgl_texts = 0, 

	//Important Variables For Correction
	u = undefined,
	no_use = "none",
	domvg_polygon_points = "",
	infinite = "indefinite",

	//Getting Body Element
	//And Yes,There Must Be <body> Element To Use Crosskit
	body = document.body;

//If Shapes Are In SVG Or DOM Mode It Cannot Be Drawn Directly
//So It Will Be Stored In Array When Clearing Graphics
//As Shapes Are Objects To Be Drawn
var dom_shapes = svg_shapes = [];

//Lines And Polygons And Triangles Cannot Be Drawn In DOM Mode Using CSS Styles
//So We Will Use Some SVG Inside DOM With Storing These SVGs 
var dom_svgs = dom_svgs_shapes = svg_anims = [];

//Texts In WebGL Stored Into Arrays With Their Canvas
var text_svg,texts = [];

//Modes Of Rendering
var WEBGL = "WEBGL",
	  CANVAS = "CANVAS",
	  SVG = "SVG",
	  DOM = "DOM"; //Simple


window.update = () =>
{
	return window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           window.msRequestAnimationFrame     ||
		      window.oRequestAnimationFrame      ||
		      function( callback,fps ) 
		      {
			        window.setTimeout(callback, 1000 / fps);
		      }
};

var crosskit = {
	compatible_width: window.innerWidth - 25,
	compatible_height: window.innerHeight - 25,
	version: "0.6.0",
	init: (v) =>
	{
		renderer = (v.renderer).toString();
		if (renderer == CANVAS)
		{
			canvas = document.createElement("canvas");
			canvas.width = v.w;
      canvas.height = v.h;
      canvas.style.position = "relative";
      canvas.style.left = "8px";
			body.parentNode.appendChild(canvas);
			cakecanvas = document.getElementsByTagName("canvas")[index];
			cakepen = cakecanvas.getContext("2d");
		}

		if (renderer == SVG)
		{
			cakecanvas = document.createElementNS("http://www.w3.org/2000/svg","svg");
			cakecanvas.setAttribute("width", v.w);
      cakecanvas.setAttribute("height", v.h);
			body.appendChild(cakecanvas);
		}

		if (renderer == WEBGL)
		{
			canvas = document.createElement("canvas");
			canvas.width = v.w;
      canvas.height = v.h;
      canvas.style.position = "relative";
      canvas.style.left = "8px";
			body.parentNode.appendChild(canvas);
      cakecanvas = canvas;
			WebGL2D.enable(cakecanvas);
      cakepen = cakecanvas.getContext("webgl-2d");
    }

		if (renderer == DOM)
		{
			board = document.createElement("div");
			board.id = "board";
			board.style.width = v.w;
      board.style.height = v.h;
      board.style.position = "relative";
      board.style.bottom = "10px";
			body.appendChild(board);
      cakecanvas = board;
      svg_board = document.createElementNS("http://www.w3.org/2000/svg","svg");
			svg_board.setAttribute("width", v.w);
      svg_board.setAttribute("height", v.h);
      svg_board.style.zIndex = 1;
			board.appendChild(svg_board);
		}
		index++; //Increase Index Of Elements Creation
		console.info("%cCROSSKIT " + crosskit.version + "\nRendering Mode: " + renderer,"font-size: 32px; background-color: purple; color: white; font-family: monospace;");
	},

	line: (v) =>
	{
		if (renderer == CANVAS || renderer == WEBGL)
		{
			cakepen.globalAlpha = v.a;
			cakepen.strokeStyle = v.stroke;
			cakepen.lineWidth = v.line_width;
			cakepen.beginPath();
			cakepen.moveTo(v.pos1[0], v.pos1[1]);
			cakepen.lineTo(v.pos2[0], v.pos2[1]);
			cakepen.lineTo(v.pos1[0], v.pos1[1]);
			cakepen.closePath();
			cakepen.stroke();
			cakepen.globalAlpha = 1;
		}
		if(renderer == DOM)
		{
			if(v.pos1[0] > biggest_x) biggest_x = v.pos1[0];
			if(v.pos1[1] > biggest_y) biggest_y = v.pos1[1];
			if(v.pos2[0] > biggest_x) biggest_x = v.pos2[0];
      if(v.pos2[1] > biggest_y) biggest_y = v.pos2[1];
			dom_svgs_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "line"));
			dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("x1", (v.pos1[0]).toString());
			dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("y1", (v.pos1[1]).toString());
			dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("x2", (v.pos2[0]).toString());
			dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("y2", (v.pos2[1]).toString());
      dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("stroke", v.stroke);
	  dom_svgs_shapes[dom_svgs_shapes.length - 1].style.strokeWidth = v.line_width;
	  dom_svgs_shapes[dom_svgs_shapes.length - 1].style.opacity = v.a;
      svg_board.appendChild(dom_svgs_shapes[dom_svgs_shapes.length - 1]);
		}
		//And Sorry,Drawing Lines And Anything Related-To
		//Including Triangles And Polygons Are Not Supported In DOM
		if (renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "line"));
			svg_shapes[svg_shapes.length - 1].setAttribute("x1", (v.pos1[0]).toString());
			svg_shapes[svg_shapes.length - 1].setAttribute("y1", (v.pos1[1]).toString());
			svg_shapes[svg_shapes.length - 1].setAttribute("x2", (v.pos2[0]).toString());
			svg_shapes[svg_shapes.length - 1].setAttribute("y2", (v.pos2[1]).toString());
      svg_shapes[svg_shapes.length - 1].setAttribute("stroke", v.stroke);
	  svg_shapes[svg_shapes.length - 1].style.strokeWidth = v.line_width;
	  svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
		}
	},

	//And When Drawing Shapes In SVG Or DOM We Get The Last Array Element Which Is The Shape We Pushed To Draw

	rect: (v) =>
	{
		if (renderer == CANVAS || renderer == WEBGL)
		{
			cakepen.globalAlpha = v.a;
      if(v.r == undefined || v.r == null || v.r == 0)
      {
        cakepen.fillStyle = v.fill;
        cakepen.strokeStyle = v.stroke;
        cakepen.fillRect(v.x, v.y, v.w, v.h);
        cakepen.strokeRect(v.x, v.y, v.w, v.h);
      }
      if(v.r > 0)
      {
        cakepen.fillStyle = v.fill;
        cakepen.strokeStyle = v.stroke;
        cakepen.beginPath();
        cakepen.moveTo(v.x + v.r,v.y);
        cakepen.lineTo(v.x + v.w - v.r,v.y);
        cakepen.quadraticCurveTo(v.x + v.w,v.y,v.x + v.w,v.y + v.r);
		    cakepen.lineTo(v.x + v.w,v.y + v.h - v.r);
        cakepen.quadraticCurveTo(v.x + v.w,v.y + v.h,v.x + v.w - v.r,v.y + v.h);
        cakepen.lineTo(v.x + v.r,v.y + v.h);
        cakepen.quadraticCurveTo(v.x,v.y + v.h,v.x,v.y + v.h - v.r);
        cakepen.lineTo(v.x,v.y + v.r);
        cakepen.quadraticCurveTo(v.x,v.y,v.x + v.r,v.y);
        cakepen.closePath();
        cakepen.fill();
			  cakepen.stroke();
      }
	  cakepen.globalAlpha = 1;
		}

		if (renderer == DOM)
		{
			dom_shapes.push(document.createElement("div"));
			dom_shapes[dom_shapes.length - 1].style.backgroundColor = v.fill;
			dom_shapes[dom_shapes.length - 1].style.border = "2px " + v.stroke + " solid";
			dom_shapes[dom_shapes.length - 1].style.position = "absolute";
			dom_shapes[dom_shapes.length - 1].style.width = v.w + "px";
			dom_shapes[dom_shapes.length - 1].style.height = v.h + "px";
			dom_shapes[dom_shapes.length - 1].style.top = v.y + "px";
			dom_shapes[dom_shapes.length - 1].style.left = v.x + "px";
			dom_shapes[dom_shapes.length - 1].style.borderRadius = v.r + "px";
			cakecanvas.appendChild(dom_shapes[dom_shapes.length - 1]);
		}

		if (renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
			svg_shapes[svg_shapes.length - 1].setAttribute("x", v.x);
			svg_shapes[svg_shapes.length - 1].setAttribute("y", v.y);
			svg_shapes[svg_shapes.length - 1].setAttribute("width", v.w);
            svg_shapes[svg_shapes.length - 1].setAttribute("height", v.h);
            svg_shapes[svg_shapes.length - 1].setAttribute("rx", v.r);
			svg_shapes[svg_shapes.length - 1].setAttribute("ry", v.r);
			svg_shapes[svg_shapes.length - 1].setAttribute("fill", v.fill);
			svg_shapes[svg_shapes.length - 1].setAttribute("stroke", v.stroke);
			svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
		}
	},

	square: (v) =>
	{
		if (renderer == CANVAS || renderer == WEBGL)
		{
			cakepen.globalAlpha = v.a;
			cakepen.fillStyle = v.fill;
			cakepen.strokeStyle = v.stroke;
			cakepen.fillRect(v.x, v.y, v.size, v.size);
			cakepen.strokeRect(v.x, v.y, v.size, v.size);
			cakepen.globalAlpha = 1;
		}

		if (renderer == DOM)
		{
			dom_shapes.push(document.createElement("div"));
			dom_shapes[dom_shapes.length - 1].style.backgroundColor = v.fill;
			dom_shapes[dom_shapes.length - 1].style.border = "2px " + v.stroke + " solid";
			dom_shapes[dom_shapes.length - 1].style.position = "absolute";
			dom_shapes[dom_shapes.length - 1].style.width = v.size / 2 + "px";
			dom_shapes[dom_shapes.length - 1].style.height = v.size / 2 + "px";
			dom_shapes[dom_shapes.length - 1].style.top = v.y - v.size * 2 + "px";
			dom_shapes[dom_shapes.length - 1].style.left = v.x - v.size * 2 + "px";
			cakecanvas.appendChild(dom_shapes[dom_shapes.length - 1]);
		}

		if (renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
			svg_shapes[svg_shapes.length - 1].setAttribute("x", v.x);
			svg_shapes[svg_shapes.length - 1].setAttribute("y", v.y);
			svg_shapes[svg_shapes.length - 1].setAttribute("width", v.size);
      svg_shapes[svg_shapes.length - 1].setAttribute("height", v.size);
			svg_shapes[svg_shapes.length - 1].setAttribute("fill", v.fill);
			svg_shapes[svg_shapes.length - 1].setAttribute("stroke", v.stroke);
			svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
		}
	},

	pixel: (v) =>
	{
		if (renderer == CANVAS || renderer == WEBGL)
		{
			cakepen.globalAlpha = v.a;
			cakepen.fillStyle = v.color;
			cakepen.fillRect(v.x, v.y, 1, 1);
			cakepen.globalAlpha = 1;
		}

		if (renderer == DOM)
		{
			dom_shapes.push(document.createElement("div"));
			dom_shapes[dom_shapes.length - 1].style.backgroundColor = v.color;
			dom_shapes[dom_shapes.length - 1].style.position = "absolute";
			dom_shapes[dom_shapes.length - 1].style.width = "1px";
			dom_shapes[dom_shapes.length - 1].style.height = "1px";
			dom_shapes[dom_shapes.length - 1].style.top = v.y + "1px";
			dom_shapes[dom_shapes.length - 1].style.left = v.x + "1px";
			dom_shapes[dom_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(dom_shapes[dom_shapes.length - 1]);
		}

		if (renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
			svg_shapes[svg_shapes.length - 1].setAttribute("x", v.x);
			svg_shapes[svg_shapes.length - 1].setAttribute("y", v.y);
			svg_shapes[svg_shapes.length - 1].setAttribute("width", 1);
            svg_shapes[svg_shapes.length - 1].setAttribute("height", 1);
			svg_shapes[svg_shapes.length - 1].setAttribute("color", v.color);
			svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
		}
	},

	roundedrect: (v) =>
	{
		if (renderer == CANVAS)
		{
			cakepen.globalAlpha = v.a;
			cakepen.fillStyle = v.fill;
			cakepen.strokeStyle = v.stroke;
			cakepen.beginPath();
			cakepen.moveTo(v.x + v.r,v.y);
			cakepen.lineTo(v.x + v.w - v.r,v.y);
			cakepen.quadraticCurveTo(v.x + v.w,v.y,v.x + v.w,v.y + v.r);
			cakepen.lineTo(v.x + v.w,v.y + v.h - v.r);
      cakepen.quadraticCurveTo(v.x + v.w,v.y + v.h,v.x + v.w - v.r,v.y + v.h);
      cakepen.lineTo(v.x + v.r,v.y + v.h);
      cakepen.quadraticCurveTo(v.x,v.y + v.h,v.x,v.y + v.h - v.r);
      cakepen.lineTo(v.x,v.y + v.r);
      cakepen.quadraticCurveTo(v.x,v.y,v.x + v.r,v.y);
      cakepen.closePath();
      cakepen.fill();
			cakepen.stroke();
			cakepen.globalAlpha = 1;
		}

		if (renderer == DOM)
		{
			dom_shapes.push(document.createElement("div"));
			dom_shapes[dom_shapes.length - 1].style.backgroundColor = v.fill;
			dom_shapes[dom_shapes.length - 1].style.border = "2px " + v.stroke + " solid";
			dom_shapes[dom_shapes.length - 1].style.position = "absolute";
			dom_shapes[dom_shapes.length - 1].style.width = v.w / 2 + "px";
			dom_shapes[dom_shapes.length - 1].style.height = v.h / 2+ "px";
			dom_shapes[dom_shapes.length - 1].style.borderRadius = v.r + "px";
			dom_shapes[dom_shapes.length - 1].style.top = v.y - v.h * 2 + "px";
			dom_shapes[dom_shapes.length - 1].style.left = v.x - v.w * 2 + "px";
			dom_shapes[dom_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(dom_shapes[dom_shapes.length - 1]);
		}

		if (renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "rect"));
			svg_shapes[svg_shapes.length - 1].setAttribute("x", v.x);
			svg_shapes[svg_shapes.length - 1].setAttribute("y", v.y);
			svg_shapes[svg_shapes.length - 1].setAttribute("width", v.w);
			svg_shapes[svg_shapes.length - 1].setAttribute("height", v.h);
			svg_shapes[svg_shapes.length - 1].setAttribute("rx", v.r);
			svg_shapes[svg_shapes.length - 1].setAttribute("ry", v.r);
			svg_shapes[svg_shapes.length - 1].setAttribute("fill", v.fill);
			svg_shapes[svg_shapes.length - 1].setAttribute("stroke", v.stroke);
			svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
    }
    
    if(renderer == WEBGL)
    {
		cakepen.globalAlpha = v.a;
      cakepen.fillStyle = v.fill;
	  cakepen.strokeStyle = v.stroke;
      var i, angle, x1, y1;
	  for(i = 0; i < 360; i += 0.1)
	  {
        angle = i;
        x1 = v.r * Math.cos(angle * Math.PI / 180);
        y1 = v.r * Math.sin(angle * Math.PI / 180);
        cakepen.fillRect(v.x + x1 + v.r, v.y + y1 + v.r,v.r * 1.5,v.r * 1.5);
        cakepen.strokeRect(v.x + x1 + v.r, v.y + y1 + v.r,v.r * 1.5,v.r * 1.5);
	  }
	  cakepen.globalAlpha = 1;
	}
},

	circle: (v) =>
	{
		if (renderer == CANVAS)
		{
			cakepen.globalAlpha = v.a;
			cakepen.fillStyle = v.fill;
			cakepen.strokeStyle = v.stroke;
			cakepen.beginPath();
			cakepen.arc(v.x, v.y, v.r, 90, 180 * Math.PI);
			cakepen.closePath();
			cakepen.fill();
			cakepen.stroke();
			cakepen.globalAlpha = 1;
		}

		if (renderer == DOM)
		{
			dom_shapes.push(document.createElement("div"));
			dom_shapes[dom_shapes.length - 1].style.backgroundColor = v.fill;
			dom_shapes[dom_shapes.length - 1].style.border = "2px " + v.stroke + " solid";
			dom_shapes[dom_shapes.length - 1].style.position = "absolute";
			dom_shapes[dom_shapes.length - 1].style.width = v.r * 1.85 + "px";
      dom_shapes[dom_shapes.length - 1].style.height = v.r * 1.85 + "px";
			dom_shapes[dom_shapes.length - 1].style.borderRadius = "50%";
			dom_shapes[dom_shapes.length - 1].style.top = v.y - v.r + "px";
			dom_shapes[dom_shapes.length - 1].style.left = v.x - v.r + "px";
			dom_shapes[dom_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(dom_shapes[dom_shapes.length - 1]);
		}

		if (renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "circle"));
			svg_shapes[svg_shapes.length - 1].setAttribute("cx", v.x);
			svg_shapes[svg_shapes.length - 1].setAttribute("cy", v.y);
			svg_shapes[svg_shapes.length - 1].setAttribute("r", v.r);
			svg_shapes[svg_shapes.length - 1].setAttribute("fill", v.fill);
			svg_shapes[svg_shapes.length - 1].setAttribute("stroke", v.stroke);
			svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
    }
    
    if (renderer == WEBGL)
	{
		cakepen.globalAlpha = v.a;
		cakepen.fillStyle = v.fill;
		cakepen.strokeStyle = v.stroke;
		var i, angle, x1, y1;
		for(i = 0; i < 360; i += 0.1)
		{
			angle = i;
			x1 = v.r * Math.cos(angle * Math.PI / 180);
			y1 = v.r * Math.sin(angle * Math.PI / 180);
			cakepen.fillRect(v.x + x1, v.y + y1,1,1);
			cakepen.strokeRect(v.x + x1, v.y + y1,1,1);
		}
		cakepen.globalAlpha = 1;
    }
},

	img: (v) =>
	{
		if (renderer == CANVAS || renderer == WEBGL)
		{
			cakepen.globalAlpha = v.a;
			cakepen.drawImage(v.img, v.x, v.y, v.w, v.h);
			cakepen.globalAlpha = 1;
		}
		if (renderer == DOM)
		{
			dom_shapes.push(new Image());
			dom_shapes[dom_shapes.length - 1].src = v.img;
			dom_shapes[dom_shapes.length - 1].style.position = "absolute";
			dom_shapes[dom_shapes.length - 1].style.width = v.w + "px";
			dom_shapes[dom_shapes.length - 1].style.height = v.h + "px";
			dom_shapes[dom_shapes.length - 1].style.borderRadius = v.r + "px";
			dom_shapes[dom_shapes.length - 1].style.top = v.y - v.h + "px";
			dom_shapes[dom_shapes.length - 1].style.left = v.x - v.w + "px";
			dom_shapes[dom_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(dom_shapes[dom_shapes.length - 1]);
		}
		if (renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "image"));
			svg_shapes[svg_shapes.length - 1].setAttribute("href", v.img);
			svg_shapes[svg_shapes.length - 1].setAttribute("x", v.x);
			svg_shapes[svg_shapes.length - 1].setAttribute("y", v.y);
			svg_shapes[svg_shapes.length - 1].setAttribute("rx", v.r);
			svg_shapes[svg_shapes.length - 1].setAttribute("ry", v.r);
			svg_shapes[svg_shapes.length - 1].setAttribute("width", v.w);
			svg_shapes[svg_shapes.length - 1].setAttribute("height", v.h);
			svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
		}
  },
    
    //NOTES: If Parameter To Use With DOM Or SVG,Set It To 0 Or "none" In Case Of That
    //NOTES: v.size Parameter Only For SVG And DOM,Font Size Setted In CANVAS Mode With font
	text: (v) =>
	{
		if (renderer == CANVAS || renderer == WEBGL)
		{
			cakepen.globalAlpha = v.a;
			cakepen.font = v.size + "px " + v.font;
			cakepen.fillStyle = v.fill;
			cakepen.strokeStyle = v.stroke;
			cakepen.fillText(v.txt,v.x,v.y);
			cakepen.strokeText(v.txt,v.x,v.y);
			cakepen.globalAlpha = 1;
		}

		if (renderer == DOM)
		{
			dom_shapes.push(document.createElement("strong"));
			dom_shapes[dom_shapes.length - 1].innerHTML = v.txt;
			dom_shapes[dom_shapes.length - 1].style.fontFamily = v.font;
			dom_shapes[dom_shapes.length - 1].style.fontSize = v.size + "px";
			dom_shapes[dom_shapes.length - 1].style.position = "absolute";
			dom_shapes[dom_shapes.length - 1].style.color = v.fill;
			dom_shapes[dom_shapes.length - 1].style.top = v.y - v.size / 2 + "px";
			dom_shapes[dom_shapes.length - 1].style.left = v.x - v.size / 2 + "px";
			dom_shapes[dom_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(dom_shapes[dom_shapes.length - 1]);
		}

		if (renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "text"));
			svg_shapes[svg_shapes.length - 1].setAttribute("x", v.x);
			svg_shapes[svg_shapes.length - 1].setAttribute("y", v.y);
			svg_shapes[svg_shapes.length - 1].innerHTML = v.txt;
            svg_shapes[svg_shapes.length - 1].setAttribute("fill", v.fill);
            svg_shapes[svg_shapes.length - 1].setAttribute("stroke", v.stroke);
			svg_shapes[svg_shapes.length - 1].style.fontFamily = v.font;
			svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			svg_shapes[svg_shapes.length - 1].style.fontSize = v.size + "px";
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
		}
	},
	triangle: (v) =>
	{
		if(renderer == CANVAS || renderer == WEBGL)
		{
			cakepen.globalAlpha = v.a;
      cakepen.strokeStyle = v.stroke;
      cakepen.fillStyle = v.fill;
			cakepen.lineWidth = v.line_width;
			cakepen.beginPath();
			cakepen.moveTo(v.pos1[0], v.pos1[1]);
			cakepen.lineTo(v.pos2[0], v.pos2[1]);
			cakepen.lineTo(v.pos3[0], v.pos3[1]);
			cakepen.lineTo(v.pos1[0], v.pos1[1]);
      cakepen.closePath();
      cakepen.fill();
			cakepen.stroke();
			cakepen.globalAlpha = 1;
		}
		if(renderer == DOM)
		{
			if(v.pos1[0] > biggest_x) biggest_x = v.pos1[0];
			if(v.pos1[1] > biggest_y) biggest_y = v.pos1[1];
			if(v.pos2[0] > biggest_x) biggest_x = v.pos2[0];
			if(v.pos2[1] > biggest_y) biggest_y = v.pos2[1];
			if(v.pos3[0] > biggest_x) biggest_x = v.pos3[0];
			if(v.pos3[1] > biggest_y) biggest_y = v.pos3[1];
			dom_svgs_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
			dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("points",(v.pos1[0] + "," + v.pos1[1] + " " + v.pos2[0] + "," + v.pos2[1] + " " + v.pos3[0] + "," + v.pos3[1] + " " + v.pos1[0] + "," + v.pos1[1]).toString());
			dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("fill", v.fill);
      dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("stroke", v.stroke);
	  dom_svgs_shapes[dom_svgs_shapes.length - 1].style.strokeWidth = v.line_width;
	  dom_svgs_shapes[dom_svgs_shapes.length - 1].style.opacity = v.a;
	  
			svg_board.appendChild(dom_svgs_shapes[dom_svgs_shapes.length - 1]);
		}
		if(renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
			svg_shapes[svg_shapes.length - 1].setAttribute("points",(v.pos1[0] + "," + v.pos1[1] + " " + v.pos2[0] + "," + v.pos2[1] + " " + v.pos3[0] + "," + v.pos3[1] + " " + v.pos1[0] + "," + v.pos1[1]).toString());
			svg_shapes[svg_shapes.length - 1].setAttribute("fill", v.fill);
      svg_shapes[svg_shapes.length - 1].setAttribute("stroke", v.stroke);
	  svg_shapes[svg_shapes.length - 1].style.strokeWidth = v.line_width;
	  svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
		}
	},
	polygon: (v) =>
	{
		if(renderer == CANVAS || renderer == WEBGL)
		{
			cakepen.globalAlpha = v.a;
			cakepen.fillStyle = v.fill;
			cakepen.strokeStyle = v.stroke;
			cakepen.beginPath();
			cakepen.moveTo(v.points[0][0], v.points[0][1]);
			for (var i = 0; i < v.points.length; i++) cakepen.lineTo(v.points[i][0], v.points[i][1]);
			cakepen.closePath();
			cakepen.fill();
			cakepen.stroke();
			cakepen.globalAlpha = 1;
		}
		if(renderer == DOM)
		{
			domvg_polygon_points = "";
			domvg_polygon_points += v.points[0][0] + "," + v.points[0][1] + " ";
			for (var i = 0; i < v.points.length; i++)
			{
				if(v.points[i][0] > biggest_x) biggest_x = v.points[i][0];
				if(v.points[i][1] > biggest_y) biggest_y = v.points[i][1];
				domvg_polygon_points += v.points[i][0] + "," + v.points[i][1] + " ";
			}
			dom_svgs_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
			dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("points",(domvg_polygon_points).toString());
			dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("fill", v.fill);
			dom_svgs_shapes[dom_svgs_shapes.length - 1].setAttribute("stroke", v.stroke);
			dom_svgs_shapes[dom_svgs_shapes.length - 1].style.opacity = v.a;
			svg_board.appendChild(dom_svgs_shapes[dom_svgs_shapes.length - 1]);
		}
		if(renderer == SVG)
		{
			svg_shapes.push(document.createElementNS("http://www.w3.org/2000/svg", "polygon"));
			domvg_polygon_points = "";
			domvg_polygon_points += v.points[0][0] + "," + v.points[0][1] + " ";
			for (var i = 0; i < v.points.length; i++) domvg_polygon_points += v.points[i][0] + "," + v.points[i][1] + " ";
			svg_shapes[svg_shapes.length - 1].setAttribute("points",(domvg_polygon_points).toString());
			svg_shapes[svg_shapes.length - 1].setAttribute("fill", v.fill);
			svg_shapes[svg_shapes.length - 1].setAttribute("stroke", v.stroke);
			svg_shapes[svg_shapes.length - 1].style.opacity = v.a;
			cakecanvas.appendChild(svg_shapes[svg_shapes.length - 1]);
		}
	},
	clear: () =>
	{
  if (renderer == CANVAS || renderer == WEBGL)
  {
    cakepen.fillStyle = "transparent";
    cakepen.fillRect(0,0,cakepen.canvas.width,cakepen.canvas.height);
    cakepen.clearRect(0, 0, cakepen.canvas.width, cakepen.canvas.height);
  }
    //The Technology Used Here Is Somehow Weird
    //It Removes Every Shape Drawn From document
    //Then Remove All Elements From Array Using [].slice(0,array_length) 
    if (renderer == DOM)
    {
      for (doms = 0; doms < dom_shapes.length; doms++)
      {
        dom_shapes.slice(0, dom_shapes.length);
        cakecanvas.removeChild(dom_shapes[doms]);
	  }
	  for(svid = 0;svid < dom_svgs_shapes.length; svid++)
	  {
      dom_svgs_shapes.slice(0,dom_svgs_shapes.length);
      svg_board.removeChild(dom_svgs_shapes[svid]);
	  }
	}
	
	if (renderer == SVG)
	{
		for (svgos = 0; svgos < dom_shapes.length; svgos++)
		{
			svg_shapes.slice(0, svg_shapes.length);
			cakecanvas.removeChild(svg_shapes[svgos]);
		}
	}
},
	animate: (v) =>
	{
		if(renderer == CANVAS || renderer == WEBGL || renderer == DOM) window.requestAnimationFrame(v.frame);
		if(renderer == SVG)
		{
			svg_anims.push(document.createElementNS("http://www.w3.org/2000/svg", "animate"));
            svg_anims[svg_anims.length - 1].setAttribute("attributeType", "XML");
            svg_anims[svg_anims.length - 1].setAttribute("attributeName",v.attr);
            svg_anims[svg_anims.length - 1].setAttribute("dur", v.dur + "s");
            svg_anims[svg_anims.length - 1].setAttribute("to", v.to);
			svg_anims[svg_anims.length - 1].setAttribute("from", v.from);
			svg_anims[svg_anims.length - 1].setAttribute("repeatCount", v.loop_num);
            svg_anims[svg_anims.length - 1].setAttribute("repeatDur", v.loop_dur);
            svg_anims[svg_anims.length - 1].anim_id = "animation-" + svg_anims[svg_anims.length - 1];
            svg_anims[svg_anims.length - 1].setAttribute("id", svg_anims[svg_anims.length - 1].anim_id);
            var svg_obj = svg_shapes[v.index];
            var prev_anim = document.getElementById(svg_anims[svg_anims.length - 1].anim_id);
            if (prev_anim != null) svg_obj.removeChild(prev_anim);
			svg_obj.appendChild(svg_anims[svg_anims.length - 1]);
		}
	},
	update: (f,t) =>
	{
		return window.update(f,t);
	},
	pause: (v) =>
	{
		if(v.interval == undefined && (renderer == DOM || renderer == CANVAS  || renderer == WEBGL )) window.cancelAnimationFrame(v.frame);
		if(!(v.interval == undefined) && (renderer == DOM || renderer == CANVAS  || renderer == WEBGL )) window.clearInterval(v.interval);
	}  
};
window.addEventListener("keypress",(e) => {
	if(e.key == "f" && !window.fullscreen) document.documentElement.requestFullscreen();
	if(e.key == "f" && window.fullscreen) document.documentElement.exitFullscreen();
});