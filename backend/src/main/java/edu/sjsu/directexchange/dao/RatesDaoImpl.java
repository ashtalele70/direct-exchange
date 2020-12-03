package edu.sjsu.directexchange.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.sjsu.directexchange.model.Rates;

@Repository	
public class RatesDaoImpl implements RatesDao {
	
	private EntityManager entityManager;
	
	
	@Autowired
	public RatesDaoImpl(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public List<Rates> getRates() {
		Query query=entityManager.createQuery("from Rates");
		List<Rates> rates=query.getResultList();
		return rates;
			
	}

	@Override
	public List<String> getCurrencies() {

		Query query=entityManager.createQuery("select distinct " +
			"source_currency from" +
			" Rates");
		List<String> currencies = query.getResultList();
		return currencies;
	}

	@Override
	public String getCountry(String currency) {

		Query query=entityManager.createQuery("select distinct source_country " +
			"from Rates " +
			"where source_currency =: source_currency").setParameter(
				"source_currency", currency);
		String country = (String) query.getSingleResult();
		return country;
	}


}
