package edu.sjsu.directexchange.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.Counter_offer;

@Repository
public class CounterOfferDaoImpl implements CounterOfferDao {

	
	private EntityManager entityManager;
	
	
	@Autowired
	public CounterOfferDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}


	@Override
	@Transactional
	public String createCounterOffer(Offer offer, int userId, int offerId) {
		
		
	Offer nOffer= entityManager.merge(offer);
		System.out.println(nOffer.getId());
	Counter_offer cof = new Counter_offer();
		
	cof.setCounter_Offer_id(nOffer.getId());
	cof.setOffer_id(offerId);
	cof.setUser_id(userId);
	cof.setOther_party_id(nOffer.getUser_id());
	
	entityManager.merge(cof);
		
			
		return "Success";
	}


	@Override
	public Offer getOffer(Integer id) {
		
		
		Offer offe = entityManager.find(Offer.class, id);
		
		return offe;
	}

}
