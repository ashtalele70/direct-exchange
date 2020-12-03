package edu.sjsu.directexchange.dao;

import edu.sjsu.directexchange.model.AcceptedOffer;
import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.Transaction;
import edu.sjsu.directexchange.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class AcceptedOfferDaoImpl implements AcceptedOfferDao {

	private EntityManager entityManager;

	@Autowired
	public AcceptedOfferDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public void createAcceptedOffers(int offerId1, int offerId2, int offerId3) {

		UUID uuid = UUID.randomUUID();
		float OfferId3_remit_amount=0;
		Offer offer3=null;
		User user3=null;

		Offer offer1 = entityManager.find(Offer.class, offerId1);
		User user1 = entityManager.find(User.class, offer1.getUser_id());
		
		Offer offer2 = entityManager.find(Offer.class, offerId2);
		User user2 = entityManager.find(User.class, offer2.getUser_id());
		
		
		
		if (offerId3 != 0) {
			 offer3 = entityManager.find(Offer.class, offerId3);
			 user3 = entityManager.find(User.class, offer3.getUser_id());
			OfferId3_remit_amount=offer3.getRemit_amount();
		}
		
		System.out.println(offer1.getRemit_amount());
		System.out.println(offer1.getId());
		System.out.println(offer2.getRemit_amount());
		System.out.println(OfferId3_remit_amount);
		System.out.println(offer1.getExchange_rate());
		System.out.println( (offer2.getRemit_amount()+ OfferId3_remit_amount)/offer1.getExchange_rate());
		
		
		if (offer1.getRemit_amount() != (offer2.getRemit_amount()+ OfferId3_remit_amount)/offer1.getExchange_rate()) {
			offer1.setRemit_amount((offer2.getRemit_amount()+ OfferId3_remit_amount)/offer1.getExchange_rate());
			
			System.out.println(offer1.getRemit_amount());
		}
		
		
		AcceptedOffer acceptedOffer1 = new AcceptedOffer(uuid.toString(), user1.getId(), offerId1,
				offer1.getRemit_amount(), offer1.getSource_currency(),offer1.getDestination_currency(),0);
		entityManager.merge(acceptedOffer1);
		offer1.setOffer_status(5);
		
		AcceptedOffer acceptedOffer2 = new AcceptedOffer(uuid.toString(), user2.getId(), offerId2,
				offer2.getRemit_amount(), offer2.getSource_currency(),offer2.getDestination_currency(),0);
		entityManager.merge(acceptedOffer2);
		offer2.setOffer_status(5);
		System.out.print("offerId3 " + offerId3);
		
		if (offerId3 != 0) {
			AcceptedOffer acceptedOffer3 = new AcceptedOffer(uuid.toString(), user3.getId(), offerId3,
					offer3.getRemit_amount(), offer3.getSource_currency(),offer3.getDestination_currency(),0);
			entityManager.merge(acceptedOffer3);
			offer3.setOffer_status(5);
		}
		
	

	}

	@Override
	public List<AcceptedOffer> getAcceptedOffers(int user_id) {
		// TODO Auto-generated method stub
		List<AcceptedOffer> acceptedOffer= entityManager.createQuery("from AcceptedOffer where user_id=:user_id").setParameter("user_id", user_id)
				.getResultList();
		
		
		
		acceptedOffer= acceptedOffer.stream().filter(acceptedOffers->acceptedOffers.getOffer().getOffer_status() == 5).collect(Collectors.toList());
		return acceptedOffer;

	}
}
