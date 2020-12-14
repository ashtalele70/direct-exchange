package edu.sjsu.directexchange.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "transaction")
public class Transaction {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private int id;

  @Column
  private String match_uuid;

  @Column
  private int user_id;

  @Column
  private int offer_id;

  @Column
  private float remit_amount;

  @Column
  private String source_currency;

  @Column
  private String destination_currency;


  @Column
  private int transaction_status;
  
  @Column
  private String transaction_date= new SimpleDateFormat("MM-dd-yyyy HH:mm:SS").format(new Date());


//  @Column
//  private int destination_bank_id;

  //This is a transient field used for send
  @Transient
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "user",
    "ratings"})
  private List<User> listOfOtherParties;


  @OneToOne
  @JoinColumn(name = "offer_id", referencedColumnName = "id", insertable = false, updatable = false)
  private Offer offer;

  @OneToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
  private User user;

  public String getTransaction_date() {
	  return transaction_date;
  }

  public void setTransaction_date(String transaction_date) {
    this.transaction_date = transaction_date;
  }

  public float getService_fee() {
    return service_fee;
  }

  public void setService_fee(float service_fee) {
    this.service_fee = service_fee;
  }

  @Column
    private float service_fee;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getMatch_uuid() {
    return match_uuid;
  }

  public void setMatch_uuid(String match_uuid) {
    this.match_uuid = match_uuid;
  }

  public int getUser_id() {
    return user_id;
  }

  public void setUser_id(int user_id) {
    this.user_id = user_id;
  }

  public int getOffer_id() {
    return offer_id;
  }

  public void setOffer_id(int offer_id) {
    this.offer_id = offer_id;
  }

  public float getRemit_amount() {
    return remit_amount;
  }

  public void setRemit_amount(float remit_amount) {
    this.remit_amount = remit_amount;
  }

  public String getSource_currency() {
    return source_currency;
  }

  public void setSource_currency(String source_currency) {
    this.source_currency = source_currency;
  }

  public String getDestination_currency() {
    return destination_currency;
  }

  public void setDestination_currency(String destination_currency) {
    this.destination_currency = destination_currency;
  }

  public int getTransaction_status() {
    return transaction_status;
  }

  public void setTransaction_status(int transaction_status) {
    this.transaction_status = transaction_status;
  }

  public List<User> getListOfOtherParties() {
    return listOfOtherParties;
  }

  public void setListOfOtherParties(List<User> user) {
      this.listOfOtherParties = new ArrayList<>(user);
  }

  public Offer getOffer() {
    return offer;
  }

  public void setOffer(Offer offer) {
    this.offer = offer;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

//public int getSource_bank_id() {
//	return source_bank_id;
//}
//
//public void setSource_bank_id(int source_bank_id) {
//	this.source_bank_id = source_bank_id;
//}
//
//public int getDestination_bank_id() {
//	return destination_bank_id;
//}
//
//public void setDestination_bank_id(int destination_bank_id) {
//	this.destination_bank_id = destination_bank_id;
//}
  public static class Message{
    public String getUsername() {
      return username;
    }

    public void setUsername(String username) {
      this.username = username;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }

    String username;
    String message;

    }
}
