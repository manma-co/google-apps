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
  var title2 = 'お問い合わせありがとうございます';
  var content2 = username + '様\n\nこの度はお問い合わせいただきありがとうございます。\n'
    + 'のちほど担当者よりご連絡させていただきますので、いましばらくお待ちください。\n'
    + '宜しくお願いいたします。\n\n'
    + '※このメールはお問い合わせをいただいた方に自動送信されます。\n\n'
    + '株式会社●●●●　オンラインショップ\n'
    + 'TEL 123-456-7890\n'
    + '定休日：土・日・祝日';
  GmailApp.sendEmail(mail, title2, content2);
}
