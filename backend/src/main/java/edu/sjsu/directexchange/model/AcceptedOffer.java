package edu.sjsu.directexchange.model;

import javax.persistence.*;

@Entity
@Table(name = "accepted_offers")
public class AcceptedOffer {

  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
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
  private String currency;

  public AcceptedOffer (){}

  public AcceptedOffer(String match_uuid, int user_id, int offer_id, float remit_amount, String currency) {
    this.match_uuid = match_uuid;
    this.user_id = user_id;
    this.offer_id = offer_id;
    this.remit_amount = remit_amount;
    this.currency = currency;
  }

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

  public String getCurrency() {
    return currency;
  }

  public void setCurrency(String currency) {
    this.currency = currency;
  }
}