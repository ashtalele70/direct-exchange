package edu.sjsu.directexchange.dao;

import java.util.ArrayList;
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
public class TransactionDaoImpl implements TransactionDao {

	private EntityManager entityManager;

	@Autowired
	public TransactionDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public List<Transaction> getTransaction(int user_id) {
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

}
