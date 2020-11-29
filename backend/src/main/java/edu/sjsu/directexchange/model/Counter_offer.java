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

@Entity
@Table(name = "counter_offer")
public class Counter_offer {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private int offer_id;
	
	@Column
	private int counter_offer_id;
	
	@Column
	private int user_id;
	
	@Column
	private int other_party_id;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getOffer_id() {
		return offer_id;
	}

	public void setOffer_id(int offer_id) {
		this.offer_id = offer_id;
	}

	public int getCounter_Offer_id() {
		return counter_offer_id;
	}

	public void setCounter_Offer_id(int counter_offer_id) {
		this.counter_offer_id = counter_offer_id;
	}
	
	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
	public int getOther_party_id() {
		return other_party_id;
	}

	public void setOther_party_id(int other_party_id) {
		this.other_party_id = other_party_id;
	}

}
