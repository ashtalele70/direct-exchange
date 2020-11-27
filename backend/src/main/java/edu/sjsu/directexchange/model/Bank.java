package edu.sjsu.directexchange.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Bank")
public class Bank {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private int id;
	
	@Column
	private String bank_name;
	

	@Column
	private String country;
	
	@Column
	private String account_number;
	
	@Column
	private String account_holder;
	
	@Column
	private String account_address;
	
	@Column
	private String primary_currency;
	
	@Column
	private int	 bank_type;
	
	@Column
	private int user_id;	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBank_name() {
		return bank_name;
	}

	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAccount_number() {
		return account_number;
	}

	public void setAccount_number(String account_number) {
		this.account_number = account_number;
	}

	public String getAccount_holder() {
		return account_holder;
	}

	public void setAccount_holder(String account_holder) {
		this.account_holder = account_holder;
	}

	public String getAccount_address() {
		return account_address;
	}

	public void setAccount_address(String account_address) {
		this.account_address = account_address;
	}

	public String getPrimary_currency() {
		return primary_currency;
	}

	public void setPrimary_currency(String primary_currency) {
		this.primary_currency = primary_currency;
	}

	public int getBank_type() {
		return bank_type;
	}

	public void setBank_type(int bank_type) {
		this.bank_type = bank_type;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	
}
