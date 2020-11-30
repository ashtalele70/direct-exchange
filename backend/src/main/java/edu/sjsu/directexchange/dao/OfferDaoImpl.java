package edu.sjsu.directexchange.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
	private Date date1, date2;
	
	@Autowired
	public OfferDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public void postOffer(Offer offer) {		
		entityManager.merge(offer);
	}
	
	private void checkOfferExpiry(List<Offer> offers) {
		Date currentDate = new Date(System.currentTimeMillis());
		offers.forEach(offer -> {
			if (offer.getExpiration_date().before(currentDate)) {
				offer.setOffer_status(3);
				entityManager.merge(offer);
			}
		});
	}
	
	@Override
	public List<Offer> getMyOffers(Integer id) {
		List<Offer> offers = new ArrayList<>();
		User user = entityManager.find(User.class, id);
		if(user != null) {
			Query query = entityManager.createQuery("from Offer where user_id =: id order by offer_status")
					.setParameter("id", id);
			
			offers = query.getResultList();
			checkOfferExpiry(offers);
		}
		
		return offers;
	}

	@Override
	public List<Offer> getAllOffers(Integer id) {
		Query query1 = entityManager.createQuery("from Offer where offer_status = 1 and user_id != :user_id")
					.setParameter("user_id", id);
		
		List<Offer> offers = query1.getResultList();
		checkOfferExpiry(offers);
		
		Query query2 = entityManager.createQuery("from Offer where offer_status = 1 and user_id != :user_id")
				.setParameter("user_id", id);
	
		offers = query2.getResultList();
		Query query = entityManager.createQuery("from Offer where offer_status = 1 and user_id != :user_id")
					.setParameter("user_id", id);
		
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
		List<Offer> matchedOffers =  offersQuery.getResultList();

		for(Offer moffer : matchedOffers) {
			User user = entityManager.find(User.class, moffer.getUser_id());
			moffer.setNickname(user.getNickname());
		}

		return matchedOffers;
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
					User user1 = entityManager.find(User.class, o1.getUser_id());
					o1.setNickname(user1.getNickname());
					User user2 = entityManager.find(User.class, o2.getUser_id());
					o2.setNickname(user2.getNickname());

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


	@Override
	public List<Offer> getFilteredOffers
		(Integer id, String sourceCurrency,
		 float sourceAmount,
		 String destinationCurrency, float destinationAmount) {

		Query query1 = entityManager.createQuery("from Offer where offer_status = 1 and user_id != :user_id")
			.setParameter("user_id", id);

		List<Offer> offers = query1.getResultList();
		checkOfferExpiry(offers);

		Query query2 = entityManager.createQuery("from Offer where offer_status = 1 and user_id != :user_id")
			.setParameter("user_id", id);

		offers = query2.getResultList();

		offers =offers.stream().
			filter(x ->
				((sourceCurrency == "" || (sourceCurrency != null && sourceCurrency != ""
				&& x.getSource_currency().equals(sourceCurrency)
			))&&(destinationCurrency == "" ||
					(destinationCurrency != null && destinationCurrency != ""
				&& x.getDestination_currency().equals(destinationCurrency)))
								&&(sourceAmount == 0 ||
					(sourceAmount != 0 && x.getRemit_amount() == sourceAmount))
								&&(destinationAmount == 0 ||
					(destinationAmount != 0 && (x.getRemit_amount()  * x.getExchange_rate()) == destinationAmount)))
			).collect(Collectors.toList());

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
