package edu.sjsu.directexchange.dao;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;


import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.Counter_offer;

@Repository
public class CounterOfferDaoImpl implements CounterOfferDao {

	
	private EntityManager entityManager;
	
	
	@Autowired
	public CounterOfferDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}


	@Override
	@Transactional
	public int createCounterOffer(Offer offer, int userId, int offerId) {

		Offer nOffer= entityManager.merge(offer);
		Counter_offer cof = new Counter_offer();

		cof.setCounter_Offer_id(nOffer.getId());
		cof.setOffer_id(offerId);
		cof.setUser_id(userId);
		cof.setOther_party_id(nOffer.getUser_id());

		entityManager.merge(cof);

			CompletableFuture.supplyAsync(() -> checkOffer(nOffer.getId()))
			.whenComplete((i, e) -> updateCounterOfferStatusToExpiredpri(i));
//			.thenApply(o -> updateCounterOfferStatusToExpiredpri(o.getId()));

		return nOffer.getId();
	}

	int checkOffer(int offerId) {
		System.out.println("async method called");
		try {
			Thread.sleep(15000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("sleep ended");
		return offerId;
	}


	void updateCounterOfferStatusToExpiredpri(int id) {

		System.out.println("when complete");
		Offer fetchedOffer = getOffer(id);
		Offer updated= null;
		System.out.println("offer status" + fetchedOffer.getOffer_status());
		if(fetchedOffer.getOffer_status() != 5 || fetchedOffer.getOffer_status() != 2) {
			System.out.println("Entered in if");
//			fetchedOffer.setOffer_status(3);
			System.out.println("after changing offer status" + fetchedOffer.getOffer_status());
//			entityManager.persist(fetchedOffer);
			fetchedOffer.setOffer_status(3);
//			entityManager.flush();
			System.out.println("after merging offer status" + fetchedOffer.getOffer_status());
		}
	}



	@Override
	public Offer getOffer(Integer id) {
		
		
		Offer offe = entityManager.find(Offer.class, id);
		
		return offe;
	}
	
	@Override
	public List<Offer> getAllCounterOffers(Integer id) {
		
		Query query2 = entityManager.createQuery("from Offer where is_counter=1 and id in (select counter_offer_id from Counter_offer where offer_id=:id)")
				.setParameter("id", id);
			
		List<Offer> offee = query2.getResultList();
		
		
		return offee;
	}

	@Override
	public void updateCounterOfferStatusToExpired(int id) {
		Offer offer = entityManager.find(Offer.class, id);
		offer.setOffer_status(3);
		entityManager.merge(offer);
	}

}
