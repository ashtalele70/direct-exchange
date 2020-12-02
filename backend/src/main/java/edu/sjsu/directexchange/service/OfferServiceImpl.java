package edu.sjsu.directexchange.service;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import edu.sjsu.directexchange.model.SplitOffer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.directexchange.dao.OfferDao;
import edu.sjsu.directexchange.model.Offer;

@Service
public class OfferServiceImpl implements OfferService {	
	@Autowired
	private OfferDao offerDao;

	@Override
	@Transactional
	public void postOffer(Offer offer) {		
		offerDao.postOffer(offer);
	}

	@Override
	@Transactional
	public List<Offer> getAllOffers(Integer id) {
		return offerDao.getAllOffers(id);
	}

	@Override
	public List<Offer> getSingleMatches(Integer id) {
		return offerDao.getSingleMatches(id);
	}

	@Override
	public Set<SplitOffer> getSplitMatches(Integer id) {
		return offerDao.getSplitMatches(id);
	}
	
	@Override
	@Transactional
	public List<Offer> getMyOffers(Integer id) {
		return offerDao.getMyOffers(id);
	}

	@Override
	public List<Offer> getFilteredOffers
		(Integer id, String sourceCurrency,
		 float sourceAmount, String destinationCurrency,
		 float destinationAmount) {
		return offerDao.getFilteredOffers(id, sourceCurrency, sourceAmount,
			destinationCurrency, destinationAmount);
	}
}
