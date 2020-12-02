package edu.sjsu.directexchange.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.directexchange.dao.BankDao;
import edu.sjsu.directexchange.model.Bank;




@Service
public class BankServiceImpl implements BankService {
	@Autowired
	private BankDao bankDao;

	@Override
	public List<Bank> getUserBank(int user_id,String country,String currency,int bank_type) {
		return bankDao.getUserBank(user_id,country,currency,bank_type);
		// TODO Auto-generated method stub

	}

	@Override
	@Transactional
	public void addBank(Bank bank) {
		
		bankDao.addBank(bank);
		
	}

	@Override
	public List<Bank> getBank(int user_id) {
		
		return bankDao.getBank(user_id);
	}
	
	

}
