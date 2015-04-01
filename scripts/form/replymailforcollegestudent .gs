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
  GmailApp.sendEmail(
    address, title, content,{
     name: 'manma'
 });
  var title2 = '家族留学にご登録いただきありがとうございます';
  var content2 = username + '様\n\nこの度は家族留学にご登録いただきましてありがとうございます。\n\n'
    + 'manmaから毎月１０日頃に、\n'
    + '翌月の家族留学の実施日程をお送りさせていただきますので\n'
    + ' 参加可能な日程を選び、ご返信いただく流れとなっております。\n\n'
    + '次回の募集開始まで、もうしばらくお待ちください。\n\n'
    + 'また、何かご不明な点がございましたら\n'
    + 'aoki@manma.co （担当：青木）までご連絡ください。\n\n'
    + '皆様のご参加、心よりお待ちしております。\n\n'
    
  GmailApp.sendEmail(
    mail, title2, content2,{
     name: 'manma'
 });
}
