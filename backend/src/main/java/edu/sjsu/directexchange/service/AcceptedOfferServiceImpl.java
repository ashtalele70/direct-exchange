package edu.sjsu.directexchange.service;

import edu.sjsu.directexchange.dao.AcceptedOfferDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AcceptedOfferServiceImpl implements AcceptedOfferService{

  @Autowired
  private AcceptedOfferDao acceptedOfferDao;

  @Transactional
  @Override
  public void createAcceptedOffers(int offerId1, int offerId2, int offerId3) {
    acceptedOfferDao.createAcceptedOffers(offerId1, offerId2, offerId3);
  }
}
