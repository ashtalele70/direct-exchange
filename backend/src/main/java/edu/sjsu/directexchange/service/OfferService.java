package edu.sjsu.directexchange.service;

import java.sql.Date;
import java.util.List;

import edu.sjsu.directexchange.model.Offer;

public interface OfferService {

		public void postOffer(Offer offer);

		public List<Offer> getAllOffers(Integer id);

		public List<Offer> getMatchingOffers(Integer id);
}
