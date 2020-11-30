package edu.sjsu.directexchange.service;
import java.util.List;

import edu.sjsu.directexchange.model.Counter_offer;
import edu.sjsu.directexchange.model.Offer;


public interface CounterOfferService {
	
	
	public String createCounterOffer(Offer offer , int userId, int offerId);

	public Offer getOffer(Integer id);

}

