package edu.sjsu.directexchange.dao;

import edu.sjsu.directexchange.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Repository
public class UserDaoImpl implements UserDao {

  private EntityManager entityManager;

  @Autowired
  public UserDaoImpl(EntityManager theEntityManager) {
    entityManager = theEntityManager;
  }

  @Override
  public User getUserById(Long id) {
    User user = entityManager.find(User.class, id);
    return user;
  }

  @Override
  @Transactional
  public void createUser(User user) {
    entityManager.merge(user);
  }

  @Override
  @Transactional
  public void updateUser(User user) {
    entityManager.merge(user);
  }
}
