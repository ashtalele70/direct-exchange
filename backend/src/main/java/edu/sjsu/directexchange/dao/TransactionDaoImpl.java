package edu.sjsu.directexchange.dao;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import edu.sjsu.directexchange.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TransactionDaoImpl implements TransactionDao {

	private EntityManager entityManager;

	@Autowired
	public TransactionDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
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
							"Transaction where offer_id =:offer_id and transaction_status = " +
							"1").setParameter("offer_id",
							x.getOffer_id());
						List<Transaction> transactions =
							transactionCheckQuery.getResultList();
						if(transactions != null && transactions.size() > 0) {
							transactions.forEach(transaction -> {
								transaction.setTransaction_status(4);
								entityManager.merge(transaction);
								x.setAccepted_offer_status(2);
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
						}

						if(x.getOffer().getIs_counter() == 1) {
							Query query = entityManager.createQuery("from Counter_offer where offer_id = :id")
								.setParameter("id", x.getOffer().getId());
							Counter_offer cof = (Counter_offer) query.getSingleResult();

							Offer offer = entityManager.find(Offer.class, x.getOffer().getId());
							offer.setOffer_status(1);

							// comment below line if setting offer status to rejected
							offer.setIs_counter(0);
							offer.setRemit_amount(cof.getOriginal_remit_amount());
							entityManager.merge(offer);
							entityManager.remove(cof);
						} else {
							Offer offer = entityManager.find(Offer.class, x.getOffer().getId());
							offer.setOffer_status(1);
							entityManager.merge(offer);
						}
					}
				}

			} catch (ParseException e) {
				e.printStackTrace();
			}
		});
	}

	@Override
	@Transactional
	public List<Transaction> getTransaction(int user_id) {
		checkExpiredTransaction();

		List<Transaction> transactions = entityManager.createQuery("from " +
			"Transaction where " +
			"user_id=:user_id").setParameter("user_id", user_id)
				.getResultList();

		if(transactions != null || transactions.size() > 0) {
			transactions.forEach(x -> {
				List<User> users = new ArrayList<>();
				Query transactionQuery=entityManager.createQuery("from AcceptedOffer " +
					"where match_uuid =: match_uuid")
					.setParameter("match_uuid", x.getMatch_uuid());

				if(transactionQuery.getResultList() != null
					&& transactionQuery.getResultList().size() > 0) {
					List<AcceptedOffer> acceptedOffers = transactionQuery.getResultList();
					acceptedOffers.forEach(y -> {
						if(y.getUser_id() != user_id)
							users.add(entityManager.find(User.class, y.getUser_id()));
					});
				}
				x.setListOfOtherParties(users);
			});
		}
		return transactions;
	}
	
	

	@Override
	public String postTransaction(Transaction transaction) {
		Transaction mergedTransaction = entityManager.merge(transaction);
		if (mergedTransaction != null) {
			String match_uuid = mergedTransaction.getMatch_uuid();
			AcceptedOffer transactionUpdate=(AcceptedOffer) entityManager.createQuery("from AcceptedOffer where offer_id=:offer_id and match_uuid=:match_uuid")
					.setParameter("offer_id", transaction.getOffer_id()).setParameter("match_uuid",transaction.getMatch_uuid()).getSingleResult();
			transactionUpdate.setAccepted_offer_status(1);
			
			List<AcceptedOffer> acceptedOffers = entityManager
					.createQuery("from AcceptedOffer where match_uuid=:match_uuid")
					.setParameter("match_uuid", match_uuid).getResultList();
			List<Transaction> transactions = entityManager.createQuery("from Transaction where match_uuid=:match_uuid")
					.setParameter("match_uuid", match_uuid).getResultList();
			
		

			if (acceptedOffers.size() == transactions.size()) {
				for (AcceptedOffer accOffer : acceptedOffers) {
					Offer offer = entityManager.find(Offer.class, accOffer.getOffer_id());
					offer.setOffer_status(2);
					Transaction trans = (Transaction) entityManager.createQuery("from Transaction where offer_id=:offer_id")
							.setParameter("offer_id", accOffer.getOffer_id()).getSingleResult();
					trans.setTransaction_status(3);
				}
			}
			return "Success";
		}

		return "Error";

	}

	@Override
	@Transactional
	public List<TransactionHistory> getHistory(int user_id) {
		checkExpiredTransaction();
		/*
		 * match_uuid
		 * user_id
		 * offer_id
		 * source_currency
		 * source_amount
		 * exchange_rate
		 * destination_currency
		 * destination_amount
		 * service fee
		 * transaction date
		 */
		
		
		return entityManager.createNativeQuery (" select t.match_uuid,t.user_id,t.offer_id,t.source_currency,t.remit_amount as source_amount,o.exchange_rate,t.destination_currency,t.remit_amount as destinatioin_amount,t.service_fee,t.transaction_date "
				+ "from transaction t, offer o where t.offer_id=o.id and t.user_id=:user_id and STR_TO_DATE(transaction_date, '%m-%d-%Y') >= (CURRENT_DATE() - INTERVAL 12 MONTH) ")
				.setParameter("user_id", user_id).getResultList();	
		
		/*
		Query query = entityManager.createNamedQuery("complexQuery", TransactionHistory.class);
		query.setParameter("user_id", user_id);
		return  query.getResultList();
		*/
	}

	@Override
	@Transactional
	public List<Float> getTotal(int user_id) {
		checkExpiredTransaction();
		
		Float sourceTotal= ((Number) entityManager.createNativeQuery("select round(sum(t.remit_amount*o.exchange_value),2) from transaction t , "
				+ "exchange_rates o where t.source_currency=o.source_currency and o.destination_currency='USD'and t.user_id=:user_id").setParameter("user_id", user_id).getSingleResult()).floatValue();
		Float destinationTotal= ((Number) entityManager.createNativeQuery("select ROUND(sum(a.remit_amount*o.exchange_value),2) from\r\n" + 
				"	(select t.remit_amount*o.exchange_rate as remit_amount, t.destination_currency from transaction t, offer o where t.offer_id=o.id \r\n" + 
				"	and t.user_id=:user_id)a,\r\n" + 
				"	exchange_rates o\r\n" + 
				"	where a.destination_currency=o.source_currency and o.destination_currency='USD'").setParameter("user_id", user_id).getSingleResult()).floatValue();
		
		Float serviceFeeTotal= ((Number) entityManager.createNativeQuery("select round(sum(t.service_fee*o.exchange_value),2) from transaction t , "
				+ "exchange_rates o where t.source_currency=o.source_currency and o.destination_currency='USD'and t.user_id=:user_id").setParameter("user_id", user_id).getSingleResult()).floatValue();
		
		List<Float> totals=new ArrayList<Float>();
		totals.add(sourceTotal);
		totals.add(destinationTotal);
		totals.add(serviceFeeTotal);
		
		return totals;
	
	}
}
