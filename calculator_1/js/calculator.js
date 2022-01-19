// 関数なし
/*"use strict";
// ページ上の要素(Element)を参照
const elementSelect=document.getElementById("calcType");
const elementNum1=document.getElementById("num1");
const elementNum2=document.getElementById("num2");
const elementResult=document.getElementById("result");

// イベントを登録
elementSelect.addEventListener("change",
    function(){
    // 計算結果を求める
        let num1=Number(elementNum1.value);//1番目のテキスト入力フォームの値
        let num2=Number(elementNum2.value);//2番目のテキスト入力フォームの値
        let calcType=elementSelect.value;//セレクトボックスの値（計算の種類）
        let result;
        // 計算の種類で処理を分
        switch(calcType){
            case"type-add"://足し算の場合
                result = num1 + num2;
                break;
            case"type-substract"://引き算の場合
                result = num1 - num2;
                break;
            case"type-multiply"://掛算の場合
                result = num1 * num2;
                break;
            case"type-divide"://割り算の場合
                result = num1 / num2;
                break;
        }
        // 画面に表示
        elementResult.innerHTML=result;//テキストを代入
    },false
);
elementNum1.addEventListener("change",
    function(){
    // 計算結果を求める
        let num1=Number(elementNum1.value);//1番目のテキスト入力フォームの値
        let num2=Number(elementNum2.value);//2番目のテキスト入力フォームの値
        let calcType=elementSelect.value;//セレクトボックスの値（計算の種類）
        let result;
        // 計算の種類で処理を分
        switch(calcType){
            case"type-add"://足し算の場合
                result = num1 + num2;
                break;
            case"type-substract"://引き算の場合
                result = num1 - num2;
                break;
            case"type-multiply"://掛算の場合
                result = num1 * num2;
                break;
            case"type-divide"://割り算の場合
                result = num1 / num2;
                break;
        }
        // 画面に表示
        elementResult.innerHTML=result;//テキストを代入
    },false
);
elementNum2.addEventListener("change",
    function(){
    // 計算結果を求める
        let num1=Number(elementNum1.value);//1番目のテキスト入力フォームの値
        let num2=Number(elementNum2.value);//2番目のテキスト入力フォームの値
        let calcType=elementSelect.value;//セレクトボックスの値（計算の種類）
        let result;
        // 計算の種類で処理を分
        switch(calcType){
            case"type-add"://足し算の場合
                result = num1 + num2;
                break;
            case"type-substract"://引き算の場合
                result = num1 - num2;
                break;
            case"type-multiply"://掛算の場合
                result = num1 * num2;
                break;
            case"type-divide"://割り算の場合
                result = num1 / num2;
                break;
        }
        // 画面に表示
        elementResult.innerHTML=result;//テキストを代入
    },false
);*/
// 関数の状態
"use strict";
// ページ上の要素(Element)を参照
const elementSelect=document.getElementById("calcType");
const elementNum1=document.getElementById("num1");
const elementNum2=document.getElementById("num2");
const elementResult=document.getElementById("result");
const elementBtnEqual=document.getElementById("btnEqual");

// イベントを登録
elementSelect.addEventListener("change",clear);
elementNum1.addEventListener("change",clear);
elementNum2.addEventListener("change",clear);
elementBtnEqual.addEventListener("click",update);
/**計算し画面に表示します */
    function update()　{
    // 計算結果を求める
        const result = calculate (
        Number(elementNum1.value),//1番目のテキスト入力フォームの値
        Number(elementNum2.value),//2番目のテキスト入力フォームの値
        elementSelect.value,//セレクトボックスの値（計算の種類）
        );
        // 画面に表示
        elementResult.innerHTML=result;//テキストを代入
    }

// 計算します。
function calculate(num1,num2,calcType){
    let result;
    switch (calcType) {
        case "type-add":// 足し算
        result =num1 + num2
        break;
        case "type-substract"://引き算
        result =num1 - num2
        break;
        case "type-multiply":// 掛け算
        result =num1 * num2
        break;
        case "type-divide":// 割り算4
        result =num1 / num2
        break;
    }
    return result;
}
function clear(){
    elementResult.innerHTML=0;
    elementResult.innerHTML="";
}