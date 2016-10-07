// 家族留学の詳細を学生と受け入れ家庭に連絡するscript
// updated_at: 20161007
// edited by: shinocchi
function remaind_family_abroad_Function() {
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
  var MANMA_MAIL = 'info.manma@gmail.com';

  // シート情報取得
  var sheet = SpreadsheetApp.getActive().getSheetByName('フォームの回答') ;
  var startRow = 2;  // First row of data to process
  var lastRow = sheet.getLastRow() - 1 ;
  var lastCol = sheet.getLastColumn();

  // 今日の日付をフォーマットして取得
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var f_today = Utilities.formatDate(today, 'JST', 'yyyy/MM/dd');

  var current_time_ms = new Date(year, month-1, day).getTime();              // 今日の日付のmsを取得
  var in_ten_days = new Date(current_time_ms + (60 * 60 * 24 * 1000) * 10);  // 今日から10日後
  var remainddate = Utilities.formatDate(in_ten_days, 'JST', 'yyyy/MM/dd');
  var EMAIL_SENT_DATE = today;

  var dataRange = sheet.getRange(startRow, 1, lastRow, lastCol);
  var data = dataRange.getValues();

  for (var i = 0; i < data.length; ++i) {
    var row = data[i];

    var status = row[MAM_COLUMN.CAN_FAMILY_ABROAD];
    var reply_check_flag = row[MAM_COLUMN.MAM_REPLY_CHECK];                // R - manma返信確認

    if (status == "いいえ" || reply_check_flag == "") {
      continue;
    }

    var student_name = row[MAM_COLUMN.STUDENT_NAME];                       // C - 参加学生氏名
    var student_mail = row[MAM_COLUMN.STUDENT_EMAIL];                      // D - 参加学生の連絡先
    var family_name = row[MAM_COLUMN.FAMILY_NAME];                         // E - 受け入れ家庭のお名前
    var construction = row[MAM_COLUMN.FAMILY_CONSTRUCTION];                // F - 受け入れ家庭の家族構成
    var family_mail = row[MAM_COLUMN.FAMILY_MAIL];                         // G - 受け入れ家庭のご連絡先
    var family_abroad_date = new Date(row[MAM_COLUMN.START_DATE]);         // H - 実施日時
    var family_abroad_datetime = new Date(row[MAM_COLUMN.START_TIME]);     // I - 実施開始時間
    var meeting_location = row[MAM_COLUMN.MTG_PLACE];                      // J - 集合場所
    var family_abroad_finish_time = new Date(row[MAM_COLUMN.FINISH_TIME]); // N - 実施終了時間

    var family_abroad_time = family_abroad_date.getTime();  // 家族留学実施日ms秒
    var f_family_abroad_date = Utilities.formatDate(family_abroad_date, 'JST', 'yyyy/MM/dd');
    var f_family_abroad_datetime = Utilities.formatDate(family_abroad_datetime, 'JST', 'HH:mm');
    var f_family_abroad_finish_time = Utilities.formatDate(family_abroad_finish_time, 'JST', 'HH:mm');

    // 日付算: new Date(0) = 1970/01/01
    var diff_abroad_current = family_abroad_time - current_time_ms;   // 家族留学実施日のms秒 - 今日の日付のms秒
    var diff_in_ten_days_abroad = in_ten_days - family_abroad_time;   // 今日から10日後のms秒 - 家族留学実施の日付のms秒
    var check_mail_status = row[MAM_COLUMN.IS_CONFIRM_EMAIL_SENT];    // S - 実施sent欄

    if (check_mail_status != "") { // メールは送信済みか？
      // Logger.log("メールが送信されている記録があるため通知しない");
      continue;
    }
    if (diff_in_ten_days_abroad < 0) {
      // Logger.log("家族留学実施より10日よりも前なので通知しない");
      continue;
    }
    if (diff_abroad_current <= 0) {
      // Logger.log("家族留学が終了しているため通知しない");
      continue;
    }

    var mail = family_mail + "," + student_mail + "," + ""
      var subject = "【manma】家族留学当日のお知らせ";
    var message = "受け入れ家庭\n"
      + family_name + "さま\n\n"
      + "留学生\n"
      + student_name + "さま\n\n"
      + "お世話になっております。"
      + "家族留学実施日が近づいてまいりましたので、\n\n"
      + "manmaより、当日についてご連絡いたします。\n\n"
      + "◆家族留学実施概要◆\n"
      + "実施日："+f_family_abroad_date+"\n"
      + "集合時間："+f_family_abroad_datetime+"\n"
      + "集合場所："+meeting_location+"\n"
      + "終了予定時間：" + f_family_abroad_finish_time + "\n"
      + "参加大学生："+student_name+"さん\n"
      + "ご家族構成："+construction+"\n"
      + "緊急連絡先：\n"
      + "info.manma@gmail.com（manmaメール）\n\n"
      + "またお手数ですが、下記の項目について\n"
      + "こちらのメールに【全員に返信】していただく形で\n"
      + "みなさま簡単に自己紹介と、緊急連絡先をお伝えください。（＊③、④は参加者のみ）\n\n"
      + "①自己紹介 \n"
      + "→現在の所属、将来に対するイメージ（職種やキャリア、結婚、働き方など）\n"
      + "②緊急連絡先（携帯番号）\n"
      + "③家族留学の目標\n"
      + "（例：子供への接し方を学ぶこと、自分の将来の生活のヒントを得ること、◯◯さまご一家と仲良くなること など）\n"
      + "④聞いてみたいこと3つ\n"
      + "ご自身のキャリアプランへの不安をもとにお考えください\n"
      + "（例：結婚・出産のタイミング、両立のコツ、育児で大切にしていること）\n"
      + "体験してみたいことがございましたら、ぜひ積極的にお伝えください！\n"
      + "また、ご家庭のみなさまは、参加者からの質問にメールにて事前にお答えいただけますと幸いです。\n\n"
      + "＊その他注意事項＊\n"
      + "・当日合流された場合は、こちらのメールに返信する形でご一報くださいませ。\n"
      + "特に解散時には、学生のみなさんより学んだこと3つと当日の写真を添付してmanmaにご連絡していただきますようお願いいたします。\n"
      + "manmaにメールを送信したことを確認したのち、帰宅されてください。\n"
      + "・学生のみなさまには実施日翌日に、ご家庭へのお礼・感想メールをお送りいただくようにお願いしております。下記の項目について、必ずお送りください。\n\n"
      + "---------------------------テンプレート-----------------------------\n\n"
      + "〈受け入れ家庭〉様\n\n"
      + "〈留学生氏名〉\n\n"
      + "〈家族留学を通してきづいたことや学び〉\n"
      + "*箇条書きでも構いません\n\n"
      + "〈家族留学を通じて変わったこと、変わらなかったことなど感想〉\n"
      + "*箇条書きでも構いません\n"
      + "------------------------------------------------------------------------\n\n"
      + "・受け入れ家庭の皆さまには、家族留学後に簡単なアンケートへのご協力をお願いしております。\n"
      + "実施日当日の夜に再度メールでご連絡いたしますので、翌日までにご回答いただけますと幸いです。\n"
      + "▷▷▷ https://docs.google.com/forms/d/1ifAZFTc-xn1cCBB-GmZMMJi6yBcBmypl06RBFBZ1U6A/edit\n\n"
      + "・家族留学のやりとりには、必ず【info.manma@gmail.com】を\n"
      + "ccに入れていただきますようお願いいたします。\n\n"
      + "当日の集合場所や時間、スケジュールに関するご相談なども、\n"
      + "ぜひこちらのメールをご活用ください。\n\n"
      + "当日、よりキャリアや子育てについてのお話をする時間を確保するため、\n"
      + "メールを通して自己紹介等などのコミュニケーションを図っていただければと思います。\n\n"
      + "ご不明な点などございましたら、お気軽にお問い合わせください。\n\n"
      + "当日の家族留学が素敵な時間になりますように\n"
      + "サポートさせていただけたらと思います。\n\n"
      + "どうぞ宜しくお願い致します！\n\n"
      + "manma";

    // ccにinfo.manma@gmail.comを追加
    GmailApp.sendEmail(mail, subject, message, { name: 'manma', cc: MANMA_MAIL });
    // S1: 実施sent欄に送信した日付を入力
    sheet.getRange(startRow + i, MAM_COLUMN.IS_CONFIRM_EMAIL_SENT + 1).setValue(EMAIL_SENT_DATE);

    // Make sure the cell is updated right away in case the script is interrupted
    SpreadsheetApp.flush();

  }
}

