// updated_at: 20161017
// edited by: shinocchi
function remaind_schedule_Function(){
  var MAM_COLUMN = {
    CAN_FAMILY_ABROAD:      1,  // B1: このたびの家族留学のご依頼を受け入れていただけますでしょうか。
    STUDENT_NAME:           2,  // C1: 参加学生名
    STUDENT_EMAIL:          3,  // D1: 参加学生の連絡先
    FAMILY_NAME:            4,  // E1: 受け入れ家庭のお名前
    FAMILY_CONSTRUCTION:    5,  // F1: 受け入れ家庭の家族構成
    FAMILY_MAIL:            6,  // G1: 受け入れ家庭のご連絡先
    START_DATE:             7,  // H1: 実施日時
    START_TIME:             8,  // I1: 実施開始時間
    MTG_PLACE:              9,  // J1: 集合場所
    FINISH_TIME:           13,  // N1: 実施終了時間
    MAM_CHECK:             15,  // P1: manmaチェック欄 (登録を確認したら◯をつける．何かしら文字列が入力されていればトリガーによってメールが送信される）
    IS_EMAIL_SENT:         16,  // Q1: sent欄 (メールがトリガーによって送信された場合に今日の日付が入ります)
    MAM_REPLY_CHECK:       17,  // R1: manma返信確認（確認をしたら◯をつける．何かしら文字列が入力されていればトリガーによってメールが送信される）
    IS_CONFIRM_EMAIL_SENT: 18,  // S1: 実施sent欄 （メールがトリガーによって送信された場合に今日の日付が入ります）
  }
  var sheet = SpreadsheetApp.getActive().getSheetByName('フォームの回答') ;
  var startRow = 2;  // First row of data to process
  var lastRow = sheet.getLastRow() - 1 ;
  var lastCol = sheet.getLastColumn();
  var now_date = new Date();
  var year = now_date.getFullYear();
  var month = now_date.getMonth() + 1;
  var day = now_date.getDate();

  var nowdate = Utilities.formatDate(now_date, 'JST', 'yyyy/MM/dd');
  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);

  var data = dataRange.getValues();

  for (var i = 0; i < data.length; ++i) {
    /* 1行分のデータを取得してパース */
    var row = data[i];
    var status = row[MAM_COLUMN.CAN_FAMILY_ABROAD];
    var student_name = row[MAM_COLUMN.STUDENT_NAME];
    var student_mail = row[MAM_COLUMN.STUDENT_EMAIL];
    var abroad_start_date = row[MAM_COLUMN.START_DATE];
    var abroad_start_time = row[MAM_COLUMN.START_TIME];
    var abroad_finish_time = row[MAM_COLUMN.FINISH_TIME];      // N - 実施終了時間
    var abroad_place = row[MAM_COLUMN.MTG_PLACE];

    var sent_first_mail_date = row[MAM_COLUMN.IS_EMAIL_SENT];  // Q - sent欄
    var reply_check_flag = row[MAM_COLUMN.MAM_REPLY_CHECK];    // R - manma返信確認

    /* メール送信のvalidation開始 */
    if (status != "はい") {
      Logger.log(student_name + "_" + student_mail + ": 受け入れ不可のためメールは送信しない");
      continue;
    }

    if (sent_first_mail_date == "") {
      Logger.log(student_name + "_" + student_mail + ": リマインドメールが送信されていないので送信しない");
      continue;
    }

    //参加延期，参加不可となった場合に実施日時を空欄にするためメールは送信しない
    if (abroad_start_date == "") {
      Logger.log(student_name + "_" + student_mail + ": 実施日時が空欄のためメールは送信しない");
      continue;
    }

    if (reply_check_flag != "") {
      Logger.log(student_name + "_" + student_mail + ": 返信確認がされているためメールは送信しない");
      continue;
    }
    /* メール送信のvalidation終了 */

    // Date型に変換
    sent_first_mail_date = new Date(sent_first_mail_date);
    var first_alertmail_date = Utilities.formatDate((new Date((sent_first_mail_date.getTime()) + (60*60*24*1000) * 3)), 'JST', 'yyyy/MM/dd');
    var second_alertmail_date = Utilities.formatDate((new Date((sent_first_mail_date.getTime()) + (60*60*24*1000) * 5)), 'JST', 'yyyy/MM/dd');
    var last_alertmail_date = Utilities.formatDate((new Date((sent_first_mail_date.getTime()) + (60*60*24*1000) * 7)), 'JST', 'yyyy/MM/dd');

    // Date型に変換
    abroad_start_date = new Date(abroad_start_date);
    abroad_start_time = new Date(abroad_start_time);
    abroad_finish_time = new Date(abroad_start_time);
    var f_abroad_start_date = Utilities.formatDate(abroad_start_date, 'JST', 'yyyy/MM/dd');
    var f_abroad_start_time = Utilities.formatDate(abroad_start_time, 'JST' , 'HH:mm');
    var f_abroad_finish_time = Utilities.formatDate(abroad_finish_time, 'JST', 'HH:mm');

    if (first_alertmail_date == nowdate || second_alertmail_date == nowdate || last_alertmail_date == nowdate) {
      var title = '【再送:manma】家族留学実施日のお知らせ';
      var body  = student_name + "さま\n\n"
        + "先日は、事前説明会へのご参加ありがとうございました。\n"
        + "先日も送付しましたが家族留学の実施日が確定いたしましたので、ご連絡いたします。\n\n"
        + "【実施概要】\n"
        + "日時: "+ f_abroad_start_date + "\n"
        + "実施時間: "+ f_abroad_start_time + "\n"
        + "集合場所： "+ abroad_place + "\n"
        + "終了予定時間： "+ f_abroad_finish_time + "\n\n"
        + "上記の内容で受け入れていただけることになりましたので、ご確認くださいませ。 \n"
        + "参加の可否について、こちらのメールを確認次第すぐにご返信いただきますようお願いいたします。\n\n"
        + "どうぞよろしくお願いいたします。\n\n"
        + "manma";
      Logger.log(student_name + "_" + student_mail + ": メールが送信されました");
      GmailApp.sendEmail(student_mail, title, body, {name: 'manma'});
    } else {
      Logger.log(student_name + "_" + student_mail + "リマインド日以外のためメールは送信しない");
    }
  }
}