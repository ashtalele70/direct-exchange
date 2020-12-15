package edu.sjsu.directexchange.service;

import edu.sjsu.directexchange.dao.RatingsDao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingsServiceImpl implements RatingsService {
	
	  @Autowired
	  RatingsDao ratingsDao ;

	@Override
	public void updateRatings(int id) {
		ratingsDao.updateRatings(id);
		
	}

}
