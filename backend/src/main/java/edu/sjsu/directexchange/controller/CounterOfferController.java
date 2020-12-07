package edu.sjsu.directexchange.controller;

import edu.sjsu.directexchange.model.Counter_offer;
import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.service.CounterOfferService;
import edu.sjsu.directexchange.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
public class CounterOfferController {

	@Autowired
	  private CounterOfferService counterOfferService;

	@PostMapping("/counterOffer/{userId}/{offerId}/{new_remit_amount}")
	@ResponseStatus(HttpStatus.OK)
	  public int createUser( @RequestBody Offer offer,
												 @PathVariable String userId, @PathVariable String offerId, @PathVariable Float new_remit_amount) {
		int userID = Integer.parseInt(userId);
		int offerID = Integer.parseInt(offerId);
	
		 return counterOfferService.createCounterOffer( offer,  userID , offerID, new_remit_amount.floatValue());
	  }	

	@GetMapping("/getOffer/{id}")
	public Offer getAllOffers(@PathVariable Integer id) {
		return counterOfferService.getOffer(id);
	}

	@PutMapping("/updateCounterOfferStatusToExpired")
	@ResponseStatus(HttpStatus.OK)
	public void updateCounterOfferStatusToExpired(@RequestParam Integer id) {
		System.out.println("Method called");
		counterOfferService.updateCounterOfferStatusToExpired(id);
	}
	
	@GetMapping("/getAllCounterOffers/{id}")
	public List<Offer> getAllCounterOffers(@PathVariable Integer id) {
		return counterOfferService.getAllCounterOffers(id);
	}
	
	@PutMapping("/rejectCounterOffer")
	public void rejectCounterOffer(@RequestParam Integer id) {
		counterOfferService.rejectCounterOffer(id);
	}
	
}
