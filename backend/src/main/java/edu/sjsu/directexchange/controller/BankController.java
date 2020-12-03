package edu.sjsu.directexchange.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.directexchange.model.Bank;
import edu.sjsu.directexchange.service.BankService;

@CrossOrigin(origins = "${frontend.url}", allowCredentials = "true")
@RestController
public class BankController {
	
	@Autowired
	private BankService bankService;
	
	
	@GetMapping("/getuserbank")
	@ResponseStatus(HttpStatus.OK)
	public List<Bank> getUserBank(@RequestParam("user_id") int user_id,
			@RequestParam("source_country") String country,
			@RequestParam("source_currency") String currency,
			@RequestParam("bank_type") int bank_type) {
		return bankService.getUserBank(user_id,country,currency,bank_type);
	}
	
	@PostMapping("/addbank")
	@ResponseStatus(HttpStatus.OK)
	public void addBank(@RequestBody Bank bank) {
		
		bankService.addBank(bank);
		
	}
	
	@GetMapping("/getbank")
	@ResponseStatus(HttpStatus.OK)
	public List<Bank> getBank(@RequestParam("user_id") int user_id) {
		
		return bankService.getBank(user_id); 
	}
	
	@DeleteMapping("/deleteBank")
	@ResponseStatus(HttpStatus.OK)
	public void deleteBank(@RequestParam("bank_id") int bank_id) {
		
		 bankService.deleteBank(bank_id); 
	}
}



