package edu.sjsu.directexchange.service;

import edu.sjsu.directexchange.dao.AcceptedOfferDao;
import edu.sjsu.directexchange.model.AcceptedOffer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.transaction.Transactional;

@Service
public class AcceptedOfferServiceImpl implements AcceptedOfferService {

	@Autowired
	private AcceptedOfferDao acceptedOfferDao;

	@Transactional
	@Override
	public void createAcceptedOffers(int offerId1, int offerId2, int offerId3) {
		acceptedOfferDao.createAcceptedOffers(offerId1, offerId2, offerId3);
	}

	@Override
	public List<AcceptedOffer> getAcceptedOffers(int user_id) {
		return acceptedOfferDao.getAcceptedOffers(user_id);
	}
}
