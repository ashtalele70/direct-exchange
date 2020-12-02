package edu.sjsu.directexchange.dao;

import edu.sjsu.directexchange.model.Offer;

public interface CounterOfferDao {


	 public int createCounterOffer(Offer offe, int userId, int offerId);

	public Offer getOffer(Integer id);

	public void updateCounterOfferStatusToExpired(int id);

}
