package edu.sjsu.directexchange.service;

import java.util.List;

import edu.sjsu.directexchange.model.Rates;

public interface RatesService {

	public List<Rates> getRates();

	public List<String> getCurrencies();
	public String getCountry(String currency);

}
	