package edu.sjsu.directexchange.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import edu.sjsu.directexchange.model.Transaction;

public interface TransactionService {
	
	public List<Transaction> getTransaction(int user_id);
	public void postTransaction(Transaction transaction);
}
