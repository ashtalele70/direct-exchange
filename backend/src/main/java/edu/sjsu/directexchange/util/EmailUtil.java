package edu.sjsu.directexchange.util;

import edu.sjsu.directexchange.model.User;
import org.springframework.beans.factory.annotation.Value;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailUtil {

  static String host="smtp.gmail.com";

  static String transactionMessage = "Your offer has accepted by other user. Please approve within 10\n" +
    "minutes. Otherwise the transaction will be aborted.";

  static String transactionSubject = "Your transfer offer is accepted";

  static String senderEmailId = "directexchange275@gmail.com";

  static String emailAuth = "true";

  static String password = "cmpe275@123";

  static String port = "587";

  static String cc = "ashtalele70@gmail.com";

  public static void sendEmail(User user) {
      Properties properties = new Properties();
      // Setup mail server
      properties.put("mail.smtp.auth", emailAuth);
      properties.put("mail.smtp.host", host);
      properties.put("mail.smtp.port", port);
      properties.put("mail.smtp.starttls.enable", emailAuth);
      // Get the default Session object.
      Session session = Session.getDefaultInstance(properties, new Authenticator() {
        @Override
        protected PasswordAuthentication getPasswordAuthentication() {
          return new PasswordAuthentication(senderEmailId, password);
        }
      });

      try {
        // Create a default MimeMessage object.
        MimeMessage message = new MimeMessage(session);

        // Set From: header field of the header.
        message.setFrom(new InternetAddress(senderEmailId));

        // Set To: header field of the header.
        message.addRecipient(Message.RecipientType.TO,
          new InternetAddress(user.getUsername()));
			message.addRecipient(Message.RecipientType.CC,
				new InternetAddress(cc));

        // Set Subject: header field
        message.setSubject(transactionSubject);

        // Send the actual HTML message, as big as you like
        message.setContent("<h4>Hello " + user.getNickname() + "</h4><br/><br" +
          "/>" + transactionMessage + " <br/><br/> Thanks, <br/> Your " +
          "Direct Exchange Team", "text/html");

        // Send message
        Transport.send(message);
        System.out.println("Sent message successfully....");
      } catch (MessagingException mex) {
        mex.printStackTrace();
      }

  }
}
