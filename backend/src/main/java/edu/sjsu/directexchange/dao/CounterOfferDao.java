package edu.sjsu.directexchange.dao;

import java.util.List;

import edu.sjsu.directexchange.model.Offer;

public interface CounterOfferDao {


	 public String createCounterOffer(Offer offe, int userId, int offerId);

	public Offer getOffer(Integer id);

	public List<Offer> getAllCounterOffers(Integer id);
}
