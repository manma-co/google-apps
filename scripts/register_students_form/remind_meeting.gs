function remind_meeting_Function(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var lastRow = sheet.getLastRow() - 1 ;
  var lastCol = sheet.getLastColumn();
  var remaindday = ""
  var now_date = new Date();
  var nowdate = Utilities.formatDate( now_date, 'JST', 'yyyy/MM/dd'); 
  var year = now_date.getFullYear();  
  var month = now_date.getMonth() + 1;  
  var day = now_date.getDate();  
  
  var remaind_time = new Date(year,month-1,day).getTime();
  var nextDateTime = remaind_time + (60*60*24*1000) * 1;
  var remaind_day = new Date(nextDateTime);
  var remaindday = Utilities.formatDate(remaind_day, 'JST', 'yyyy/MM/dd');
 
  var alrert_message = "";
  var alrert_mail_flag = 0;
  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);
 
  var data = dataRange.getValues();

  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var apply_name =  row[1];
    var remind_mail =  row[5];
    var meeting_date = row[15];
    var meeting_day = row[23];
    if (meeting_day !== ""　| meeting_date !=="その他"){
      var meetingday = Utilities.formatDate(meeting_day, 'JST', 'yyyy/MM/dd');
      if (remaindday == meetingday ){
        var title = '【manma】事前説明会のお知らせ';
        var body  = apply_name + "さま\n\n"
        + "明日の事前説明会について、再度ご連絡いたします。\n"
        + "事前説明会の受付が完了いたしました。\n"
        + "当日は「appear.in」というビデオ会議ツールを用いて実施させていただきます。\n\n"
        + "【実施概要】\n"
        + "日時:"+ meeting_date + "\n"
        + "参加の可否について、こちらのメールを確認次第すぐにご返信いただきますようお願いいたします。 \n"
        + "参加方法：下記リンクをクリック\n"
        + "appear.in/manma_march \n"
        + "※クリック時に自動で通話が開始\n\n"
        + "【事前説明会の内容】\n"
        + "(1) 家族留学のご説明 \n"
        + "(2) 留学先家庭のご提案 \n"
        + "※登録時に提出していただいたカウンセリングシートを元に2・3家庭をご提案させていただきます \n\n"
        + "【当日までにお願いしたいこと】\n"
        + "(1) 登録費のお振込み\n"
        + "説明会当日までに1,000円の登録費を下記口座へのお振込みをお願いいたします。\n"
        + "------------------------------------------------------\n"
        + "振ゆうちょ銀行　〇一八（ゼロイチハチ）店\n"
        + "8022925\n"
        + "普通\n"
        + "ホームベース\n"
        + "------------------------------------------------------\n"
        + "※ゆうちょ銀行からお振込みの場合は、10170（記号）-80229251（番号）でお探しください。\n\n"
        + "何かご不明な点がございましたら\n"
        + "info@manma.co までご連絡ください。\n\n"
        + "明日はどうぞよろしくお願いいたします。\n\n"
        + "manma";
        GmailApp.sendEmail(remind_mail,title,body,
                          {
                             name: 'manma'
                          }
                          );
      }
    }
  }
}

