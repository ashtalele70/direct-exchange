package edu.sjsu.directexchange.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.sjsu.directexchange.model.Transaction;

@Repository	
public class TransactionDaoImpl implements TransactionDao{
	
	private EntityManager entityManager;
	
	@Autowired
	public TransactionDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public List<Transaction> getTransaction(int user_id) {
		return entityManager.createQuery("from Transaction where user_id=:user_id").setParameter("user_id", user_id).getResultList();
	
	}
	

	@Override
	public String postTransaction(Transaction transaction) {
		
		Transaction mergedTransaction = entityManager.merge(transaction);
		if(mergedTransaction != null) return "Success";
		
		return "Error";
		
	}

}
