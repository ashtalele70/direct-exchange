package edu.sjsu.directexchange.dao;

import java.sql.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.Reputation;
import edu.sjsu.directexchange.model.User;

@Repository
public class OfferDaoImpl implements OfferDao{
	
	private EntityManager entityManager;
	private float ratingSum;
	private float avgRating;
	
	
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
		Query query = null;
		
		if(id != null) {
			User user = entityManager.find(User.class, id);
			if(user != null) {
				query = entityManager.createQuery("from Offer where user_id =: id")
						.setParameter("id", id);
			} else {
				// throw invalid user exception
			}
		} else {
			query = entityManager.createQuery("from Offer where offer_status = 1");
		}
		
		List<Offer> offers = query.getResultList();
		offers.forEach(offer -> {
			Query ratingQuery = entityManager.createQuery("from Reputation where user_id =: user_id")
					.setParameter("user_id", offer.getUser_id());
			
			
			List<Reputation> ratings = ratingQuery.getResultList();
			ratings.forEach(rating -> ratingSum += rating.getRating());
			avgRating = ratingSum / ratings.size();
			ratings.forEach(rating -> rating.setAvgRating(avgRating));
			offer.setRatings(ratings);
			
			ratingSum = 0f;
			avgRating = 0f;
		});
		
		return offers;
	}

}
