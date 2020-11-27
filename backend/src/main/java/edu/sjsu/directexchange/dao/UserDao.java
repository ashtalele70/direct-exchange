package edu.sjsu.directexchange.dao;


import edu.sjsu.directexchange.model.User;

public interface UserDao {

  User getUserById(Long id);

  void createUser(User user);

  void updateUser(User user);
}
