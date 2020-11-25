package edu.sjsu.directexchange.dao;

import java.sql.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.sjsu.directexchange.model.Offer;

@Repository
public class OfferDaoImpl implements OfferDao{
	
	private EntityManager entityManager;
	
	
	@Autowired
	public OfferDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}




	@Override
	public void postOffer(Offer offer) {
		
		entityManager.merge(offer);
	}




	@Override
	public List<Offer> getAllOffers() {
		Query query = entityManager.createQuery("from Offer where offer_status = 0");
		List<Offer> offers = query.getResultList();
		return offers;
	}

}
