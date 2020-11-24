package edu.sjsu.directexchange.controller;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.directexchange.service.OfferServices;

@CrossOrigin("*")
@RestController
public class OfferController {
	
	@Autowired
	private OfferServices offerServices;
	
	@PostMapping("/postoffer")
	@ResponseStatus(HttpStatus.OK)
	public void postOffer(@RequestParam("user_id") int user_id,@RequestParam("source_country") String source_country,
						@RequestParam("source_currency")String source_currency, @RequestParam("remit_amount") float remit_amount, 
						@RequestParam("destination_country")String destination_country,@RequestParam("destination_currency")String destination_currency,
						@RequestParam("exchange_rate")float exchange_rate,@RequestParam("expiration_date")Date expiration_date, @RequestParam("allow_counter_offer")int allow_counter_offer, 
						@RequestParam("allow_split_offer")int allow_split_offer,@RequestParam("offer_status")String offer_status,@RequestParam("is_counter")int is_counter
			) {
		System.out.println("ok");
		 offerServices.postOffer( user_id, source_country,  source_currency,  remit_amount,  destination_country, destination_currency,
				 exchange_rate, expiration_date, allow_counter_offer, allow_split_offer, offer_status,  is_counter);
	}
}
