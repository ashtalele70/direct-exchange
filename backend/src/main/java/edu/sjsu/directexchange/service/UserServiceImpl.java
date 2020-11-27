package edu.sjsu.directexchange.service;

import edu.sjsu.directexchange.dao.UserDao;
import edu.sjsu.directexchange.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  UserDao userDao;

  @Override
  public User getUserById(Long id) {
    return userDao.getUserById(id);
  }

  @Override
  public void createUser(User user) {
    userDao.createUser(user);
  }

  @Override
  public void updateUser(User user) {
    userDao.updateUser(user);
  }
}
