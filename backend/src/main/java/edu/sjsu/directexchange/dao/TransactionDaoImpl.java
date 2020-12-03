package edu.sjsu.directexchange.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.simplejavamail.api.email.Email;
import org.simplejavamail.api.mailer.config.TransportStrategy;
import org.simplejavamail.email.EmailBuilder;
import org.simplejavamail.mailer.MailerBuilder;
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
		return entityManager.createQuery("from Transaction where user_id=:user_id").setParameter("user_id", user_id)
				.getResultList();

	}

	@Override
	public String postTransaction(Transaction transaction) {

		Transaction mergedTransaction = entityManager.merge(transaction);
		if (mergedTransaction != null) {
			String match_uuid = mergedTransaction.getMatch_uuid();
			
			AcceptedOffer transactionUpdate=(AcceptedOffer) entityManager.createQuery("from AcceptedOffer where offer_id=:offer_id")
					.setParameter("offer_id", transaction.getOffer_id()).getSingleResult();
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
