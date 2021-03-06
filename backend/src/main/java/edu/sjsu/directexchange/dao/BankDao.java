package edu.sjsu.directexchange.dao;

import java.util.List;

import edu.sjsu.directexchange.model.Bank;

public interface BankDao {
	

	public List<Bank> getUserBank(int user_id, String country, String currency, int bank_type);
	
	public void addBank(Bank bank);
	
	public List<Bank> getBank(int user_id);

	public void deleteBank(int bank_id);
}
