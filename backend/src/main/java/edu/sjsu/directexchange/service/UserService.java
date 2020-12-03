package edu.sjsu.directexchange.service;

import edu.sjsu.directexchange.model.User;

public interface UserService {

  public User getUserById(int id);

  public int getUserByEmail(String email);

  public void createUser(User user);

  public void updateUser(User user, String nickname);
}
