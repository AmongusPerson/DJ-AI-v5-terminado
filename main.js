song = "";

function preload() {
    song = loadSound("HeatWaves.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(500, 500, 0, 0);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initilized');
}

function gotPoses(results) {
    if(results.length > 0)
    {
        scoreRightWrist =  results[0].pose.keypoints[10].score;
        scoreLeftWrist =  results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
          
    }
}


function draw() {
    image(video,0,0,500,500);
    fill("#210794");
    stroke("#210794");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById('volumen').innerHTML="Volumen: " + rightWristY;
            song.setVolume(rightWristY*0.3);
        }
        else if(rightWristY > 100 && rightWristY <= 200) {
            document.getElementById('volumen').innerHTML="Volumen: " + rightWristY;
            song.setVolume(rightWristY*0.3);
        }
        else if(rightWristY > 200 && rightWristY <= 300) {
            document.getElementById('volumen').innerHTML="Volumen: " + rightWristY;
            song.setVolume(rightWristY*0.3);
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        if (leftWristY > 0 && leftWristY <= 100) {
            document.getElementById('v').innerHTML= leftWristY;
            song.rate(leftWristY);
        }
        else if (leftWristY > 100 && leftWristY <= 200) {
            document.getElementById('v').innerHTML= leftWristY;
            song.rate(leftWristY);
        }
        else if (leftWristY > 200 && leftWristY <= 300) {
            document.getElementById('v').innerHTML= leftWristY;
            song.rate(leftWristY);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1); 
    song.rate(1); 
}