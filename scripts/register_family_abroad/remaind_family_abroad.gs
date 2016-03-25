function remaind_family_abroad_Function(){
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
  var nextDateTime = remaind_time + (60*60*24*1000) * 1;
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
    	var mail = family_mail + "," + student_mail + "," + ""
    	var subject = "【manma】家族留学実施リマインド";
        var message = "受け入れ家庭\n"
        + family_name+ "さま\n\n"
        + "留学生\n"
        + student_name + "さま\n\n"
        + "お世話になっております。"
        + "家族留学実施日が近づいてまいりましたので、\n\n"
        + "manmaより、当日についてご連絡いたします。\n\n"
        + "◆家族留学実施概要◆\n"
        + "実施日："+familyabroad_date+"\n"
        + "実施時間："+familyabroad_dateTime+"\n"
        + "集合場所："+meeting_location+"\n"
        + "参加大学生："+student_name+"さん\n"
        + "ご家族構成："+construction+"\n"
        + "緊急連絡先：\n"  
        + "info@manma.co（manmaメール）\n\n"
        + "またお手数ですが、こちらのメールに\n"  
        + "【ccにinfo@manma.coを含む全員にご返信いただく形で】\n"  
        + "みなさま簡単に自己紹介と、緊急連絡先をお伝えください。\n\n"  
        + student_name + "さまには加えて\n"
        + "・家族留学の目標1つ\n"  
        + "・聞いてみたいこと3つ\n"  
        + "①自己紹介\n"
        + "②緊急連絡先（携帯番号）\n"
        + "③家族留学の目標1つ、聞いてみたいこと3つ\n\n"
        + "＊その他注意事項＊\n"
        + "当日合流された場合は、こちらのメールに返信する形でご一報くださいませ。\n"
        + "当日の集合場所や時間、スケジュールに関するご相談なども、\n"
        + "ぜひこちらのメールをご活用ください。\n\n"
        + "ご不明な点などございましたら、お気軽にお問い合わせください。\n\n"
        + "当日の家族留学が素敵な時間になりますように\n"
        + "サポートさせていただけたらと思います。\n\n"
        + "どうぞ宜しくお願い致します！\n\n"
        + "manma";
        
        GmailApp.sendEmail(mail,subject,message,
        {
        	name: 'manma'
        }
        );
    }
  }
}