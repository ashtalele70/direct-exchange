package edu.sjsu.directexchange.service;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.directexchange.dao.RatesDao;
import edu.sjsu.directexchange.model.Rates;

@Service
public class RatesServiceImpl implements RatesService {
	
	@Autowired
	private RatesDao ratesDao;
	
	
	@Override
	public List<Rates> getRates() {
		// TODO Auto-generated method stub
		return ratesDao.getRates();
	}

	@Override
	public List<String> getCurrencies() {
		return ratesDao.getCurrencies();
	}

	@Override
	public String getCountry(String currency) {
		return ratesDao.getCountry(currency);
	}

}
