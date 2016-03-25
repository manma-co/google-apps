function alert_meeting_Function(){
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
  var warning_message = "";
  
  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);
 
  var data = dataRange.getValues();

  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var meeting_day = row[23];
    if (meeting_day == ""){
      var register_date = row[0];
      var date_check = remaind_time - (60*60*24*1000) * 2;
      if (date_check > register_date) {  
         alrert_mail_flag = 1 ;
         alrert_message = alrert_message + row[1] + "\n";       // Second column
       }
    }
    else{
      var meeting_date = row[15];
      if (meeting_date == "その他" ){
         alrert_mail_flag = 1 ;
         warning_message = warning_message + row[1] + "\n";       // Second column 
    }
  }
  }
  if (alrert_mail_flag == 1){
    var alrert_subject = "【至急】新規登録者確認";
    var manma_mail = 'hidemasuoka112@gmail.com'
    var message = "以下のメンバーの新規登録の日程が\"X列\"に記入されていません。\n"
    + alrert_message
    + "以下のメンバーの新規登録の日程が\"P列\"の値が「その他」になっています。決定した日程に変更してください\n"
    + warning_message
    + "事前説明会の日程を確認し、至急スプレッドシートに日程を記入してください。"


    GmailApp.sendEmail(manma_mail,alrert_subject,alrert_message,
    {
      name: 'manmaアラート'
    }
    );
  }
}

