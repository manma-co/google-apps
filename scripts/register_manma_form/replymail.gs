function submit_Form(e){
  var itemResponses = e.response.getItemResponses();
  var message = '';
  var date = '';
  
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var question = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    if (question == 'manma担当者名'){
      var account_name = answer;
    }
    if (question == 'manma担当者名'){
      var account_mail = answer;
    }
    if (question == '参加学生名'){
      var student_name  = answer;
    }
    if (question == '参加学生の所属（大学名）'){
      var student_college  = answer;
    }
    if (question == '参加動機'){
      var motivation = answer;
    }
    if (question == '参加学生アドレス'){
      var student_mail  = answer;
    }
    if (question == '希望家庭氏名'){
      var family_name  = answer;
    }
    if (question == '希望家庭アドレス'){
      var family_mail  = answer;
    }
    if (question == '希望日程'){
      var date  = answer;
    }
      
  //自動送信向けメール設定  
  var subject = "家族留学にご登録いただきありがとうございます";
    
  //登録者向け本文
  var body  = family_name + "様\n\n"
  + "こんにちは。お世話になっております。\n"
  + "家族留学を運営しております、manmaの"+account_name+"と申します。\n\n"
  + "今回は家族留学の受け入れについて、ご相談がありご連絡いたしました。\n\n"
  + "登録していただいている学生の方で、\n"
  + "ぜひ"+family_name+"さまのご家庭に留学してみたいという方がいらっしゃいます。\n\n"
  + "■参加希望者プロフィール\n"
  + "氏名:"+ student_name + "\n"
  + "所属:"+ student_college + "\n"
  + "参加動機:"+ motivation + "\n"
  + family_name +"さまのご都合がよろしければ、ぜひ受け入れていただけますと嬉しく思います。\n\n"
  + "【候補日】\n"
  + date + "\n\n"
  + "受け入れの可否を、大変恐縮ですが1週間以内にこちらのフォームよりご回答いただけましたら幸いです。\n"
  + "▷▷▷ 実施予定フォームリンク\n"
  + "氏名:"+ student_name + "\n"
  + "参加者連絡先："+student_mail+"\n"
  + "上記をコピー&ペーストし、必要事項とあわせてご入力いただけたらと思います。\n\n"
  + "突然のお願いで申し訳ございませんが、ご検討いただけましたら嬉しく存じます。\n"
  + "どうぞよろしくお願いいたします。\n\n"
  + "manma"
}

var to_mail = family_mail + ',' + account_mail

//登録者向け
GmailApp.sendEmail(to_mail,subject,body,
{
  name: account_name
}
);
}
