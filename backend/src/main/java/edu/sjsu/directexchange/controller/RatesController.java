package edu.sjsu.directexchange.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.directexchange.model.Rates;
import edu.sjsu.directexchange.service.RatesService;

@CrossOrigin(origins = "*")
@RestController
public class RatesController {
	
	
	@Autowired
	private RatesService ratesService;
	
	
	@GetMapping("/rates")
	public List<Rates> getRates() {
		return ratesService.getRates();
	}
}
