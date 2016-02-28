function submitForm(e){
  var itemResponses = e.response.getItemResponses();
  var message = '';
  var apply_name = '';
  var apply_mail = '';
  var date = '';
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var question = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    if (question == '氏名'){
      apply_name = answer;
    }
    if (question == 'メールアドレス'){
      apply_mail  = answer;
    }
    if (question == '3月　事前説明会兼カウンセリング　希望日程'){
      date = answer;
    }
    message += (i + 1).toString() + '. ' + question + ': ' + answer + '\n';
  }
  var manma_mail = "☆あなたのGmailアドレスを記入☆";
  var self_title = "お問い合わせフォームが送信されました";
  var self_body  = "以下の内容でフォームが送信されました。\n\n" + message;
  GmailApp.sendEmail(
    manma_mail,
    self_title,
    self_body,
    {
     name: 'manma'
   }
   );

  var title = "家族留学にご登録いただきありがとうございます";
  var body  = apply_name + "様\n\nこの度は、家族留学への登録ありがとうございます。\n"
    + apply_name + "の事前説明会は、以下の日程で行いますので、\n"
    + "ご予定を空けておいていただけますと幸いです。\n\n"
    + date + "\n\n"
    + "当日は、オンラインにて家族留学の事前説明会を行い、\n"
    + "みなさまのご希望にあわせたご家庭への留学をご提案する流れとなっております。\n\n"
    + "appear.in　"
    + "こちらのリンクを押していただきますと、オンラインでの通話が開始されますので、\n"
    + "当日はこちらよりご参加ください。\n\n"
    + "また、何かご不明な点がございましたら\n"
    + "info@manma.coまでご連絡いただければと思います。。\n\n"
    + "皆様とお話できますことを心よりお待ちしております。\n\n"
    + "manma"
    
  GmailApp.sendEmail(
    apply_mail,
    title,
    body,
    {
     name: 'manma'
   }
   );
}
