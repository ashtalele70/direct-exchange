package edu.sjsu.directexchange.dao;

import java.sql.Date;

import javax.persistence.EntityManager;

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

}
