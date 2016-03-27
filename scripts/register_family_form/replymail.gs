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
    message += (i + 1).toString() + '. ' + question + ': ' + answer + '\n';
  }
  var address = '☆あなたのGmailアドレスを記入☆';
  var title = 'お問い合わせフォームが送信されました';
  var content = '以下の内容でフォームが送信されました。\n\n' + message;
  GmailApp.sendEmail(address, title, content);
  var title2 = '家族留学にご登録いただきありがとうございます';
  var content2 = username + '様\n\nこの度は、家族留学への登録ありがとうございます。\n\n'
    + '家族留学は、女子大生が子育て家庭に\n'
    + '１日お邪魔させていただき、将来の生き方について考える企画です。\n\n'
    + ' 毎月１日頃に、翌月の家族留学の受け入れ家庭募集を\n'
    + '家族留学は、女子大生が子育て家庭に\n'
    + 'ご登録いただいたメールアドレスにお送りさせていただきます。\n\n'
    + '受け入れ可能日時を入力し、ご返信いただければと思います。\n\n'
    + '次回募集開始まで、もうしばらくお待ちいただけましたら幸いです。\n'
    + 'また、家族留学の詳細につきましては\n'
    + '資料を添付いたしましたので、ぜひご覧ください。\n\n'
    + 'ご質問などお気軽に ogo@manma.co（尾郷）へご連絡くださいませ。\n\n'
    + 'どうぞよろしくお願いいたします。\n'
    
  GmailApp.sendEmail(mail, title2, content2);
}