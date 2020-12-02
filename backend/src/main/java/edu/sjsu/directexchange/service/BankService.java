package edu.sjsu.directexchange.service;

import java.util.List;

import edu.sjsu.directexchange.model.Bank;
import edu.sjsu.directexchange.model.Offer;

public interface BankService {
	
	public List<Bank> getUserBank(int user_id,String country,String currency,int bank_type);
	
	public void addBank(Bank bank);
	
	public List<Bank> getBank(int user_id);

}	
