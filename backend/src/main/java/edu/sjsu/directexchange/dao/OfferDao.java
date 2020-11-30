package edu.sjsu.directexchange.dao;

import java.util.List;
import java.util.Set;

import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.SplitOffer;

public interface OfferDao {

	public void postOffer(Offer offer);

	public List<Offer> getAllOffers(Integer id);

	public List<Offer> getSingleMatches(Integer id);

	public Set<SplitOffer> getSplitMatches(Integer id);

	public List<Offer> getMyOffers(Integer id);
}
