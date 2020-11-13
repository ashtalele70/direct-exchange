package edu.sjsu.directexchange.dao;

import edu.sjsu.directexchange.model.User;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
public class UserDaoImpl implements UserDao {

  @Autowired
  private EntityManager entityManager;

  @Override
  public User getUserById(Long id) {
    Session currentSession = entityManager.unwrap(Session.class);
    Query<User> query = currentSession.createQuery("from User where id =:" +
        " id", User.class).setParameter("id", id);
    User user = query.getSingleResult();
    return user;
  }
}
