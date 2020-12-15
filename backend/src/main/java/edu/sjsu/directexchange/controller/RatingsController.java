package edu.sjsu.directexchange.controller;

import edu.sjsu.directexchange.service.RatingsService;
import edu.sjsu.directexchange.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="*")
@RestController
public class RatingsController {
	
	@Autowired
	  private RatingsService ratingsService;
	
	@PutMapping("/updateRatings/{id}")
	  public void getUserById(@PathVariable int id){
	     ratingsService.updateRatings(id);
	  }


}
