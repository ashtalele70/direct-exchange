package edu.sjsu.directexchange.dao;


import edu.sjsu.directexchange.model.Reputation;
import edu.sjsu.directexchange.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.transaction.Transactional;


@Repository
public class RatingsDaoImpl implements RatingsDao {
	
	
	private EntityManager entityManager;

	  @Autowired
	  public RatingsDaoImpl(EntityManager theEntityManager) {
	    entityManager = theEntityManager;
	  }

	@Override
	public void updateRatings(int id) {
		
		System.out.println("heoo");
		
		Query query2 = entityManager.createQuery("from Transaction where user_id=:id")
				.setParameter("id", id);
		
		List<Transaction> totalOffers = query2.getResultList();
		 float totOfers = totalOffers.size();
		 
		 if(totOfers==0) { 
			 String rat = "N/A";
			 
			 System.out.println(rat);
		 }
		 else {
		
		Query query3 = entityManager.createQuery("from Transaction where transaction_status=2 AND user_id=:id")
				.setParameter("id", id);
		
		List<Transaction> faultedOffers = query3.getResultList();
		float faultOffers = faultedOffers.size();
		
		float a = faultOffers/totOfers;
		System.out.println(a);
		
		
		float finalRating = (1 - (a))*4 + 1;
		
		System.out.println(finalRating);
		
	}
	}
}
