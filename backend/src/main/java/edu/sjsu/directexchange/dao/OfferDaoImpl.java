package edu.sjsu.directexchange.dao;

import java.sql.Date;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.sjsu.directexchange.model.Offer;

@Repository
public class OfferDaoImpl implements OfferDao{
	
	private EntityManager entityManager;
	
	
	@Autowired
	public OfferDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}



	@Override
	public void postOffer(int user_id, String source_country, String source_currency, float remit_amount,
			String destination_country, String destination_currency, float exchange_rate, Date expiration_date,
			int allow_counter_offer,int allow_split_offer, String offer_status, int is_counter) {
			
			Offer offer=new Offer();
			offer.setUser_id(user_id);
			offer.setSource_country(source_country);
			offer.setSource_currency(source_currency);
			offer.setRemit_amount(remit_amount);
			offer.setDestination_country(destination_country);
			offer.setDestination_currency(destination_currency);
			offer.setExchange_rate(exchange_rate);
			offer.setExpiration_date(expiration_date);
			offer.setAllow_counter_offer(allow_counter_offer);
			offer.setAllow_split_offer(allow_split_offer);
			offer.setOffer_status(offer_status);
			offer.setIs_counter(is_counter);
			entityManager.merge(offer);
	}

}
