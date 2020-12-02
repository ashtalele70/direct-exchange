package edu.sjsu.directexchange.model;

import javax.persistence.*;

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
  private String transaction_currency;

  @Column
  private String transaction_status;

  @Column
  private int source_bank_id;

  @Column
  private int destination_bank_id;
  
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

public String getTransaction_currency() {
	return transaction_currency;
}

public void setTransaction_currency(String transaction_currency) {
	this.transaction_currency = transaction_currency;
}

public String getTransaction_status() {
	return transaction_status;
}

public void setTransaction_status(String transaction_status) {
	this.transaction_status = transaction_status;
}

public int getSource_bank_id() {
	return source_bank_id;
}

public void setSource_bank_id(int source_bank_id) {
	this.source_bank_id = source_bank_id;
}

public int getDestination_bank_id() {
	return destination_bank_id;
}

public void setDestination_bank_id(int destination_bank_id) {
	this.destination_bank_id = destination_bank_id;
}
}
