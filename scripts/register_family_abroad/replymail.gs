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
    if (question == '受け入れ家庭の連絡先①'){
      apply_mail  = answer;
    }
    message += (i + 1).toString() + '. ' + question + ': ' + answer + '\n';
  }

  //manmaメンバー向けメール設定  
  var manma_mail = "hidemasuoka112@gmail.com";
  var self_subject  = "受入家庭から連絡がありました";
  var self_body  = "以下の内容でフォームが送信されました。\n\n" + message;
  
  //自動送信向けメール設定  
  var subject = "受け入れのご登録いただきありがとうございます";
  var body  = "ご登録ありがとうございます\n\n"
  + message
  + "\n"
  + "以上の内容を修正したい場合は、info@manma.co までご連絡ください";
  
   //manmaメンバー向け
    GmailApp.sendEmail(
      manma_mail,
      self_subject,
      self_body,
      {
        name: 'manma登録連絡'
      }
      );

   //登録者向け
    GmailApp.sendEmail(
      apply_mail,
      subject,
      body,
      {
        name: 'manma'
      }
    );
}