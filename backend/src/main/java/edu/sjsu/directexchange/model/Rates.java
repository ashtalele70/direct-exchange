package edu.sjsu.directexchange.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "exchange_rates")
public class Rates {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private String source_currency;
	
	@Column
	private String 	source_country;
	
	@Column
	private String destination_currency;
	
	@Column
	private String destination_country;
	
	
	@Column(name="exchange_value")
	private float rate;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public float getRate() {
		return rate;
	}

	public void setRate(float rate) {
		this.rate = rate;
	}

	public String getSource_country() {
		return source_country;
	}

	public void setSource_country(String source_country) {
		this.source_country = source_country;
	}

	public String getDestination_country() {
		return destination_country;
	}

	public void setDestination_country(String destination_country) {
		this.destination_country = destination_country;
	} 
	
	
	
	
}
