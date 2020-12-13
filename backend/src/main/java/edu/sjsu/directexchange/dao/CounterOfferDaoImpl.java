package edu.sjsu.directexchange.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;

import edu.sjsu.directexchange.model.User;
import edu.sjsu.directexchange.util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
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
	public int createCounterOffer(Offer offer, int userId, int offerId, float new_amount) {
//		Offer nOffer= entityManager.merge(offer);
		Counter_offer cof = new Counter_offer();

//		cof.setCounter_Offer_id(nOffer.getId());
//		cof.setOffer_id(offerId);
//		cof.setUser_id(userId);
//		cof.setOther_party_id(nOffer.getUser_id());
		cof.setUser_id(offer.getUser_id());
		cof.setOffer_id(offer.getId());
		cof.setOther_party_id(userId);
		cof.setCounter_Offer_id(offerId);
		cof.setOriginal_remit_amount(offer.getRemit_amount());
		entityManager.merge(cof);
		
		offer.setOffer_status(4);
		offer.setRemit_amount(new_amount);
		offer.setIs_counter(1);
		Offer nOffer= entityManager.merge(offer);

		User user1 = entityManager.find(User.class, userId);
		User user2 = entityManager.find(User.class, nOffer.getUser_id());

		CompletableFuture.runAsync(() -> {
			EmailUtil.sendEmailCounterOwner(user2);
			EmailUtil.sendEmailCounterCounter(user1);
		});

		return nOffer.getId();
	}


	@Override
	public Offer getOffer(Integer id) {
		
		
		Offer offe = entityManager.find(Offer.class, id);
		
		return offe;
	}
	
	@Override
	public List<Offer> getAllCounterOffers(Integer id) {
		
//		Query query2 = entityManager.createQuery("from Offer where is_counter=1 and id in (select counter_offer_id from Counter_offer where offer_id=:id)")
//				.setParameter("id", id);
//			
//		List<Offer> offee = query2.getResultList();
//		
//		
//		return offee;
		
		Query query = entityManager.createQuery("from Counter_offer where counter_offer_id = :id")
				.setParameter("id", id);
		List<Counter_offer> cofList = query.getResultList();
		List<Offer> offers = new ArrayList<Offer>();
		cofList.forEach(cof -> {
			Offer offer = entityManager.find(Offer.class, cof.getOffer_id());
			if(offer.getOffer_status() == 4)
				offers.add(offer);
		});
		
		return offers;
	}

	@Override
	public void updateCounterOfferStatusToExpired(int id) {
		Offer offer = entityManager.find(Offer.class, id);
		offer.setOffer_status(3);
		entityManager.merge(offer);
	}


	@Override
	@Transactional
	public void rejectCounterOffer(Integer id) {
		Query query = entityManager.createQuery("from Counter_offer where offer_id = :id")
				.setParameter("id", id);
		Counter_offer cof = (Counter_offer) query.getSingleResult();
		
		Offer offer = entityManager.find(Offer.class, id);
		Offer expiredOffer = new Offer(offer);
		expiredOffer.setOffer_status(6);
		entityManager.merge(expiredOffer);
		offer.setOffer_status(1);
		
		// comment below line if setting offer status to rejected
		offer.setIs_counter(0);
		offer.setRemit_amount(cof.getOriginal_remit_amount());
		entityManager.merge(offer);
		entityManager.remove(cof);
	}

}
