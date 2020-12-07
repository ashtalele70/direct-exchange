package edu.sjsu.directexchange.service;
import java.util.List;

import edu.sjsu.directexchange.model.Counter_offer;
import edu.sjsu.directexchange.model.Offer;


public interface CounterOfferService {
	
	
	public int createCounterOffer(Offer offer , int userId, int offerId, float amount);

	public Offer getOffer(Integer id);

	public List<Offer> getAllCounterOffers(Integer id);

	public void updateCounterOfferStatusToExpired(int id);

	public void rejectCounterOffer(Integer id);

}


