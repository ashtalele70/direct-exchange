package edu.sjsu.directexchange.dao;

import edu.sjsu.directexchange.model.*;
import edu.sjsu.directexchange.util.EmailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Repository
public class AcceptedOfferDaoImpl implements AcceptedOfferDao {

	private EntityManager entityManager;

	@Autowired
	public AcceptedOfferDaoImpl(EntityManager entityManager) {
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
	public void createAcceptedOffers(int offerId1, int offerId2, int offerId3) {

		UUID uuid = UUID.randomUUID();
		float offerId3_remit_amount=0;
		Offer offer3=null;
		User user3=null;

		Offer offer1 = entityManager.find(Offer.class, offerId1);
		User user1 = entityManager.find(User.class, offer1.getUser_id());
		float remitAmt1= offer1.getRemit_amount();
		float sf1 = (float) (remitAmt1*0.0005);
		float frm1 = (float) (remitAmt1*0.9995);

		Offer offer2 = entityManager.find(Offer.class, offerId2);
		User user2 = entityManager.find(User.class, offer2.getUser_id());
		float remitAmt2= offer2.getRemit_amount();
		float sf2 = (float)  (remitAmt2*0.0005);
		float frm2 = (float) (remitAmt2*0.9995);
		
		float sf3 =0 ;
		float frm3 =0;
		
		if (offerId3 != 0) {
			 offer3 = entityManager.find(Offer.class, offerId3);
			 user3 = entityManager.find(User.class, offer3.getUser_id());
			 offerId3_remit_amount=offer3.getRemit_amount();
			 sf3 = (float) (offerId3_remit_amount*0.0005);
			 frm3 = (float) (offerId3_remit_amount*0.9995);
		}

		if (offer1.getOffer_status() != 4 &&
			offer1.getRemit_amount() != (offer2.getRemit_amount()+ offerId3_remit_amount)/offer1.getExchange_rate()) {
			offer1.setRemit_amount((offer2.getRemit_amount()+ offerId3_remit_amount)/offer1.getExchange_rate());
			 sf1 = (float) (offer1.getRemit_amount()*0.0005);
			 frm1 = (float) (offer1.getRemit_amount()*0.9995);
		}
		AcceptedOffer acceptedOffer1 = new AcceptedOffer(uuid.toString(), user1.getId(), offerId1,
				offer1.getRemit_amount(), offer1.getSource_currency(),offer1.getDestination_currency(),0 , sf1, frm1);
		entityManager.merge(acceptedOffer1);
		offer1.setOffer_status(5);

		AcceptedOffer acceptedOffer2 = new AcceptedOffer(uuid.toString(), user2.getId(), offerId2,
				offer2.getRemit_amount(), offer2.getSource_currency(),offer2.getDestination_currency(),0, sf2, frm2);
		entityManager.merge(acceptedOffer2);
		offer2.setOffer_status(5);

		if (offerId3 != 0) {
			AcceptedOffer acceptedOffer3 = new AcceptedOffer(uuid.toString(), user3.getId(), offerId3,
					offer3.getRemit_amount(), offer3.getSource_currency(),offer3.getDestination_currency(),0, sf3, frm3);
			entityManager.merge(acceptedOffer3);
			offer3.setOffer_status(5);
		}

		if (offerId3 != 0) {
			EmailUtil.sendEmail(user1);
			EmailUtil.sendEmail(user2);
			EmailUtil.sendEmail(user3);
		}else {
			EmailUtil.sendEmail(user1);
			EmailUtil.sendEmail(user2);
		}

	}

	@Override
	public List<AcceptedOffer> getAcceptedOffers(int user_id) {
		checkExpiredTransaction();
		List<AcceptedOffer> acceptedOffer= entityManager.createQuery("from AcceptedOffer where user_id=:user_id").setParameter("user_id", user_id)
				.getResultList();
		acceptedOffer= acceptedOffer.stream().filter(acceptedOffers->acceptedOffers.getOffer().getOffer_status() == 5).collect(Collectors.toList());
		return acceptedOffer;

	}
}
