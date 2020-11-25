package edu.sjsu.directexchange.service;

import java.sql.Date;
import java.util.List;

import javax.transaction.Transactional;

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
	public List<Offer> getAllOffers() {
		return offerDao.getAllOffers();
	}}
