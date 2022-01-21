"use strict"

// flagがpen-plagの時penguinsのターン, bearの時baawgaiのターン
let flag= "pen-flag";
// if (flag === pen-flag){
//     let flag="bear-flag"
//     console.log(flag);
// }
// ターン数カウンター
let counter= 9;
// class="square"を取得
const squares = document.getElementsByClassName("square");

// arrayに変換
const squaresArray = Array.from(squares);

// squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");   
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// NewGameボタン取得
const newgamebtn_display=document.getElementById("newgame-btn");
const newgamebtn=document.getElementById("btn90");
// Win or Lose Judgment Line
const line1 = JudgLine(squaresArray,["a_1","a_2","a_3"]);
const line2 = JudgLine(squaresArray,["b_1","b_2","b_3"]);
const line3 = JudgLine(squaresArray,["c_1","c_2","c_3"]);
const line4 = JudgLine(squaresArray,["a_1","b_1","c_1"]);
const line5 = JudgLine(squaresArray,["a_2","b_2","c_2"]);
const line6 = JudgLine(squaresArray,["a_3","b_3","c_3"]);
const line7 = JudgLine(squaresArray,["a_1","b_2","c_3"]);
const line8 = JudgLine(squaresArray,["a_3","b_2","c_1"]);

const lineArray = [line1 ,line2 ,line3 ,line4 ,line5 ,line6 ,line7 ,line8 ];

let WinningLine = null;
// ***
// メッセージ
const msgtxt1 = '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text">YOUR TURN !!</p>'
const msgtxt2 = '<p class="image"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text">COMPUTER TURN !!</p>'
const msgtxt3 = '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">You Win!!</p>'
const msgtxt4 = '<p class="image"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">PC Win!!</p>'
const msgtxt5 = '<P class="image"><img src ="img/penguins.jpg" width=61px height=61px><img src =" img/whitebear.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>'
// サウンド
let gameSound = ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];
// ページ本体が読み込まれたタイミングで実行するコード
// ***
window.addEventListener("DOMContentLoaded",
    function(){
        // メッセージ　最初penguのターンから
        setMessage("pen-turn");

        // squareがクリック可能か判断するクラスを追加
        squaresArray.forEach(function(square){
            square.classList.add("js-clickable");
        });
    },false
);

// ***
// Win or Lose Judgement Line 配列化
// ***
//  JavaScriftでfilterを使う方法:https//techacademy.jp/magazine/15575
function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return(e.id === idArray[0] || e.id ===idArray[1] || e.id === idArray[2]);
    });
}
// squareをクリックした時にエベント発火
// ***
// クリックしたsquareに、penguかbaawgaiを表示。画像を表示したsquareはクリックできないようにする、win or lose Judgementの呼び出し
squaresArray.forEach(function(square){
    square.addEventListener('click',() =>{
        let gameOverFlg=isSelect(square);
        // GameOver ではない場合は、熊のターン
        if(gameOverFlg === "0"){
            const squaresBox=document.getElementById("squaresBox");     
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function(){
                    bearTurn();
                },
                "2000"
            );
        }
    });
});

function isSelect(selectSquare){
    let gameOverFlg = "0";
    if(flag === "pen-flag"){
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");
         // クリックサウンド
        let music = new Audio(gameSound[0]);
            music.currentTime = 0;
            music.play();
        if(isWinner("pen")){
            setMessage("pen-win");
            gameOver("pen");
         return gameOverFlg = "1";
        }
        setMessage("bear-turn");
        flag="bear-flag";

    }else{ 
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");   
        selectSquare.classList.remove("js-clickable"); //squareがクリック可能かを判断するクラスを削除ｚ
        // クリックサウンド
        let music = new Audio(gameSound[1]);
            music.currentTime = 0;
            music.play();
        if(isWinner("bear")){
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }
        setMessage("pen-turn");
        flag = "pen-flag";
    }

    // ターン数カウンターを1する
    counter = counter-1;
    // ターン数=0になったら　draw
    if(counter===0){
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }
    return gameOverFlg = "0";
}
// ***
// 勝敗判定
// ***
function isWinner(symbol) {
    //some:1つでも条件満たしていればtrueを返す
    const result = lineArray.some(function (line){
    // every: 全て条件を満たしていればtrueを返す
        const subResult = line.every(function(square){
            if(symbol === "pen"){
                return square.classList.contains("js-pen-checked");
            }
            if(symbol === "bear"){
                return square.classList.contains("js-bear-checked");
            }
        });
        // trueを返したlineをwinnerLineに代入
        if (subResult) {WinningLine = line}

        return subResult;
    });
    return result;
}
// ***
// メッセジー切り替え関数
// ***
function setMessage(id){
    switch(id){
        case "pen-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML=msgtxt3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML=msgtxt1;
    }

}
function gameOver(status){
    // gameOver sound
    let w_sound
    switch (status) {
        case "pen":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }

    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
    // all square unclickable
    // squaresArray.forEach(function(square){
    //     square.classList.add("js-unclickable");
    // });
    squaresBox.classList.add("js-unclickable");//sqaure-boxをクリックできないようにする
    newgamebtn_display.classList.remove("js-hidden");

    // winEffect
    if(status==="pen"){
        // winner-line penguins high-light
        if(WinningLine){
            WinningLine.forEach(function(square){
                square.classList.add("js-pen_highLight");
            });
            // penguins  win!!==> snow color is pink     
            $(document).snowfall({
                flakeColor :"rgb(255,240,245)",
                maxSpeed : 3,
                minSpeed : 1,
                maxSize : 20,
                minSize : 10,
                round : true,
            });
        }
    }else if(status==="bear"){
        // winner-line bear high-light
        if(WinningLine){
            WinningLine.forEach(function(square){
                square.classList.add("js-bear_highLight");  
            });
        }    
        // bear  win!!==> snow color is pink 
        $(document).snowfall({
            flakeColor :"rgb(175,238,238)",
            maxSpeed : 3,
            minSpeed : 1,
            maxSize : 20,
            minSize : 10,
            round : true,
        });
    }
}
// NewGameボタン　クリック時　ゲーム初期化
// *******
// classListの使い方まとめ
newgamebtn.addEventListener("click",function(){
   flag="pen-flag"
    counter =9;
    WinningLine = null;
    
    squaresArray.forEach(function(square){
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        square.classList.add("js-clickable");//squareがクリック可能かを判断するクラスを追加です。

        squaresBox.classList.remove("js-unclickable");
        //NewGameのボタンエリアを表示する
        setMessage("pen-turn");
        newgamebtn_display.classList.add("js-hidden");  
    
        //snowfall stop
        $(document).snowfall("clear");
    })
},false);
// bearTurn defined
function bearTurn(){
    let gameOverFlg = "0";

    const bearSquare=squaresArray.filter(function(square){
            return square.classList.contains("js-clickable");
    });
    
    let n= Math.floor(Math.random()*bearSquare.length);
    gameOverFlg = isSelect(bearSquare[n]);

    if(gameOverFlg === "0"){
        squaresBox.classList.remove("js-unclickable");
    }
    
}