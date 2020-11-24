package edu.sjsu.directexchange.dao;

import java.sql.Date;



public interface OfferDao {

	public void postOffer(int user_id, String source_country, String source_currency, float remit_amount,
			String destination_country, String destination_currency, float exchange_rate, Date expiration_date,
			int allow_counter_offer, int allow_split_offer,String offer_status, int is_counter);
	
	
				
				
}
