package edu.sjsu.directexchange.model;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "accepted_offers")
public class AcceptedOffer {

	public int getAccepted_offer_status() {
		return accepted_offer_status;
	}

	public void setAccepted_offer_status(int accepted_offer_status) {
		this.accepted_offer_status = accepted_offer_status;
	}

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
	private float service_fee ; 
	
	@Column
	private float final_remit_amt;

	@Column
	private String accepted_offer_date=
		new SimpleDateFormat("MM-dd-yyyy HH:mm:SS").format(new Date());

	@OneToOne
	@JoinColumn(name = "offer_id", referencedColumnName = "id", insertable = false, updatable = false)
	private Offer offer;

	public float getService_fee() {
		return service_fee;
	}

	public Offer getOffer() {
		return offer;
	}

	public void setOffer(Offer offer) {
		this.offer = offer;
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

	@Column
	private String destination_currency;

	@Column
	private int accepted_offer_status;

	public AcceptedOffer() {
	}

	public AcceptedOffer(String match_uuid, int user_id, int offer_id, float remit_amount, String source_currency,
			String destination_currency,int accepted_offer_status,float service_fee, float final_remit_amt) {
		this.match_uuid = match_uuid;
		this.user_id = user_id;
		this.offer_id = offer_id;
		this.remit_amount = remit_amount;
		this.source_currency = source_currency;
		this.destination_currency = destination_currency;
		this.accepted_offer_status=accepted_offer_status;
		this.service_fee = service_fee;
		this.final_remit_amt = final_remit_amt;
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

	public float getService_Fee() {
		return service_fee;
	}

	public void setService_fee(float service_fee) {
		this.service_fee = service_fee;
	}
	
	public float getFinal_remit_amt() {
		return final_remit_amt;
	}

	public void setFinal_remit_amt(float final_remit_amt) {
		this.final_remit_amt = final_remit_amt;
	}

	public String getAccepted_offer_date() {
		return accepted_offer_date;
	}

	public void setAccepted_offer_date(String accepted_offer_date) {
		this.accepted_offer_date = accepted_offer_date;
	}


}
