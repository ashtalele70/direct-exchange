package edu.sjsu.directexchange.dao;

import java.util.List;

import edu.sjsu.directexchange.model.Transaction;

public interface TransactionDao {
	
	public List<Transaction> getTransaction(int user_id);
	public void postTransaction(Transaction transaction);

}
