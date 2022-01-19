"use strict";
window.addEventListener("DOMContentLoaded",
     function(){
        $("header").textillate({
            loop: false, 
            minDisplayTime: 2000,
            initialDelay: 2000, 
            autoStart: true, 
            in: { 
                effect: "fadeInLeftBig",
                delayScale: 1.5, 
                delay: 50, 
                sync: false, 
                shuffle: true 
            }
        });
            $(function(){
                ScrollReveal().reveal("#btn1", { duration: 9000 });
            });

            setTimeout(
                function(){
                    let popMessege = "いらっしゃい！おみくじ引いてって!";
                    window.alert(popMessege);
                },
                "5000"
            );
    }, false
);
const btn1=document.getElementById("btn1");
btn1.addEventListener("click",
    function(){
        // let n=Math.floor(Math.random()*3);
        //  switch (n){
        //     case 0:
        //         btn1.textContent="VeryHappy!";
        //         btn1.style.color="#ff0000";
        //     break;
        //     case 1:
        //         btn1.textContent="Happy!";
        //         btn1.style.color="#fff001";
        //     break;
        //     case 2:
        //         btn1.textContent="UnHappy...";
        //         btn1.style.color="#261e1c";
        //     break;
        // }
        let tarzanText=["大吉!!!!!","吉!!!!","中吉!!!","小吉!!","末吉!","凶。。"];
        let tarzanColor=["ff0000","#c71585","#ff1493","#ff69b4","#ff8c00","#1e90ff"];
        let tarzanFontsize=["90px","80px","70px","60px","50px","40px",];
        let tarzanMaxSpeed=[10,10,8,5,5,5];
        let tarzanMaxSize=[30,30,20,15,20,20];
        let tarzanImage=["photo/star.png","photo/sakura_hanabira.png","photo/sakura_hanabira.png","photo/leaf.png","photo/snowflakes.png","photo/star.png"];
        let tarzanSound=["sound/omikuji_sound1.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound1.mp3",
        "sound/omikuji_sound2.mp3","sound/omikuji_sound3.mp3","sound/omikuji_sound3.mp3"];
        let n=Math.floor(Math.random()* tarzanText.length);
        omikujiText.textContent=tarzanText[n];
        omikujiText.style.color=tarzanColor[n];
        omikujiText.style.fontSize=tarzanFontsize[n];
        let music=new Audio(tarzanSound[n]);
        music.currentTime= 0;
        music.play();
        $(document).snowfall("clear");
        $(document).ready(function(){
             $(document).snowfall({
                maxSpeed : tarzanMaxSpeed[n], 
                maxSize : tarzanMaxSize[n], 
                image : tarzanImage[n],
                minSize : 1, 
                minSpeed : 1,
             });
        });
    },false
);