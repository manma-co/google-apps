function family_to_student_mail_Function(){
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var lastRow = sheet.getLastRow() - 1 ;
  var lastCol = sheet.getLastColumn();
  var remainddate = ""
  var now_date = new Date();
  var year = now_date.getFullYear();  
  var month = now_date.getMonth() + 1;  
  var day = now_date.getDate();  

  var nowdate = Utilities.formatDate( now_date, 'JST', 'yyyy/MM/dd'); 
  
  var remaind_time = new Date(year,month-1,day).getTime();
  var nextDateTime = remaind_time + (60*60*24*1000) * 3;
  var remaind_date = new Date(nextDateTime);
  var remainddate = Utilities.formatDate(remaind_date, 'JST', 'yyyy/MM/dd');
 
  var alrert_message = "";
  var alrert_mail_flag = 0;
  var warning_message = "";
  var warning_mail_flag = 0;

  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);
 
  var data = dataRange.getValues();

  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var meeting_date = row[25];
    if (meeting_date == ""){
      var register_date = row[0];
      var date_check = remaind_time - (60*60*24*1000) * 3;
      if (date_check > register_date) {  
         alrert_mail_flag = 1 ;
         alrert_message = remaind_date + alrert_message + row[1] + "\n"; 
       }
    }
    else if (meeting_date == "4月以降"){
      warning_mail_flag = 1;
    }
    else{
      var meetingdate = Utilities.formatDate(meeting_date, 'JST', 'yyyy/MM/dd');
      if (remainddate == meetingdate ){
        var subject = "test";
        var message = ""
        var remind_mail = 'hidemasuoka112@gmail.com'
        GmailApp.sendEmail(remind_mail,subject,message,
                           {
                             name: 'manma'
                          }
                          );
    }
  }
  }
  }

}


