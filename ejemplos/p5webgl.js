//zxcvbs
//Probando WEBGL
p1 = new P5({mode: 'WEBGL'})
p1.clear()
const objectsize =200;
const anglechange = 0.01;
var angle = 0;
p1.draw = () => {
 var camX = p1.map(p1.mouseX,0,p1.width,-200,200);
 var camY = p1.map(p1.mouseY,0,p1.width,-200,200);
p1.camera(camX,camY,(p1.height/2)/ p1.tan(p1.PI/6),camX,camY,0,0,1,0);
  p1.background(0,0,0);
  p1.fill(0,255,0);
  p1.rotateX(angle);
  p1.rotateY(angle);
  p1.rotateZ(angle);
  p1.box(objectsize);
  angle = angle + anglechange;
}
p1.mousePressed = () => {
  p1.fill(0)
  p1.rect(0,0,p1.width,p1.height)
}
p1.hide()
s0.init({src: p1.canvas})
src( s0 )
.modulate( noise(1) )
//.mult(noise(3)).scale(() => Math.sin(time)*0.5)
.out(o0)
