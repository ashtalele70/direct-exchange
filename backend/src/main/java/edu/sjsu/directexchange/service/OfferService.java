package edu.sjsu.directexchange.service;

import java.util.List;
import java.util.Set;

import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.SplitOffer;

public interface OfferService {

	public void postOffer(Offer offer);

	public List<Offer> getSingleMatches(Integer id);

	public Set<SplitOffer> getSplitMatches(Integer id);
	
	public List<Offer> getAllOffers(Integer id);
		
	public List<Offer> getMyOffers(Integer id);

	public List<Offer> getFilteredOffers(Integer id, String sourceCurrency,
																			 float sourceAmount,
																			 String destinationCurrency,
																			 float destinationAmount);
}
