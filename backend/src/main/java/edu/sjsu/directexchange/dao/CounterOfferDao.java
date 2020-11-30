package edu.sjsu.directexchange.dao;

import edu.sjsu.directexchange.model.Offer;

public interface CounterOfferDao {


	 public String createCounterOffer(Offer offe, int userId, int offerId);

	public Offer getOffer(Integer id);
}
