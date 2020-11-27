package edu.sjsu.directexchange.dao;

import java.sql.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.User;

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
	public List<Offer> getAllOffers(Integer id) {
		if(id != null) {
			User user = entityManager.find(User.class, id);
			if(user != null) {
				Query query = entityManager.createQuery("from Offer where user_id =: id")
						.setParameter("id", id);
				List<Offer> offers = query.getResultList();
				return offers;
			}
		}
		
		Query query = entityManager.createQuery("from Offer where offer_status = 1");
		List<Offer> offers = query.getResultList();
		return offers;
	}

}
