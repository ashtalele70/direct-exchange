package edu.sjsu.directexchange.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.dao.CounterOfferDao;
import edu.sjsu.directexchange.model.Counter_offer;

@Service
public class CounterOfferServiceImpl implements CounterOfferService  {
	
	@Autowired
	private CounterOfferDao counterOffer;


	@Override
	public int createCounterOffer(Offer offer, int userId, int offerId) {
	
		return  counterOffer.createCounterOffer(offer, userId, offerId);
	}

	@Override
	public Offer getOffer(Integer id) {
		return counterOffer.getOffer(id);
	}

	@Override
	public List<Offer> getAllCounterOffers(Integer id) {
		// TODO Auto-generated method stub
		return counterOffer.getAllCounterOffers( id);
	}

	@Override
	@Transactional
	public void updateCounterOfferStatusToExpired(int id) {

	}

}
