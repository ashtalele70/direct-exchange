package edu.sjsu.directexchange.dao;

import java.util.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import edu.sjsu.directexchange.model.SplitOffer;
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

		@Override
		public List<Offer> getSingleMatches(Integer id) {
			Offer offer = entityManager.find(Offer.class, id);
			return getSingleMatches(id, offer);
		}

		@Override
		public Set<SplitOffer> getSplitMatches(Integer id) {
			Offer offer = entityManager.find(Offer.class, id);
			return getSplitMatches(id, offer);
		}


	private  List<Offer>  getSingleMatches(int id, Offer offer) {

		Query offersQuery = entityManager.createQuery("from Offer  where " +
			"source_country =: source_country and source_currency =: " +
			"source_currency and destination_country =: destination_country and " +
			"destination_currency =: destination_currency and expiration_date >= " +
			":expiration_date and remit_amount between :remit_amount_exchange_minus and " +
			":remit_amount_exchange_plus ")
			.setParameter("source_country", offer.getDestination_country())
			.setParameter("source_currency", offer.getDestination_currency())
			.setParameter("destination_country", offer.getSource_country())
			.setParameter("destination_currency", offer.getSource_currency())
			.setParameter("expiration_date" ,
				new java.util.Date(System.currentTimeMillis()))
			.setParameter("remit_amount_exchange_plus",
				(Float) offer.getRemit_amount() * offer.getExchange_rate() * 1.05F)
			.setParameter("remit_amount_exchange_minus",
				offer.getRemit_amount() * offer.getExchange_rate() * 0.95F);
		return offersQuery.getResultList();
	}

	private Set<SplitOffer> getSplitMatches(int id, Offer offer) {

		Query offersQuery = entityManager.createQuery("from Offer  where " +
			"source_country =: source_country and source_currency =: " +
			"source_currency and destination_country =: destination_country and " +
			"destination_currency =: destination_currency and expiration_date >= " +
			":expiration_date")
			.setParameter("source_country", offer.getDestination_country())
			.setParameter("source_currency", offer.getDestination_currency())
			.setParameter("destination_country", offer.getSource_country())
			.setParameter("destination_currency", offer.getSource_currency())
			.setParameter("expiration_date" ,
				new java.util.Date(System.currentTimeMillis()));

		List<Offer> offers = offersQuery.getResultList();
		Set<SplitOffer> matchedSplitOffers = new HashSet<>();

		for(Offer o1 : offers) {
			for(Offer o2 : offers) {
				if(o1.equals(o2)) continue;
				if((o1.getRemit_amount() + o2.getRemit_amount()) <=
					(offer.getRemit_amount() * offer.getExchange_rate() * 1.05) &&
					(o1.getRemit_amount() + o2.getRemit_amount()) >=
						(offer.getRemit_amount() * offer.getExchange_rate() * 0.95)) {
					SplitOffer splitOffer = new SplitOffer();
					if(o1.getId() < o2.getId()){
						splitOffer.addOffer(o1);
						splitOffer.addOffer(o2);
					}
					else {
						splitOffer.addOffer(o2);
						splitOffer.addOffer(o1);
					}


					if(!matchedSplitOffers.contains(splitOffer))
						matchedSplitOffers.add(splitOffer);
				}
			}
		}

		return matchedSplitOffers;
	}

}
