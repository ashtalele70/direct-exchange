package edu.sjsu.directexchange.dao;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

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
	public int createCounterOffer(Offer offer, int userId, int offerId, float amount) {
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
		offer.setRemit_amount(amount);
		Offer nOffer= entityManager.merge(offer);

		User user1 = entityManager.find(User.class, userId);
		User user2 = entityManager.find(User.class, nOffer.getUser_id());

		EmailUtil.sendEmailCounterOwner(user2);
		EmailUtil.sendEmailCounterCounter(user1);

		return nOffer.getId();
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
