package edu.sjsu.directexchange.controller;

import java.util.List;

import edu.sjsu.directexchange.util.EmailUtil;
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
import edu.sjsu.directexchange.model.TransactionHistory;
import edu.sjsu.directexchange.service.TransactionService;

@CrossOrigin(origins ="${frontend.url}", allowCredentials = "true")
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

	@PostMapping("/sendMessage")
	@ResponseStatus(HttpStatus.OK)
	public void sendMessage(@RequestBody Transaction.Message message) {
		System.out.println(message.getMessage());
		System.out.println(message.getUsername());
		EmailUtil.sendMessage(message.getUsername(), message.getMessage());
	}

	@GetMapping("/historytransactions")
	@ResponseStatus(HttpStatus.OK)
	public List<TransactionHistory> getHistory(@RequestParam int user_id) {
		return transactionService.getHistory(user_id);
	}
	
	
	@GetMapping("/totaltransactions")
	@ResponseStatus(HttpStatus.OK)
	public List<Float> getTotal(@RequestParam int user_id) {
		return transactionService.getTotal(user_id);
	}

	@GetMapping("/financialreport")
	@ResponseStatus(HttpStatus.OK) 
	public List<Number> getFinancialreport(@RequestParam String month, @RequestParam String year) {
		return transactionService.getReport(month,year);
	}
}
