function remaind_report_Function(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var lastRow = sheet.getLastRow() - 1 ;
  var lastCol = sheet.getLastColumn();
  var now_date = new Date();
  var year = now_date.getFullYear();  
  var month = now_date.getMonth() + 1;  
  var day = now_date.getDate();  

  var nowdate = Utilities.formatDate( now_date, 'JST', 'yyyy/MM/dd'); 
  
  var remaind_time = new Date(year,month-1,day).getTime();
  var nextDateTime = remaind_time + (60*60*24*1000) * 7;
  var remaind_date = new Date(nextDateTime);
  var remainddate = Utilities.formatDate(remaind_date, 'JST', 'yyyy/MM/dd');
 
  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);
 
  var data = dataRange.getValues();
  
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var student_name = row[2];
    var student_mail = row[3];
    var family_abroad_date = row[7];
    var familyabroad_date = Utilities.formatDate(family_abroad_date, 'JST', 'yyyy/MM/dd')
    var report_flag = row[12];

    if (familyabroad_date == remainddate){
      if(report_flag==""){
        var student_subject = "【manma】参加後レポートの提出のご確認";
        var student_message = student_name + "さま\n\n"
        + "お世話になっております、manmaです。\n\n"
        + "先日ご案内いたしましたフォームへのご記入をよろしくお願いいたします。\n"
        + "受家族留学は“家族留学の学び”をフォームにご記入いただいたのち、正式に終了とさせていただきますので、下記のフォームよりご記入くださいませ。\n"
        + "家族留学終了後は、参加者より受け入れてくださったご家族に、お礼のメールをお送りいただきたく思います。\n"
        + "行き違いで連絡をしていたら申し訳ございません。\n"
        + "▷▷▷ 参加後レポートフォームリンク\n"
        + "何卒よろしくお願いいたします。\n\n"
        + "manma";
        GmailApp.sendEmail(student_mail,student_subject,student_message,
                           {
                             name: 'manma'
                           }
                          );
      }
    }
  }
}
