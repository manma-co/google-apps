function notificate_report_Function(){
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
  var nextDateTime = remaind_time + (60*60*24*1000) * 0;
  var remaind_date = new Date(nextDateTime);
  var remainddate = Utilities.formatDate(remaind_date, 'JST', 'yyyy/MM/dd');
 
  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);
 
  var data = dataRange.getValues();
  
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var student_name = row[2];
    var student_mail = row[3];
    var family_name = row[4];
    var construction = row[5];
    var family_mail = row[6];
    var family_abroad_date = row[7];
    var family_abroad_dateTime = row[8];
    var meeting_location = row[9];
    var familyabroad_date = Utilities.formatDate(family_abroad_date, 'JST', 'yyyy/MM/dd')
    var familyabroad_dateTime = Utilities.formatDate(family_abroad_dateTime, 'JST', 'HH:mm')
 
    if (familyabroad_date == remainddate){
    	var student_subject = "【manma】家族留学にご参加くださりありがとうございました";
        var student_message = student_name + "さま\n\n"
        + "お世話になっております、manmaです。\n\n"
        + "今回の家族留学はいかがしたか?\n"
        + "受け入れ家庭のご家族と、充実した時間を過ごしていただけましたら嬉しく思います。\n"
        + "家族留学終了後は、参加者より受け入れてくださったご家族に、お礼のメールをお送りいただきたく思います。◆\n"
        + "また、その際には【info@manma.co】をccにいれ、当日撮られたお写真がありましたら添付していただけますと幸いです。\n\n"
        + "以下、参考までに、テンプレートをご用意しております。\n\n"
        + "---------------------------テンプレート-----------------------------\n"
        + "〈受け入れ家庭〉様\n\n"
        + "本日家族留学でお世話になりました、○○です。\n"  
        + "今回は、家族留学を受け入れていただき、ありがとうございました。\n"
        + "〈受け入れ家庭〉様のお話の中でも、〈学び〉のお話が印象的で、大変勉強になりました。\n\n"
        + "貴重なご家族とのお時間にご一緒させていただきましたこと、心より御礼申し上げます。\n\n"
        + "〈受け入れ家庭〉様とご家族のますますのご健勝とご多幸をお祈りいたします。\n\n"
        + "〈自署〉\n"
        + "---------------------------------------------------------------------------\n\n"
        + "また、家族留学は“家族留学の学び”をフォームにご記入いただいたのち、正式に終了とさせていただきます。\n"
        + "下記のフォームより、ご記入くださいませ\n"
        + "3分ほどで記入が終わりますので、お早めのご執筆をお願いいたします。\n"
        + "（回答期限は一週間以内となります。）\n"
        + "▷▷▷ 参加後レポートフォームリンク\n"
        + "何卒よろしくお願いいたします。\n\n"
        + "ご報告をお待ちしております！\n\n"
        + "manma";
        
        var family_subject = "【manma】家族留学受け入れのお礼";
        var family_message = family_name+ "様\n\n"
        + "お世話になっております、manma 家族留学事務局です。\n"
        + "今回は留学生を受け入れてくださり、本当にありがとうございました！\n\n"
        + "家族留学はいかがでしたでしょうか。\n"
        + "ご家庭のみなさまにとっても、楽しい時間となっておりましたら嬉しく思います。\n\n"
        + "引き続き、家族留学およびmanmaをよろしくお願いいたします。\n\n"
        + "manma";

        GmailApp.sendEmail(student_mail,student_subject,student_message,
        {
        	name: 'manma'
        }
        );

        GmailApp.sendEmail(family_mail,family_subject,family_message,
        {
        	name: 'manma'
        }
        );
    }
  }
}