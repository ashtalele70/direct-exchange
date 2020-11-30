package edu.sjsu.directexchange.dao;

import java.util.List;

import edu.sjsu.directexchange.model.Rates;

public interface RatesDao {

	public List<Rates> getRates();
	public List<String> getCurrencies();
	public String getCountry(String currency);

}
