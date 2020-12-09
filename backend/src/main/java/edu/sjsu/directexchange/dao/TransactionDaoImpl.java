package edu.sjsu.directexchange.dao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.sjsu.directexchange.model.AcceptedOffer;
import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.Transaction;
import edu.sjsu.directexchange.model.TransactionHistory;
import edu.sjsu.directexchange.model.User;

@Repository
public class TransactionDaoImpl implements TransactionDao {

	private EntityManager entityManager;

	@Autowired
	public TransactionDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public List<Transaction> getTransaction(int user_id) {
		
		
		return entityManager.createQuery("from Transaction where user_id=:user_id").setParameter("user_id", user_id)
				.getResultList();
	}
	
	

	@Override
	public String postTransaction(Transaction transaction) {
		System.out.println("pp");
		
		Transaction mergedTransaction = entityManager.merge(transaction);
		if (mergedTransaction != null) {
			String match_uuid = mergedTransaction.getMatch_uuid();
			System.out.println(match_uuid);
			AcceptedOffer transactionUpdate=(AcceptedOffer) entityManager.createQuery("from AcceptedOffer where offer_id=:offer_id and match_uuid=:match_uuid")
					.setParameter("offer_id", transaction.getOffer_id()).setParameter("match_uuid",transaction.getMatch_uuid()).getSingleResult();
			transactionUpdate.setAccepted_offer_status(1);
			System.out.println("pp");
			
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

	public List<TransactionHistory> getHistory(int user_id) {
		
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
	public List<Float> getTotal(int user_id) {
		
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
