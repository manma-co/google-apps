function sent_students_date_Function(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var lastRow = sheet.getLastRow() - 1 ;
  var lastCol = sheet.getLastColumn();
   
  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);
  var data = dataRange.getValues();
  var EMAIL_SENT = "○";
  
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var student_name =  row[2];
    var student_mail =  row[3];
    var abroad_date = row[7];
    var abroad_time = row[8];
    var abroad_place = row[9];
    var check_flag = row[10];
    var abroaddate = Utilities.formatDate(abroad_date, 'Asia/Tokyo', 'yyyy/MM/dd');
    var abroadtime = Utilities.formatDate(abroad_time, 'Asia/Tokyo' , 'HH:MM');
    if (check_flag !== ""　){
      var sent_flag = row[11];
      if (sent_flag == ""){
        var title = '【manma】家族留学実施日のお知らせ';
        var body  = student_name + "さま\n\n"
        + "先日は、事前説明会へのご参加ありがとうございました。\n"
        + "家族留学の実施日が確定いたしましたので、ご連絡いたします。\n\n"
        + "【実施概要】\n"
        + "日時: "+ abroaddate + "\n"
        + "実施時間: "+ abroadtime + "\n"
        + "集合場所： "+ abroad_place + "\n\n"
        + "上記の内容で受け入れていただけることになりましたので、ご確認くださいませ。 \n"
        + "参加の可否について、こちらのメールを確認次第すぐにご返信いただきますようお願いいたします。\n\n"
        + "どうぞよろしくお願いいたします。\n\n"
        + "manma";
        GmailApp.sendEmail(student_mail,title,body,
                          {
                             name: 'manma'
                          }
                          );
        sheet.getRange(startRow + i, 12).setValue(EMAIL_SENT);
        // Make sure the cell is updated right away in case the script is interrupted
        SpreadsheetApp.flush();
      }
    }
  }
}

