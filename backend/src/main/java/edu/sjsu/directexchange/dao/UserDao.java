package edu.sjsu.directexchange.dao;


import edu.sjsu.directexchange.model.User;

public interface UserDao {

  User getUserById(int id);

  public int getUserByEmail(String email);

  void createUser(User user);

  void updateUser(User user, String nickname);
}
