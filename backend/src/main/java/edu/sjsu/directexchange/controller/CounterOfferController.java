package edu.sjsu.directexchange.controller;

import edu.sjsu.directexchange.model.Counter_offer;
import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.service.CounterOfferService;
import edu.sjsu.directexchange.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
public class CounterOfferController {

	@Autowired
	  private CounterOfferService counterOfferService;

	@PostMapping("/counterOffer/{userId}/{offerId}")
	@ResponseStatus(HttpStatus.OK)
	  public String createUser( @RequestBody Offer offer, @PathVariable int userId, @PathVariable int offerId) {
		
	
		 return counterOfferService.createCounterOffer( offer, userId, offerId);
	  }
}
