package edu.sjsu.directexchange.model;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "counter_offer")
public class Counter_offer {

	public Counter_offer() {}

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
	
	@Column
	private float original_remit_amount;

	@Column
	private String counter_offer_date=
		new SimpleDateFormat("MM-dd-yyyy HH:mm:SS").format(new Date());

	@OneToOne
	@JoinColumn(name = "offer_id", referencedColumnName = "id", insertable = false, updatable = false)
	private Offer offer;

	@OneToOne
	@JoinColumn(name = "counter_offer_id", referencedColumnName = "id", insertable = false, updatable = false)
	private Offer counterOffer;
	
	public float getOriginal_remit_amount() {
		return original_remit_amount;
	}

	public void setOriginal_remit_amount(float original_remit_amount) {
		this.original_remit_amount = original_remit_amount;
	}

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

	public String getCounter_offer_date() {
		return counter_offer_date;
	}

	public void setCounter_offer_date(String counter_offer_date) {
		this.counter_offer_date = counter_offer_date;
	}

	public Offer getOffer() {
		return offer;
	}

	public void setOffer(Offer offer) {
		this.offer = offer;
	}

	public Offer getCounterOffer() {
		return counterOffer;
	}

	public void setCounterOffer(Offer counterOffer) {
		this.counterOffer = counterOffer;
	}

}
