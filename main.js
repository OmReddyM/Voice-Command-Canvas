x = 0;
y = 0;
screenWidth = 0;
screenHeight = 0;
canvasHeight = 0;
apple = "";
draw_apple = "";
speak_data = "";
userNumber = "";
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function preload() {
    apple = loadImage("apple.png");
}

function start() {
    document.getElementById("status").innerHTML = "System is listening please speak";
    recognition.start();
}

recognition.onresult = function (event) {

    console.log(event);

    content = event.results[0][0].transcript;
    userNumber = Number(content);
    document.getElementById("status").innerHTML = "The speech has been recognized as: " + content;
    if (Number.isInteger(userNumber)) {
        document.getElementById("status").innerHTML = "Started drawing " + userNumber + " apples"
        draw_apple = "set";
    } else {
        document.getElementById("status").innerHTML = "This speech does not contain a number";
    }
}

function setup() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvasHeight = screenHeight - 150;
    canvas = createCanvas(screenWidth, canvasHeight);
    canvas.position(0, 150);
}

function draw() {
    if (draw_apple == "set") {
        for (let index = 1; index <= userNumber; index++){
            x = Math.floor(Math.random() * (screenWidth - 50));
            y = Math.floor(Math.random() * (canvasHeight - 50));
            image(apple, x, y, 50, 50)
        }
        document.getElementById("status").innerHTML = userNumber + " Apples drawn";
        draw_apple = "";
        speak();
    }
}

function speak() {
    speak_data = userNumber + " Apples drawn" 
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
