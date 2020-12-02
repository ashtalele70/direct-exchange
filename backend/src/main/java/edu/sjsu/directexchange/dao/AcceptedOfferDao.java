package edu.sjsu.directexchange.dao;

import java.util.List;

import edu.sjsu.directexchange.model.AcceptedOffer;

public interface AcceptedOfferDao {

	public void createAcceptedOffers(int offerId1, int offerId2, int offerId3);

	List<AcceptedOffer> getAcceptedOffers(int user_id);
}
