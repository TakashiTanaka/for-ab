(()=>{var t={114:()=>{(()=>{"use strict";var t={d:(e,s)=>{for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Extension:()=>_,Function:()=>P,Object:()=>k,Utility:()=>E});var s={};t.r(s),t.d(s,{exCircle:()=>a,exCurveVertex:()=>x,exLine:()=>h,exPoint:()=>l,exRect:()=>d,exText:()=>n,exTriangle:()=>c,exVertex:()=>p});var i={};t.r(i),t.d(i,{Ball:()=>g,Car:()=>y,ExEllipse:()=>w,Obj:()=>u});var o={};t.r(o),t.d(o,{createFullCanvas:()=>f,dropShadow:()=>v});var m={};t.r(m),t.d(m,{CollisionChecker:()=>C,Iterator:()=>S,Mover:()=>b});const h=(t,e)=>line(t.x,t.y,e.x,e.y),n=(t,e)=>text(e,t.x,t.y),a=(t,e)=>circle(t.x,t.y,e),c=(t,e,s)=>triangle(t.x,t.y,e.x,e.y,s.x,s.y),d=(t,e,s)=>rect(t.x,t.y,e,s),l=t=>point(t.x,t.y),p=t=>vertex(t.x,t.y),x=t=>curveVertex(t.x,t.y);class u{constructor(t,e,s){this.position=t,this.width=e,this.height=s}}class y extends u{constructor(t,e=100,s=100,i=100){super(t,e,s),this.carColor=i}display(){rectMode(CENTER),noStroke(),fill(this.carColor),d(this.position,20,10),rect(this.position.x,this.position.y+8,36,8),fill(0,100,0),circle(this.position.x-8,this.position.y+12,6),circle(this.position.x+8,this.position.y+12,6)}}class g extends u{constructor(t,e){super(t,2*e),this.radius=e}display(){a(this.position,this.width)}}class w extends u{constructor(t,e,s,i=60){return super(t,e,s),this.points=[],this.pointNum=i,this.size={width:this.width,height:this.height},this}createPoints(){this.points=[];for(let t=0;t<=this.pointNum;t++)this.points.push(createVector(this.position.x+this.size.width/2*cos(TAU/this.pointNum*t),this.position.y+this.size.height/2*sin(TAU/this.pointNum*t)));return this}draw(){beginShape(),this.points.forEach((t=>x(t))),x(this.points[1]),x(this.points[2]),endShape()}}const f=()=>createCanvas(windowWidth,windowHeight),v=({x:t=4,y:e=4,blur:s=4,color:i="black"})=>{drawingContext.shadowOffsetX=t,drawingContext.shadowOffsetY=e,drawingContext.shadowBlur=s,drawingContext.shadowColor=i};class C{constructor(t){this.target=t}check(){const t=this.target.position.x>=width-this.target.size.width/2,e=this.target.position.x<=0+this.target.size.width/2;return{t:this.target.position.y<=0+this.target.size.height/2,r:t,b:this.target.position.y>=height-this.target.size.height/2,l:e}}}class b{constructor(t,e){this.target=t.v,this.speedSeed=e,this.s=createVector(random(-this.speedSeed,this.speedSeed),random(-this.speedSeed,this.speedSeed))}reverse(t){"x"===t&&(this.s.x*=-1),"y"===t&&(this.s.y*=-1)}move(){this.target.add(this.s)}}class S{constructor(t,e){this.count=t,this.fn=e,this.start()}start(){for(let t=0;t<this.count;t++)this.fn(t)}}const _=s,k=i,P=o,E=m;window.p5ex=e})()}},e={};function __webpack_require__(s){var i=e[s];if(void 0!==i)return i.exports;var o=e[s]={exports:{}};return t[s](o,o.exports,__webpack_require__),o.exports}(()=>{"use strict";__webpack_require__(114);class Random{constructor(){this.useA=!1;let sfc32=function(t){let e=parseInt(t.substr(0,8),16),s=parseInt(t.substr(8,8),16),i=parseInt(t.substr(16,8),16),o=parseInt(t.substr(24,8),16);return function(){e|=0,s|=0,i|=0,o|=0;let t=(e+s|0)+o|0;return o=o+1|0,e=s^s>>>9,s=i+(i<<3)|0,i=i<<21|i>>>11,i=i+t|0,(t>>>0)/4294967296}};this.prngA=new sfc32(tokenData.hash.substr(2,32)),this.prngB=new sfc32(tokenData.hash.substr(34,32));for(let t=0;t<1e6;t+=2)this.prngA(),this.prngB()}random_dec(){return this.useA=!this.useA,this.useA?this.prngA():this.prngB()}random_num(t,e){return t+(e-t)*this.random_dec()}random_int(t,e){return Math.floor(this.random_num(t,e+1))}random_bool(t){return this.random_dec()<t}random_choice(t){return t[this.random_int(0,t.length-1)]}}class Shape{constructor(t,e,s,i){this.paths=t,this.R=e,this.unit=s,this.newPath=[],this.canvasSize=i}makeLerpPath(){this.paths.forEach(((t,e,s)=>{const i={current:t,target:e+1===s.length?s[0]:s[e+1]},o=this.R.random_int(10,300);for(let t=0;t<o;t++){const s=map(t,0,o,0,1);this.newPath.push({vector:p5.Vector.lerp(i.current,i.target,s),count:e})}}))}transformPath(){this.newPath.forEach(((t,e)=>{t.vector.add(cos(e/(t.count+1))*this.unit+(this.R.random_dec()-.5)*this.unit*.2,sin(e/(t.count+1))*this.unit+(this.R.random_dec()-.5)*this.unit*.2)}))}makeVertex(){this.newPath.forEach((t=>vertex(t.vector.x,t.vector.y))),vertex(this.newPath[0].vector.x,this.newPath[0].vector.y)}draw(){this.makeLerpPath(),this.transformPath(),beginShape(),this.makeVertex(),endShape()}}let t,e,s,i,o,m=[],_=p5ex.Utility,r=()=>i.random_dec();const k=3,P=10;window.tokenData=function getTokenData(t){let e={},s="0x";for(var i=0;i<64;i++)s+=Math.floor(16*Math.random()).toString(16);return e.hash=s,e.tokenId=(1e6*t+Math.floor(1e3*Math.random())).toString(),e}(123);const init=()=>{t=window.innerWidth,e=window.innerHeight,s=Math.min(t,e),o=s/100,i=new Random},main=()=>{background(r(),r(),r()),strokeWeight(max(1,.1*o)),new _.Iterator(k,(t=>{let e=[];new _.Iterator(P+t,(t=>{e.push(createVector(r(),r()))})),m.push(e)})),m.forEach((t=>{stroke(r(),r(),1),fill(r(),r(),r(),.5),new Shape(t.map((t=>t.mult(s))),i,o,s).draw()})),m=[]};[()=>{init(),createCanvas(s,s),colorMode(HSB,1,1,1,1),main()},()=>{init(),resizeCanvas(s,s),main()}].forEach((t=>window[t.name]=t))})()})();