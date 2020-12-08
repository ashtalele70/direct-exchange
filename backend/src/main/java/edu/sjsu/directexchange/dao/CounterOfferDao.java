package edu.sjsu.directexchange.dao;

import java.util.List;

import edu.sjsu.directexchange.model.Offer;

public interface CounterOfferDao {


	public int createCounterOffer(Offer offe, int userId, int offerId, float amount);

	public Offer getOffer(Integer id);

	public List<Offer> getAllCounterOffers(Integer id);
	
	public void updateCounterOfferStatusToExpired(int id);
	
	public void rejectCounterOffer(Integer id);
	
}
