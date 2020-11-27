package edu.sjsu.directexchange.service;

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

}
