function Remind_Meeting_Function(){
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
  var nextDateTime = remaind_time + (60*60*24*1000) * 1;
  var remaind_date = new Date(nextDateTime);
  var remainddate = Utilities.formatDate(remaind_date, 'JST', 'yyyy/MM/dd');
 
  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);
 
  var data = dataRange.getValues();

  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var meeting_date = row[25];
    if (meeting_date !== ""){
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


