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
  public User getUserById(int id) {
    return userDao.getUserById(id);
  }

  @Override
  public int getUserByEmail(String email) {
    return userDao.getUserByEmail(email);
  }

  @Override
  public void createUser(User user) {
    userDao.createUser(user);
  }

  @Override
  public void updateUser(User user, String nickname) {
    userDao.updateUser(user, nickname);
  }
}
