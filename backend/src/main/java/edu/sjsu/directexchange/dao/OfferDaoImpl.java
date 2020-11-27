package edu.sjsu.directexchange.dao;

import java.util.ArrayList;
import java.util.HashMap;
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

	@Override
	public List<Offer> getMatchingOffers(Integer id) {
		Offer offer = entityManager.find(Offer.class, id);
		List<Offer> offers = new ArrayList<>();
		//single matches
		List<Offer> singleOffers = getSingleMatches(id, offer);
		//split matches
		List<List<Offer>> splitOffers = getSplitMatches(id, offer);

		return singleOffers;
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

	private  List<List<Offer>>  getSplitMatches(int id, Offer offer) {

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


		HashMap<Offer, Integer> map = new HashMap<>();
		List<Offer> offers = offersQuery.getResultList();
		List<List<Offer>> matchedSplitOffers = new ArrayList<>();

		for(Offer o1 : offers) {
			for(Offer o2 : offers) {
				if(o1.equals(o2)) continue;
				if((o1.getRemit_amount() + o2.getRemit_amount()) <=
					(offer.getRemit_amount() * offer.getExchange_rate() * 1.05) &&
					(o1.getRemit_amount() + o2.getRemit_amount()) >=
						(offer.getRemit_amount() * offer.getExchange_rate() * 0.95)) {
					List<Offer> temp = new ArrayList<>();
					temp.add(o1);
					temp.add(o2);
					matchedSplitOffers.add(temp);
				}
			}
		}

		return matchedSplitOffers;
	}

}
