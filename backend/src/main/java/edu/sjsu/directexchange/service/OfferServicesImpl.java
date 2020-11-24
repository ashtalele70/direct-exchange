package edu.sjsu.directexchange.service;

import java.sql.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.directexchange.dao.OfferDao;

@Service
public class OfferServicesImpl implements OfferServices {
	
	@Autowired
	private OfferDao offerDao;



	@Override
	@Transactional
	public void postOffer(int user_id, String source_country, String source_currency, float remit_amount,
			String destination_country, String destination_currency, float exchange_rate, Date expiration_date,
			int allow_counter_offer,int allow_split_offer, String offer_status, int is_counter) {
		System.out.println("ok");
		offerDao.postOffer( user_id, source_country,  source_currency,  remit_amount,  destination_country, destination_currency,
				 exchange_rate, expiration_date,  allow_counter_offer,  allow_split_offer, offer_status,  is_counter);
		
	}}
