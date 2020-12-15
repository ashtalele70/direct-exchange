package edu.sjsu.directexchange.model;

import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "offer")
public class Offer {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private int user_id;

	@Transient
	private String nickname;
	
	@Transient
	private String email;

	public Offer (){

	}

  public Offer(Offer offer) {
  	this.user_id = offer.getUser_id();
  	this.source_country = offer.getSource_country();
  	this.source_currency = offer.getSource_currency();
  	this.remit_amount = offer.getRemit_amount();
  	this.destination_country = offer.getDestination_country();
  	this.destination_currency = offer.getDestination_currency();
  	this.exchange_rate = offer.getExchange_rate();
  	this.expiration_date = offer.getExpiration_date();
  	this.allow_counter_offer = offer.getAllow_counter_offer();
  	this.allow_split_offer = offer.getAllow_split_offer();
  	this.offer_status = offer.getOffer_status();
  	this.is_counter = offer.getIs_counter();
  }

  public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column
	private String source_country;
	
	@Column
	private String source_currency;
	

	@Column(precision = 5, scale = 4)
	private float remit_amount;
	
	@Column
	private String destination_country;
	
	@Column
	private String destination_currency;
	
	@Column
	private float exchange_rate;
	
	@Column
	private Date expiration_date;	
	
	@Column
	private int allow_counter_offer;
	
	@Column
	private int allow_split_offer;
	
	@Column
	private int offer_status;
	
	@Column
	private	int is_counter;
	
	@Transient
	private List<Reputation> ratings;
	
	@Transient
	private float rating;

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getSource_country() {
		return source_country;
	}

	public void setSource_country(String source_country) {
		this.source_country = source_country;
	}

	public String getSource_currency() {
		return source_currency;
	}

	public void setSource_currency(String source_currency) {
		this.source_currency = source_currency;
	}

	public float getRemit_amount() {
		return remit_amount;
	}

	public void setRemit_amount(float remit_amount) {
		this.remit_amount = remit_amount;
	}

	public String getDestination_country() {
		return destination_country;
	}

	public void setDestination_country(String destination_country) {
		this.destination_country = destination_country;
	}

	public String getDestination_currency() {
		return destination_currency;
	}

	public void setDestination_currency(String destination_currency) {
		this.destination_currency = destination_currency;
	}

	public float getExchange_rate() {
		return exchange_rate;
	}

	public void setExchange_rate(float exchange_rate) {
		this.exchange_rate = exchange_rate;
	}

	public Date getExpiration_date() {
		return expiration_date;
	}

	public void setExpiration_date(Date expiration_date) {
		this.expiration_date = expiration_date;
	}

	public int getAllow_counter_offer() {
		return allow_counter_offer;
	}

	public void setAllow_counter_offer(int allow_counter_offer) {
		this.allow_counter_offer = allow_counter_offer;
	}

	public int getOffer_status() {
		return offer_status;
	}

	public void setOffer_status(int i) {
		this.offer_status = i;
	}

	public int getIs_counter() {
		return is_counter;
	}

	public void setIs_counter(int is_counter) {
		this.is_counter = is_counter;
	}
	
	public int getAllow_split_offer() {
		return allow_split_offer;
	}

	public void setAllow_split_offer(int allow_split_offer) {
		this.allow_split_offer = allow_split_offer;
	}

	public List<Reputation> getRatings() {
		return ratings;
	}

	public void setRatings(List<Reputation> ratings) {
		this.ratings = ratings;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	
}
