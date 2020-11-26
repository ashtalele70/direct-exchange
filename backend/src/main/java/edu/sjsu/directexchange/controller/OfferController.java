package edu.sjsu.directexchange.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.service.OfferService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class OfferController {
	
	@Autowired
	private OfferService offerService;
	
	@PostMapping("/postoffer")
	@ResponseStatus(HttpStatus.OK)
	public void postOffer(@RequestBody Offer offer ) {
		System.out.println("ok?");
		offerService.postOffer(offer);
		
	}
	
	@GetMapping("/getAllOffers")
	public List<Offer> getAllOffers(@RequestParam(name = "id", required = false) Integer id) {
		return offerService.getAllOffers(id);
	}
	
}
