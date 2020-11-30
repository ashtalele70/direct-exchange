package edu.sjsu.directexchange.controller;

import edu.sjsu.directexchange.service.AcceptedOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class AcceptedOfferController {

  @Autowired
  private AcceptedOfferService acceptedOfferService;

  @PostMapping("/acceptedOffer")
  @ResponseStatus(HttpStatus.OK)
  public void createAcceptedOffers(@RequestParam int offerId1,
                                   @RequestParam int offerId2,
                                   @RequestParam (name = "offerId3", required =
                                     false) Integer offerId3) {
    if(offerId3 == null) offerId3= 0;
    acceptedOfferService.createAcceptedOffers(offerId1, offerId2, offerId3);

  }
}
