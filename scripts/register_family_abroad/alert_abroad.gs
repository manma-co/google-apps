function alert_abroad_Function(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var lastRow = sheet.getLastRow() - 1 ;
  var lastCol = sheet.getLastColumn();
  var now_date = new Date();
  var nowdate = Utilities.formatDate( now_date, 'JST', 'yyyy/MM/dd'); 
  var year = now_date.getFullYear();  
  var month = now_date.getMonth() + 1;  
  var day = now_date.getDate();  
   
  var alrert_message = "";
  var alrert_mail_flag = 0;
  
  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);
 
  var data = dataRange.getValues();

  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var check_flag = row[10];
    if (check_flag == ""){
      var register_date = row[0];
      var date_check = remaind_time - (60*60*24*1000) * 2;
      if (date_check > register_date) {  
         alrert_mail_flag = 1 ;
         alrert_message = alrert_message + row[1] + "\n";       // Second column
       }
    }
  }
  if (alrert_mail_flag == 1){
  var alrert_subject = "【至急】実施学生確認";
  var manma_mail = 'hidemasuoka112@gmail.com';
  var message = "以下のメンバーの実施日程確認チェックが\"Ｋ列\"に記入されていません。\n"
  + alrert_message;
 

    GmailApp.sendEmail(manma_mail,alrert_subject,alrert_message,
    {
      name: 'manmaアラート'
    }
    );
  }
}

