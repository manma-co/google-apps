function before_3days_notification_Function(){
  var url = "hoge";
  var spreadsheet = SpreadsheetApp.openByUrl(url);

  //あとはSpreadsheetクラスのメソッドを利用して目的の処理をすればよいです
  //例えば、スプレッドシートに含まれるシートオブジェクトを全て取得して、シート名でひっかけるとか
  var sheets = spreadsheet.getSheets();
  for ( var i in sheets ){
    if ( sheets[i].getSheetName() == "シート1" ) {
      //あとはシートの内容を取得してさらに処理するのですがその辺は後述
    }
  }

  //上記の変数spreadsheetや変数sheetsを継続して使いまわします
  var sheet = sheets[0];             //一番左のシートは配列のindex"0"で指定します

  //シートの最終行番号、最終列番号を取得
  var startrow = 1;
  var startcol = 1;
  var lastrow = sheet.getLastRow();
  var lastcol = sheet.getLastColumn();
  var alert_flage = 0
  //がさっと取得
  var sheetdata = sheet.getSheetValues(startrow, startcol, lastrow, lastcol);
  var now_date = new Date();
  now_date.setDate(now_date.getDate() + 7);

  for (var i=1; i < lastrow; i++) {

    //メール送信済みフラグのチェック
    //日付をチェック
    var check_mail_flag = sheetdata[i][13];
    var check_date = sheetdata[i][4];

    if (check_date == null){
    }
    else if (check_mail_flag == 1){
    }
    else if (check_date < now_date){
        var alert_flage = 1;
        break;
        }
}

if (alert_flage == 1){
    //mail送信
  var address = 'hidemasuoka112@gmail.com';
  var title = '1週間前の人がいます';
  var content = '1週間前の人がいます \n 確認して下さい'　  ;
  GmailApp.sendEmail(
    address, title, content,{
     name: 'manma'
 });
}

}

