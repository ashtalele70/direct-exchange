package edu.sjsu.directexchange.controller;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.directexchange.model.Offer;
import edu.sjsu.directexchange.service.OfferServices;

@CrossOrigin("*")
@RestController
public class OfferController {
	
	@Autowired
	private OfferServices offerServices;
	
	@PostMapping("/postoffer")
	@ResponseStatus(HttpStatus.OK)
	public void postOffer(@RequestBody Offer offer ) {
		System.out.println("ok?");
		offerServices.postOffer(offer);
		
	}
	
}
