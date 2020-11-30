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
}
