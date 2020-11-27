package edu.sjsu.directexchange.dao;

import java.sql.Date;
import java.util.List;

import edu.sjsu.directexchange.model.Offer;



public interface OfferDao {


	public void postOffer(Offer offer);

	public List<Offer> getAllOffers(Integer id);
}
