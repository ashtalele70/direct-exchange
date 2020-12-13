package edu.sjsu.directexchange.util;

import edu.sjsu.directexchange.model.User;
import org.springframework.beans.factory.annotation.Value;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailUtil {

  static String host="smtp.gmail.com";

  static String transactionMessage = "Your offer has been accepted by other " +
    "user. Please approve within 10\n" +
    "minutes. Please process to pay. Otherwise the transaction will be " +
    "aborted.";

  static String counterMessageOwner = "Your offer has been countered by " +
    "the other" +
    " user." +
    " " +
    "Please " +
    "approve within 5\n" +
    "minutes. Please review.";

  static String counterMessageCounter = "Your offer has been created and " +
    "notified to the owner. If the owner does not accept/reject it, it will " +
    "expire in 5 minutes." +
    "";

  static String counterSubjectOwner = "Counter offer created for your offer";
  static String counterSubjectCounter = "Counter offer created and the owner " +
    "is " +
    "notified";

  static String notification = "DirectExchange: Message regarding your offer";
  static String transactionCompletion = "DirectExchange: Money Transfer " +
    "Successful";
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
      } catch (MessagingException mex) {
        mex.printStackTrace();
      }

  }


  public static void sendEmailCounterOwner(User user) {
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
      message.setSubject(counterSubjectOwner);

      // Send the actual HTML message, as big as you like
      message.setContent("<h4>Hello " + user.getNickname() + "</h4><br/><br" +
        "/>" + counterMessageOwner + " <br/><br/> Thanks, <br/> Your " +
        "Direct Exchange Team", "text/html");

      // Send message
      Transport.send(message);
    } catch (MessagingException mex) {
      mex.printStackTrace();
    }

  }

  public static void sendEmailCounterCounter(User user) {
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
      message.setSubject(counterSubjectCounter);

      // Send the actual HTML message, as big as you like
      message.setContent("<h4>Hello " + user.getNickname() + "</h4><br/><br" +
        "/>" + counterMessageCounter + " <br/><br/> Thanks, <br/> Your " +
        "Direct Exchange Team", "text/html");

      // Send message
      Transport.send(message);
    } catch (MessagingException mex) {
      mex.printStackTrace();
    }

  }

  public static void sendMessage(String username, String message1) {

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
        new InternetAddress(username));
      message.addRecipient(Message.RecipientType.CC,
        new InternetAddress(cc));

      // Set Subject: header field
      message.setSubject(notification);

      // Send the actual HTML message, as big as you like
      message.setContent("<p>" + message1 + "</p>", "text/html");

      // Send message
      Transport.send(message);
    } catch (MessagingException mex) {
      mex.printStackTrace();
    }
  }

  public static void sendCompleteTransaction(String username, String message1) {
    System.out.println("Called for username : " + username);
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
        new InternetAddress(username));
      message.addRecipient(Message.RecipientType.CC,
        new InternetAddress(cc));

      // Set Subject: header field
      message.setSubject(transactionCompletion);

      // Send the actual HTML message, as big as you like
      message.setContent(message1, "text/html");

      // Send message
      Transport.send(message);
    } catch (MessagingException mex) {
      mex.printStackTrace();
    }
  }
}
