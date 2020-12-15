package edu.sjsu.directexchange.dao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;


import edu.sjsu.directexchange.model.SplitOffer;
import edu.sjsu.directexchange.model.Transaction;

import edu.sjsu.directexchange.model.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
	
	private List<Reputation> setUserRatings(Offer offer) {
		Query ratingQuery = entityManager.createQuery("from Reputation where user_id =: user_id")
				.setParameter("user_id", offer.getUser_id());
					
		List<Reputation> ratings = ratingQuery.getResultList();
		ratings.forEach(rating -> ratingSum += rating.getRating());
		avgRating = ratingSum / ratings.size();
		ratings.forEach(rating -> rating.setAvgRating(avgRating));
		offer.setRatings(ratings);
		ratingSum = 0f;
		avgRating = 0f;
		
		return ratings;
	}
	
	private void checkOfferExpiry(List<Offer> offers) {
		Date currentDate = new Date(System.currentTimeMillis());
		offers.stream().filter(x -> x.getIs_counter() != 1).forEach(offer -> {
			if (offer.getExpiration_date().before(currentDate)) {
				offer.setOffer_status(3);
				entityManager.merge(offer);
			}
		});
	}
	
	
	private float updateRating(int user_id) {
		
		float finalRating;
		
		Query query2 = entityManager.createQuery("from Transaction where user_id=:id")
				.setParameter("id", user_id);
		
		 List<Transaction> totalOffers = query2.getResultList();
		 float totOfers = totalOffers.size();
		 
		 if(totOfers==0) { 
			
			 
			return 0.0f;
		 }
		 else {
		
		Query query3 = entityManager.createQuery("from Transaction where transaction_status=2 AND user_id=:id")
				.setParameter("id", user_id);
		
		List<Transaction> faultedOffers = query3.getResultList();
		float faultOffers = faultedOffers.size();
		
		float a = faultOffers/totOfers;
		System.out.println(a);
		
		
	   finalRating = (1 - (a))*4 + 1;
		
		//System.out.println(finalRating);
		
	}
	

		return finalRating;  
		
	}
	
	@Override
	public List<Offer> getMyOffers(Integer id) {
		expireCounterOffer();
		checkExpiredTransaction();
		List<Offer> offers = new ArrayList<>();
		User user = entityManager.find(User.class, id);
		if(user != null) {
			Query query = entityManager.createQuery("from Offer where user_id =: id order by " +
				"case when offer_status=1 then 1 " +
							"when offer_status=4 then 2 " +
							"when offer_status=5 then 3 " +
							"when offer_status=2 then 4 " +
							"when offer_status=6 then 5 " +
							"when offer_status=3 then 6 end")
					.setParameter("id", id);
			
			offers = query.getResultList();
			checkOfferExpiry(offers);
			
			offers.forEach(offer -> {
				offer.setRating(updateRating(id));
				offer.setNickname(user.getNickname());
				offer.setEmail(user.getUsername());
			});
		}
		
		return offers;
	}

	@Override
	public List<Offer> getAllOffers(Integer id) {
		expireCounterOffer();
		checkExpiredTransaction();
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
			User user = entityManager.find(User.class, offer.getUser_id());
			offer.setRating(updateRating(user.getId()));
			offer.setNickname(user.getNickname());
			offer.setEmail(user.getUsername());
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
			"allow_split_offer = 1 and offer_status = 1 and "+
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
				(Float) offer.getRemit_amount() * offer.getExchange_rate() * 1.10F)
			.setParameter("remit_amount_exchange_minus",
				offer.getRemit_amount() * offer.getExchange_rate() * 0.90F);
		List<Offer> matchedOffers =  offersQuery.getResultList();

		for(Offer moffer : matchedOffers) {
			User user = entityManager.find(User.class, moffer.getUser_id());
			moffer.setNickname(user.getNickname());
		}


