function submitForm(e){
  var itemResponses = e.response.getItemResponses();
  var message = '';
  var username = '';
  var mail = '';
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var question = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    if (question == '氏名'){
      username = answer;
    }
    if (question == 'メールアドレス'){
      mail = answer;
    }
    if (question == '3月　事前説明会兼カウンセリング　希望日程'){
      date = answer;
    }
    message += (i + 1).toString() + '. ' + question + ': ' + answer + '\n';
  }
  var address    = '☆あなたのGmailアドレスを記入☆';
  var self_title = 'お問い合わせフォームが送信されました';
  var self_body  = '以下の内容でフォームが送信されました。\n\n' + message;
  GmailApp.sendEmail(
    address, self_title, self_body,{
     name: 'manma'
 });
  var title = '家族留学にご登録いただきありがとうございます';
  var body  = username + '様\n\nこの度は、家族留学への登録ありがとうございます。\n\n'
    + username + 'の事前説明会は、'+ date'日程で行いますので、\n'
    + 'ご予定を空けておいていただけますと幸いです。\n\n'
    + '当日は、オンラインにて家族留学の事前説明会を行い、\n'
    + 'みなさまのご希望にあわせたご家庭への留学をご提案する流れとなっております。\n'
    + '家族留学は、女子大生が子育て家庭に\n'
    + 'ご登録いただいたメールアドレスにお送りさせていただきます。\n\n'
    + '受け入れ可能日時を入力し、ご返信いただければと思います。\n\n'
    + '次回募集開始まで、もうしばらくお待ちいただけましたら幸いです。\n'
    + 'また、家族留学の詳細につきましては\n'
    + '資料を添付いたしましたので、ぜひご覧ください。\n\n'
    + 'ご質問などお気軽に ogo@manma.co（尾郷）へご連絡くださいませ。\n\n'
    + 'どうぞよろしくお願いいたします。\n'
    
  GmailApp.sendEmail(
    mail, title, body,{
     name: 'manma'
 });
}
