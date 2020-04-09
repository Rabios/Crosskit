# Crosskit API Reference
```javascript
//Variables
crosskit.version                 //Returns Crosskit Version
crosskit.compatible_width        //Returns Compatible Width
crosskit.compatible_height       //Returns Compatible Height

//Renderers
WEBGL                            //Returns And Uses WebGL Renderer
CANVAS                           //Returns And Uses Canvas Renderer
SVG                              //Returns And Uses SVG Renderer
DOM                              //Returns And Uses DOM Renderer

//Functions
crosskit.clear()                 //Clears Canvas/View
crosskit.init(options)           //Initializes Crosskit Renderer And Creates A View/Canvas(Important To Use Before Anything)
/*
options.w                        //Width
options.h                        //Height
options.renderer                 //See Renderers Above
*/

crosskit.rect(options)
/*
options.x                        //X Position
options.y                        //Y Position
options.w                        //Width
options.h                        //Height
options.a                        //Drawing Alpha
options.r                        //Radius(Not Optional)
options.fill                     //Fill Color
options.stroke                   //Stroke Color
*/

crosskit.circle(options)
/*
options.x                        //X Position
options.y                        //Y Position
options.r                        //Radius
options.a                        //Drawing Alpha
options.fill                     //Fill Color
options.stroke                   //Stroke Color
*/

crosskit.line(options)
/*
options.pos1                     //From Position,An Array Contains 2 Numbers Are X And Y
options.pos2                     //To Position,An Array Contains 2 Numbers Are X And Y
options.line_width               //Stroke Width(Optional)
options.a                        //Drawing Alpha
options.stroke                   //Stroke Color
*/

crosskit.square(options)
/*
options.x                        //X Position
options.y                        //Y Position
options.size                     //Square Size
options.a                        //Drawing Alpha
options.fill                     //Fill Color
options.stroke                   //Stroke Color
*/

crosskit.pixel(options)
/*
options.x                        //X Position
options.y                        //Y Position
options.color                    //Pixel Color
*/

crosskit.roundedrect(options)
/*
options.x                        //X Position
options.y                        //Y Position
options.w                        //Width
options.h                        //Height
options.a                        //Drawing Alpha
options.r                        //Radius(Optional)
options.fill                     //Fill Color
options.stroke                   //Stroke Color
*/
//Notes: Only In WEBGL Renderer Mode,Use Radius Without Defining Width And Height Cause It Gives Same Result

crosskit.img(options)
/*
options.img                      //Image
options.x                        //X Position
options.y                        //Y Position 
options.w                        //Width
options.h                        //Height
options.a                        //Drawing Alpha
options.r                        //Radius(Only SVG And DOM Mode)
*/

crosskit.text(options)
/*
options.x                        //X Position
options.y                        //Y Position
options.txt                      //Text String
options.fill                     //Fill Color(Optional)
options.stroke                   //Stroke Color
options.a                        //Drawing Alpha
options.size                     //Font Size
options.font                     //Font Type
*/

crosskit.triangle(options)
/*
options.pos1                     //Point 1,Array Consists Of 2 Variables Are X And Y
options.pos2                     //Point 2,Array Consists Of 2 Variables Are X And Y
options.pos3                     //Point 3,Array Consists Of 2 Variables Are X And Y 
options.fill                     //Fill Color
options.stroke                   //Stroke Color
options.a                        //Drawing Alpha
options.line_width               //Stroke Width
*/

crosskit.polygon(options)
/*
options.points                   //Polygon Points,Array That Consists Of Arrays That Have 2 Variables,X Position And Y Position Of The Point 
options.fill                     //Fill Color
options.stroke                   //Stroke Color
options.a                        //Drawing Alpha
*/

crosskit.animate(options)
/*
//CANVAS,WEBGL,DOM Modes
options.frame                    //Animation Frame Function

//SVG Mode
options.index                    //Index Of The Crosskit SVG Shape(First 0)
options.attr                     //SVG Shape Attribute To Animate
options.dur                      //Animation Duration(In Seconds)
options.from                     //Animating SVG Attribute Starts From Variable
options.to                       //Animating SVG Shape Attribute Continues To Variable 
options.loop_num                 //Repeating Animation Count
options.loop_dur                 //Repeating Animation Duration(Not Optional)
*/

crosskit.update(f,t)             //Does A Custom requestAnimationFrame On A Functions f In Time t(In Milliseconds)

crosskit.pause(options)
/*
//You Can Only Use One Of These

options.interval                 //Pauses(Clears) An Interval 
options.frame                    //Pauses(Cancels) Animation Frame Which Is A Function
*/
```