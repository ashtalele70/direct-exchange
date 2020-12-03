package edu.sjsu.directexchange.controller;

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
import edu.sjsu.directexchange.model.Rates;
import edu.sjsu.directexchange.model.Transaction;
import edu.sjsu.directexchange.service.TransactionService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
	
	@GetMapping("/gettransactions")
	@ResponseStatus(HttpStatus.OK)
	public List<Transaction> getTransaction(@RequestParam int user_id) {
		return transactionService.getTransaction(user_id);
	}
	
	@PostMapping("/posttransaction")
	@ResponseStatus(HttpStatus.OK)
	public String postTransaction(@RequestBody Transaction transaction ) {
		return transactionService.postTransaction(transaction);
	}

}
