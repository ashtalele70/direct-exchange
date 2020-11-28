package edu.sjsu.directexchange.dao;


import edu.sjsu.directexchange.model.User;

public interface UserDao {

  User getUserById(int id);

  void createUser(User user);

  void updateUser(User user);
}
