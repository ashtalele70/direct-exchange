package edu.sjsu.directexchange.dao;

import java.util.List;

import edu.sjsu.directexchange.model.Transaction;
import edu.sjsu.directexchange.model.TransactionHistory;

public interface TransactionDao {
	
	public List<Transaction> getTransaction(int user_id);
	public String postTransaction(Transaction transaction);
	public List<TransactionHistory> getHistory(int user_id);
	public List<Float> getTotal(int user_id);
	public List<Number> getReport(String month,String year);

}
