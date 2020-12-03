package edu.sjsu.directexchange.dao;

import edu.sjsu.directexchange.exception.EmailIdExistsException;
import edu.sjsu.directexchange.exception.NicknameExistsException;
import edu.sjsu.directexchange.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.transaction.Transactional;

@Repository
public class UserDaoImpl implements UserDao {

  private EntityManager entityManager;

  @Autowired
  public UserDaoImpl(EntityManager theEntityManager) {
    entityManager = theEntityManager;
  }

  @Override
  public User getUserById(int id) {
    User user = entityManager.find(User.class, id);
    return user;
  }

  @Override
  public int getUserByEmail(String email) {
    Query usernameQuery=entityManager.createQuery("from User where username " +
      "=: " +
      "username").setParameter("username", email);
    if(usernameQuery.getResultList() != null && usernameQuery.getResultList().size() > 0) {
      User user = (User)usernameQuery.getResultList().get(0);
      return user.getId();
    }
    return 0;
  }

  @Override
  @Transactional
  public void createUser(User user) {
    Query usernameQuery=entityManager.createQuery("from User where username " +
      "=: " +

      "username").setParameter("username", user.getUsername());

    if(usernameQuery.getResultList() != null && usernameQuery.getResultList().size() > 0) throw new  EmailIdExistsException(
      "Email Id Already  Exists");



    Query nicknameQuery=entityManager.createQuery("from User where nickname " +
      "=: " +
      "nickname").setParameter("nickname", user.getNickname());

    if(nicknameQuery.getResultList() != null && nicknameQuery.getResultList().size() > 0)
      throw new NicknameExistsException("Nickname Already Exists");

    entityManager.merge(user);
  }

  @Override
  @Transactional
  public void updateUser(User user, String nickname) {
	Query query = entityManager.createQuery("from User where nickname =: nickname")
			.setParameter("nickname", nickname);
	
	//User dbUser = (User) query.getResultList();
	if(query.getResultList() != null && query.getResultList().size() > 0)
		throw new NicknameExistsException("Nickname already exists!");
	
	user.setNickname(nickname);
	entityManager.merge(user);
  }
}
