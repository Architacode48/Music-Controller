song="";
lwristX=0;
lwristY=0;
rwristX=0;
rwristY=0;
scoreRwrist=0;
scoreLwrist=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
   poseNet=ml5.poseNet(video, modelLoaded);
  poseNet.on("pose",gotPoses);
  }
function modelLoaded(){
  console.log('Posenet is initialized');
}
function draw(){
  image(video,0,0,600,500);
  fill("#FF0000");
  stroke("#FF0000");
  if(scoreLwrist>0.1){
    circle(lwristX,lwristX,20);
    if(lwristY>0 && lwristY<=100){
      document.getElementById("volume").innerHTML="volume=0.1";
      song.setVolume(0.1);
    }else if(lwristY>100 && lwristY<=200){
      document.getElementById("volume").innerHTML="volume=0.3";
      song.setVolume(0.3);
    }else if(lwristY>200 && lwristY<=300){
      document.getElementById("volume").innerHTML="volume=0.5";
      song.setVolume(0.5);
    }else if(lwristY>300 && lwristY<=400){
      document.getElementById("volume").innerHTML="volume=0.7";
      song.setVolume(0.7);
    }else if(lwristY>400 && lwristY<=500){
      document.getElementById("volume").innerHTML="volume=1";
      song.setVolume(1);
    }
  }

  if(scoreRwrist>0.1){
    circle(rwristX,rwristY,20);
    if(rwristY>0 && rwristY<=100){
        document.getElementById("speed").innerHTML="speed=0.5";
        song.rate(0.5);
    }else if(rwristY>100 && rwristY<=200){
      document.getElementById("speed").innerHTML="speed=1";
      song.rate(1);
    }else if(rwristY>200 && rwristY<=300){
      document.getElementById("speed").innerHTML="speed=1.5";
      song.rate(1.5);
    }else if(rwristY>300 && rwristY<=400){
      document.getElementById("speed").innerHTML="speed=2";
      song.rate(2);
    }else if(rwristY>400 && rwristY<=500){
      document.getElementById("speed").innerHTML="speed=2.5";
      song.rate(2.5);
    }
  
  }
  


}
function preload(){
  song=loadSound("Count On Me.mp3");
}
function play(){
  song.play();
  song.setVolume(0.5);
  song.rate(1);
}
function gotPoses(results){
  if(results.length>0){
    console.log(results);
    lwristX=results[0].pose.leftWrist.x;
    lwristY=results[0].pose.leftWrist.y;
    rwristX=results[0].pose.rightWrist.x;
    rwristY=results[0].pose.rightWrist.y;
    scoreRwrist=results[0].pose.keypoints[10].score;
    scoreLwrist=results[0].pose.keypoints[10].score;
    console.log("scoreRwrist= "+scoreRwrist+"scoreLwrist= "+scoreLwrist);
    console.log("leftWristX= "+lwristX+"leftWristY= "+lwristY);
    console.log("rightWristX= "+rwristX+"rightWristY= "+rwristY);
  }
}