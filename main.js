p2="";
p1="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function capture() {
    Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="res">';
    });
}

console.log('ml5 version: ', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dnaQTGIkx/model.json', modelloaded);
function modelloaded() {
    console.log('model is loaded')
}

function speak() {
    var synth=window.SpeechSynthesis;
    data1=toSpeak;
    var utter=new SpeechSynthesisUtterance(data1);
    synth.speak(utter);
}

function predict() {
    img=document.getElementById("res");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("emo1").innerHTML=results[0].label;
        toSpeak="";
       

        if(results[0].label=="victory") {
            toSpeak="That was a great victory!";
            document.getElementById("emoj1").innerHTML="&#9996;";
        }
       else if(results[0].label=="amazing") {
           toSpeak="this is looking amazing";
            document.getElementById("emoj1").innerHTML="&#128076;";
        }
       else if(results[0].label=="best") {
           toSpeak="all the best!";
            document.getElementById("emoj1").innerHTML="&#128077;";
        }
        speak();
    }
}