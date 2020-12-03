package edu.sjsu.directexchange.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.sjsu.directexchange.model.AcceptedOffer;
import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.Transaction;
import edu.sjsu.directexchange.model.User;

@Repository	
public class TransactionDaoImpl implements TransactionDao{
	
	private EntityManager entityManager;
	
	@Autowired
	public TransactionDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public List<Transaction> getTransaction(int user_id) {
		return entityManager.createQuery("from Transaction where user_id=:user_id").setParameter("user_id", user_id).getResultList();
	
	}
	

	@Override
	public String postTransaction(Transaction transaction) {
		
		Transaction mergedTransaction = entityManager.merge(transaction);
		if(mergedTransaction != null) {
			String match_uuid=mergedTransaction.getMatch_uuid();
			List<AcceptedOffer> acceptedOffers= entityManager.createQuery("from AcceptedOffer where match_uuid=:match_uuid").setParameter("match_uuid", match_uuid).getResultList();
			List<Transaction> transactions= entityManager.createQuery("from Transaction where match_uuid=:match_uuid").setParameter("match_uuid", match_uuid).getResultList();
			
			if(acceptedOffers.size()==transactions.size()) {
				for (AcceptedOffer accOffer : acceptedOffers) {
					System.out.println("inside");
					Offer offer = entityManager.find(Offer.class, accOffer.getOffer_id());
					offer.setOffer_status(2);
				
		        }
			}
			return "Success";
		}
		
		return "Error";
		
	}

}