//		matchedOffers.sort(new Comparator<Offer>() {
//			@Override
//			public int compare(Offer o1, Offer o2) {
//				float diff1 =
//					(o1.getRemit_amount() - offer.getRemit_amount() * offer.getExchange_rate())/offer.getRemit_amount() * offer.getExchange_rate();
//				float diff2 =
//					(o2.getRemit_amount() - offer.getRemit_amount() * offer.getExchange_rate())/offer.getRemit_amount() * offer.getExchange_rate();
//				return Math.abs((int) (diff1 * 100 - diff2 * 100));
//			}
//		});
		matchedOffers.sort(Comparator.comparing((Offer o) -> Math.abs(o.getRemit_amount() - offer.getRemit_amount() * offer.getExchange_rate()))
			.thenComparing(o -> o.getRemit_amount() - offer.getRemit_amount() * offer.getExchange_rate()));
		return matchedOffers;
	}

	private Set<SplitOffer> getSplitMatches(int id, Offer offer) {

		Query offersQuery = entityManager.createQuery("from Offer  where " +
			"allow_split_offer = 1 and offer_status = 1 and "+
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
					(offer.getRemit_amount() * offer.getExchange_rate() * 1.10F) &&
					(o1.getRemit_amount() + o2.getRemit_amount()) >=
						(offer.getRemit_amount() * offer.getExchange_rate() * 0.90F)){
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

		matchedSplitOffers.stream().sorted(Comparator.comparing((SplitOffer o) -> Math.abs((o.getOffers().get(0).getRemit_amount() + o.getOffers().get(1).getRemit_amount()) - offer.getRemit_amount() * offer.getExchange_rate()))
			.thenComparing(o -> (o.getOffers().get(0).getRemit_amount() + o.getOffers().get(1).getRemit_amount()) - offer.getRemit_amount() * offer.getExchange_rate()));

		//A = B - C
		matchedSplitOffers.addAll(getOtherSpiltMatches(offer, offers));


		return matchedSplitOffers;
	}

	private List<SplitOffer> getOtherSpiltMatches(Offer offer,
																								List<Offer> offers) {

		List<SplitOffer> result = new ArrayList<>();
		Query offersQuery = entityManager.createQuery("from Offer  where " +
			"allow_split_offer = 1 and offer_status = 1  and id != :id and "+
			"source_country =: source_country and source_currency =: " +
			"source_currency and destination_country =: destination_country and " +
			"destination_currency =: destination_currency and expiration_date >= " +
			":expiration_date")
			.setParameter("id", offer.getId())
			.setParameter("source_country", offer.getSource_country())
			.setParameter("source_currency", offer.getSource_currency())
			.setParameter("destination_country", offer.getDestination_country())
			.setParameter("destination_currency", offer.getDestination_currency())
			.setParameter("expiration_date" ,
				new java.util.Date(System.currentTimeMillis()));

		List<Offer> sameCurrencyOffers = offersQuery.getResultList();

		for(Offer o1 : sameCurrencyOffers) {
			for (Offer o2 : offers) {
				if(((Math.abs((o1.getRemit_amount() * offer.getExchange_rate()) - o2.getRemit_amount()) <=
					(offer.getRemit_amount() * offer.getExchange_rate() * 1.10F)) &&
					(Math.abs((o1.getRemit_amount() *  offer.getExchange_rate()) - o2.getRemit_amount())) >=
						(offer.getRemit_amount() * offer.getExchange_rate() * 0.90F))){
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

					if(!result.contains(splitOffer))
						result.add(splitOffer);
				}

			}
		}
		return result;
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

	private void checkExpiredTransaction() {

		Query acceptedOfferQuery = entityManager.createQuery(" from " +
			"AcceptedOffer where accepted_offer_status in (0, 1)");

		List<AcceptedOffer> acceptedOffers = acceptedOfferQuery.getResultList();
		acceptedOffers.forEach(x -> {
			try {
				if(x.getAccepted_offer_date() != null) {
					Date startDate =
						new SimpleDateFormat("MM-dd-yyyy hh:mm:ss").parse(x.getAccepted_offer_date());
					long minutes = System.currentTimeMillis() - startDate.getTime();
					long diff = TimeUnit.MINUTES.convert(minutes, TimeUnit.MILLISECONDS);
					if(diff >= 10) {
						Query transactionCheckQuery =  entityManager.createQuery(" from " +
							"Transaction where offer_id =:offer_id").setParameter("offer_id",
							x.getOffer_id());
						List<Transaction> transactions =
							transactionCheckQuery.getResultList();
						if(transactions != null && transactions.size() > 0) {
							transactions.stream().filter(txn -> txn.getTransaction_status() == 1).forEach(transaction -> {
								transaction.setTransaction_status(4);
								entityManager.merge(transaction);
								x.setAccepted_offer_status(2);

								if(x.getOffer().getIs_counter() == 1  && x.getOffer().getOffer_status() == 5) {
									Query query = entityManager.createQuery("from Counter_offer where offer_id = :id")
										.setParameter("id", x.getOffer().getId());
									Counter_offer cof = (Counter_offer) query.getSingleResult();

									Offer offer = entityManager.find(Offer.class, x.getOffer().getId());
									Offer expiredOffer = new Offer(offer);
									expiredOffer.setOffer_status(3);
									entityManager.merge(expiredOffer);
									offer.setOffer_status(1);

									// comment below line if setting offer status to rejected
									offer.setIs_counter(0);
									offer.setRemit_amount(cof.getOriginal_remit_amount());
									entityManager.merge(offer);
									entityManager.remove(cof);
								} else if(x.getOffer().getIs_counter() == 0 && x.getOffer().getOffer_status() == 5){
									Offer offer = entityManager.find(Offer.class, x.getOffer().getId());
									offer.setOffer_status(1);
									entityManager.merge(offer);
								}
							});
						} else {
							Transaction transaction = new Transaction();
							transaction.setMatch_uuid(x.getMatch_uuid());
							transaction.setOffer_id(x.getOffer_id());
							transaction.setUser_id(x.getUser_id());
							transaction.setRemit_amount(x.getRemit_amount());
							transaction.setSource_currency(x.getSource_currency());
							transaction.setTransaction_status(2);
							transaction.setService_fee(x.getService_fee());
							transaction.setDestination_currency(x.getDestination_currency());
							entityManager.merge(transaction);
							x.setAccepted_offer_status(2);

							if(x.getOffer().getIs_counter() == 1) {
								Query query = entityManager.createQuery("from Counter_offer where offer_id = :id")
									.setParameter("id", x.getOffer().getId());
								Counter_offer cof = (Counter_offer) query.getSingleResult();

								Offer offer = entityManager.find(Offer.class, x.getOffer().getId());
								Offer expiredOffer = new Offer(offer);
								expiredOffer.setOffer_status(3);
								entityManager.merge(expiredOffer);
								offer.setOffer_status(1);

								// comment below line if setting offer status to rejected
								offer.setIs_counter(0);
								offer.setRemit_amount(cof.getOriginal_remit_amount());
								entityManager.merge(offer);
								entityManager.remove(cof);
							} else if(x.getOffer().getIs_counter() == 0){
								Offer offer = entityManager.find(Offer.class, x.getOffer().getId());
								offer.setOffer_status(1);
								entityManager.merge(offer);
							}
						}
					}
				}

			} catch (ParseException e) {
				e.printStackTrace();
			}
		});
	}


	@Transactional
	public void expireCounterOffer() {
		Query query = entityManager.createQuery("from Counter_offer c where " +
			"c.offer_id in (select id from Offer where id = c.offer_id and " +
			"offer_status = 4)");
		List<Counter_offer> counterOffers = query.getResultList();

		counterOffers.forEach(x -> {
			try {
				if (x.getCounter_offer_date() != null) {
					Date startDate =
						new SimpleDateFormat("MM-dd-yyyy hh:mm:ss").parse(x.getCounter_offer_date());
					long minutes = System.currentTimeMillis() - startDate.getTime();
					long diff = TimeUnit.MINUTES.convert(minutes, TimeUnit.MILLISECONDS);
					if (diff >= 5) {
						Offer offer = x.getOffer();
						Offer expiredOffer = new Offer(offer);
						expiredOffer.setOffer_status(3);
						entityManager.merge(expiredOffer);

						offer.setOffer_status(1);

						// comment below line if setting offer status to rejected
						offer.setIs_counter(0);
						offer.setRemit_amount(x.getOriginal_remit_amount());
						entityManager.merge(offer);

						entityManager.remove(x);
					}
				}
			} catch (ParseException e) {
				e.printStackTrace();
			}
		});
	}
}
