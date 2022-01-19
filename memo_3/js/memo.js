"use strict"
// ページ本体が読み込まれたタイミング実行するコード
window.addEventListener("DOMContentLoaded",
    function() {
        // 1.localStorageが使えるか 確認
        if (typeof localStorage==="undefined"){
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        }else{
            viewStorage();//localStorageからのデータの取得とテーブルへ表示
            saveLocalStorage(); //2.Local Storageへの保存
            delLocalStorage(); //3.local Storageから１件削除
            allClearLocalStorage(); //4.localStorageからすべて削除
            selectTable();//5データを選択
        }
    },false
);
// 2.localStorageへの保存
function saveLocalStorage(){
        const save=document.getElementById("save")
        save.addEventListener("click",
        function(e) {
            e.preventDefault();
            const key=document.getElementById("textKey").value;
            const value=document.getElementById("textMemo").value;

            // 値の入力チェック
            if(key=="" || value==""){
                window.alert("Key,Momeはいずれも必須です。")
                return;
            }else{
                let w_confirm=confirm("LocalStorageに\n"+key+" "+value+"\nを保存しますか？");//version-up 1 add
                if (w_confirm===true){
                    localStorage.setItem(key,value);
                    viewStorage();//localStorageからのデータの取得とテーブルへ表示
                    let w_msg="LocalStorageに"+key+" "+value+"を保存しました";
                    window.alert(w_msg);
                    document.getElementById("textKey").value="";
                    document.getElementById("textMemo").value="";
                }//version-up 1 add
            }
        },false
    );
}
//localStorageからのデータの取得とテーブルへ表示
function viewStorage(){
    const list=document.getElementById("list");
    // htmlのテーブル初期化
    while(list.rows[0]) list.deleteRow(0);
    // localStorageすべての情報の取得
     let i;
    for(i=0; i<localStorage.length; i++){
        let w_key=localStorage.key(i);

        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        // let tr=document.createElement("tr");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML="<input name='chkbox1' type='checkbox'>"; // version-up 2 chg:
        td2.innerHTML=w_key;
        td3.innerHTML=localStorage.getItem(w_key);
    }
    // JQueryのplugin tablesorterを使ってテーブルのソート
    // sortList: 引数１...最初からソートしておく列  を指定、引く数２...０昇順，１…降順
    $("#table1").tablesorter({      //tablesort add 
        sortList:[[1,0]]            //tablesort add 
    });                             //tablesort add 
    $("#table1").trigger("update"); //tablesort add 
}
// 4.localStorageからすべて削除
function allClearLocalStorage(){
    const allClear=document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_confirm=confirm("LocalStorageのデータをすべて削除(all Clear)します。\nよろしいですか？");
            if (w_confirm===true){
                localStorage.clear();
                viewStorage();
                let w_msg="LocalStorageのデータをすべて削除しました";
                alert(w_msg);
                document.getElementById("textKey").value="";
                document.getElementById("textMemo").value="";
            }
        },false
    );
}
// 5.テータを選択
function selectTable(){
    const select=document.getElementById("select");
    select.addEventListener("click",
        function(e){    
            e.preventDefault();
            selectCheckBox();//  データからデータを選択 version-up 2 chg: selectRadioBtn ==> selectCheckBox 
        },false
    );
}
    // データからデータを選択
function selectCheckBox(){  //version-up 2 chg: selectRadioBtn ==> selectCheckBox 
    let w_sel="0";//選択されていれば”1”にする
    let w_cnt=0; //選択されているチェックボックスの数//version-up 2 add 
    const chkbox1=document.getElementsByName("chkbox1"); // version-up 2 chg: radio1 ==> chkbox1 
    const table1=document.getElementById("table1");
    let w_textKey = ""; //work version-up 2 add 
    let w_textMemo = ""; // work version-up2 add 
    for(let i=0; i<chkbox1.length; i++){ // version-up 2 chg: radio1 ==> chkbox1
        if(chkbox1[i].checked){ // version-up 2 chg: radio1 ==> chkbox1 
            if(w_cnt===0){ //最初にチェックされている行をワークに退避　versio-up 2 add 
                w_textKey = table1.rows[i+1].cells[1].firstChild.data; // version-up 2 document.getElementById("textKey").value ==>w_textKey
                w_textMemo =table1.rows[i+1].cells[2].firstChild.data; // version-up 2 document.getElementById("textMemo").value=table1.rows[i+1].cells[2].firstChild.data ==> w_textMemo
            // return w_sel="1; version-up 2 del
            } // version-up 2 add 
            w_cnt++; // 選択されているチェックボックスの数をカウント　version-up 2 add 
        }

    }
    document.getElementById("textKey").value = w_textKey; // version-up 2 add 
    document.getElementById("textMemo").value = w_textMemo;; // version-up 2 add 
    if(w_cnt === 1){ // version-up 2 add
        return w_sel="1";
    }else{
        window.alert("１つ選択(select)してください。");
    } // version-up 2 add 
};
// 3.local Storageから１件削除
function delLocalStorage(){
    const del=document.getElementById("del");
    del.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_sel="0";  //選択されていれば"1"が返却される   
            w_sel=selectCheckBox(); // テーブルからデータ選択 version-up 2 chg: selectRadioBtn ==> selectCheckBox 
            if(w_sel==="1"){
                const key=document.getElementById("textKey").value;
                const value=document.getElementById("textMemo").value;
                let w_confirm=confirm("LocalStorageに"+key+" "+value+"を削除しますか？");//version-up 1 add 
                if (w_confirm===true){//version-up 1 add 
                    localStorage.removeItem(key);
                    viewStorage();//localStorageからのデータの取得とテーブル表示
                    let w_msg="LocalStorageに"+key+" "+value+"を削除しました";
                    window.alert(w_msg);
                    document.getElementById("textKey").value="";
                    document.getElementById("textMemo").value="";
                }//version-up 1 add 
            }
        }, false
    );
}