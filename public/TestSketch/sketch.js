var back;
var photo1,photo2,photo3;
var canvas;
var kitaba;
var koike;
var yamagida;
var dest;
var r1,r2,r3,r4,r5;
var reply = "";
var tmp;

function preload(){
    back = loadImage("zemimap2016.png");
    photo1 = loadImage("kitaba.png");
    photo2 = loadImage("koike.png");
    photo3 = loadImage("yamagida.png");
    kitaba = new Character(photo1);
    koike = new Character(photo2);
    yamagida = new Character(photo3);
    kitaba.set(500, 700);
    koike.set(550,750);
    yamagida.set(500,850);
}

function setup() {
  canvas = createCanvas(880,1250);
  background(back);
  noStroke();
  rectbox();
  var url = "http://localhost:3000/api";
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.onreadystatechange = function () {
    if (request.readyState != 4) {
  	      // リクエスト中
   	    } else if (request.status != 200) {
  	      // 失敗
  	    } else {
    	    // 取得成功
    	    reply = JSON.parse(request.responseText);
    	    tmp = reply[0];
    	    console.log(tmp);
          kitaba.setTarget({x:tmp["x座標"]*120+28,y:tmp["y座標"]*120+1025+50});
          console.log({x:tmp["x座標"]*120+28,y:tmp["y座標"]*120+1025+50});
   	 }
	};
	koike.setTarget({x:200,y:800});
	yamagida.setTarget({x:180,y:1000});
    console.log(kitaba.x + "," +  kitaba.y);
request.send(null);
}

function draw() {
  background(back);
  if(tmp){
    text("(" + tmp["x座標"] + "," + tmp["y座標"], 20, 30);
    ellipse(tmp["x座標"]*120+28,tmp["y座標"]*120+1025+50,10,10);
    kitaba.step(3);
  }
  koike.step(3);
  yamagida.step(3);
  kitaba.draw();
  koike.draw();
  yamagida.draw();
}

function rectbox() {
  r1 = {x:18,y:0,width:385,height:1228};
  r2 = {x:403,y:0,width:321,height:1228};
  r3 = {x:18,y:86,width:96,height:1142};
  r4 = {x:307,y:152,width:96,height:1076};
  r5 = {x:242,y:87,width:161,height:64};
  r6 = {x:114,y:1161,width:289,height:67};
  r7 = {x:724,y:17,width:63,height:1113};
}