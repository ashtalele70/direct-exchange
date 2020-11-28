package edu.sjsu.directexchange.dao;

import edu.sjsu.directexchange.model.AcceptedOffer;
import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.UUID;

@Repository
public class AcceptedOfferDaoImpl implements AcceptedOfferDao{

  private EntityManager entityManager;


  @Autowired
  public AcceptedOfferDaoImpl(EntityManager entityManager) {
    this.entityManager = entityManager;
  }

  @Override
  public void createAcceptedOffers(int offerId1, int offerId2, int offerId3) {

    UUID uuid = UUID.randomUUID();

    Offer offer1 = entityManager.find(Offer.class, offerId1);
    User user1 = entityManager.find(User.class, offer1.getUser_id());
    AcceptedOffer acceptedOffer1 = new AcceptedOffer(uuid.toString(),
      user1.getId(),
      offerId1,
      offer1.getRemit_amount(), offer1.getSource_currency());
    entityManager.merge(acceptedOffer1);

    Offer offer2 = entityManager.find(Offer.class, offerId2);
    User user2 = entityManager.find(User.class, offer2.getUser_id());
    AcceptedOffer acceptedOffer2 = new AcceptedOffer(uuid.toString(),
      user2.getId(), offerId2,
      offer2.getRemit_amount(), offer2.getSource_currency());
    entityManager.merge(acceptedOffer2);
    System.out.print("offerId3 "+ offerId3);
    if(offerId3 != 0) {
      Offer offer3 = entityManager.find(Offer.class, offerId3);
      User user3 = entityManager.find(User.class, offer3.getUser_id());
      AcceptedOffer acceptedOffer3 = new AcceptedOffer(uuid.toString(),
        user3.getId(), offerId3,
        offer3.getRemit_amount(), offer3.getSource_currency());
      entityManager.merge(acceptedOffer3);
    }

  }
}
