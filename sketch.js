let capture;
let posenet;
let noseX, noseY;
let singlePose, skeleton;
let actor_img;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
    capture.hide();

    //create an object
    posenet = ml5.poseNet(capture, modelLoaded);
    //create an eventlistener with a callback function
    posenet.on('pose', receivedPoses)

    actor_img = loadImage('images/images.png');

}

function receivedPoses(poses) {
    console.log(poses);
    //if skeleton is in the picture then only execute this code
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has Loaded');
}

function draw() {
    background(200, 200);

    //images and videos(webcam)
    image(capture, 0, 0);
    fill(255, 0, 0);

    //when first time code runs there are no keypoints so if condition is applied
    if (singlePose) {
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 20);
        }
        stroke(255, 255, 255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        image(actor_img, singlePose.nose.x - 45, singlePose.nose.y - 60, 100, 100);
    }

} 