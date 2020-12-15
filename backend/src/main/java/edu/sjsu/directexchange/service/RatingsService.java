package edu.sjsu.directexchange.service;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public interface RatingsService {

	public void updateRatings(int id);

	
}
