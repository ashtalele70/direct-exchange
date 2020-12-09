package edu.sjsu.directexchange.service;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.sjsu.directexchange.dao.TransactionDao;
import edu.sjsu.directexchange.model.Transaction;
import edu.sjsu.directexchange.model.TransactionHistory;

@Service
public class TransactionServiceImpl implements TransactionService {
	
	@Autowired
	private TransactionDao transactionDao;
	@Override
	public List<Transaction> getTransaction(int user_id) {
		return transactionDao.getTransaction(user_id);
	}

	@Override
	@Transactional
	public String postTransaction(Transaction transaction) {
		return transactionDao.postTransaction(transaction);
	}

	@Override
	public List<TransactionHistory> getHistory(int user_id) {
		return transactionDao.getHistory(user_id);
	}

	@Override
	public List<Float> getTotal(int user_id) {
		return transactionDao.getTotal(user_id);
	}

}
