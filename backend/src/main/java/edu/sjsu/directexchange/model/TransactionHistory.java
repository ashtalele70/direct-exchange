package edu.sjsu.directexchange.model;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.NamedNativeQuery;

import org.springframework.boot.autoconfigure.domain.EntityScan;
/*
@NamedNativeQuery(
	    name="complexQuery",
	    query="select t.match_uuid,t.user_id,t.offer_id,t.source_currency,t.remit_amount as source_amount,o.exchange_rate,t.destination_currency,t.remit_amount as destinatioin_amount,t.service_fee,t.transaction_date \"\r\n" + 
	    		"				+ \"from transaction t, offer o where t.offer_id=o.id and t.user_id=:user_id and STR_TO_DATE(transaction_date, '%m-%d-%Y') >= (CURRENT_DATE() - INTERVAL 12 MONTH)",
	    resultClass=TransactionHistory.class
	)
@EntityScan("com.server.models")

*/
public class TransactionHistory {
	
	  private String match_uuid;
	 
	  private int user_id;

	  private int offer_id;
	  
	  private String source_currency;

	  private float source_amount;
	  
	  private float exchange_rate;

    	private String destination_currency;
	  
	  private Float destination_amount;
	  
	  private Float service_fee;
	  
	  private Date transaction_date;

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

	public String getSource_currency() {
		return source_currency;
	}

	public void setSource_currency(String source_currency) {
		this.source_currency = source_currency;
	}

	public float getSource_amount() {
		return source_amount;
	}

	public void setSource_amount(float source_amount) {
		this.source_amount = source_amount;
	}

	public String getDestination_currency() {
		return destination_currency;
	}

	public void setDestination_currency(String destination_currency) {
		this.destination_currency = destination_currency;
	}

	public Float getDestination_amount() {
		return destination_amount;
	}

	public void setDestination_amount(Float destination_amount) {
		this.destination_amount = destination_amount;
	}

	public Float getService_fee() {
		return service_fee;
	}

	public void setService_fee(Float service_fee) {
		this.service_fee = service_fee;
	}

	public Date getTransaction_date() {
		return transaction_date;
	}

	public void setTransaction_date(Date transaction_date) {
		this.transaction_date = transaction_date;
	}
	  
	  public float getExchange_rate() {
			return exchange_rate;
		}

		public void setExchange_rate(float exchange_rate) {
			this.exchange_rate = exchange_rate;
		}
}
