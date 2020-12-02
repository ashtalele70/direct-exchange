package edu.sjsu.directexchange.service;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.sjsu.directexchange.dao.TransactionDao;
import edu.sjsu.directexchange.model.Transaction;

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
	public void postTransaction(Transaction transaction) {
		transactionDao.postTransaction(transaction);
	}

}
