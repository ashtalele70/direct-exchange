package edu.sjsu.directexchange.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;

import edu.sjsu.directexchange.model.AcceptedOffer;

public interface AcceptedOfferService {

	public void createAcceptedOffers(int offerId1, int offerId2, int offerId3);

	List<AcceptedOffer> getAcceptedOffers(@RequestParam int user_id);
}
