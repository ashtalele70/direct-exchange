package edu.sjsu.directexchange.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import edu.sjsu.directexchange.model.Transaction;
import edu.sjsu.directexchange.model.TransactionHistory;

public interface TransactionService {
	
	public List<Transaction> getTransaction(int user_id);
	public String postTransaction(Transaction transaction);
	public List<TransactionHistory> getHistory(int user_id);
	public List<Float> getTotal(int user_id);
	public List<Number> getReport(String month,String year);
}
