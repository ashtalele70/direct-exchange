package edu.sjsu.directexchange.model;


//import lombok.Getter;
import lombok.Setter;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "user")
//@Setter
//@Getter
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private int id;

//  @Column
//  private String password;

  @Column
  private int oauthType;

  @Column
  private boolean isVerified;
  
  @OneToMany(mappedBy = "user")
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "user",
  	"ratings"})
  private List<Reputation> ratings;

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

//public String getPassword() {
//	return password;
//}
//
//public void setPassword(String password) {
//	this.password = password;
//}

public int getOauthType() {
	return oauthType;
}

public void setOauthType(int oauthType) {
	this.oauthType = oauthType;
}

public boolean isVerified() {
	return isVerified;
}

public void setVerified(boolean isVerified) {
	this.isVerified = isVerified;
}

public List<Reputation> getRatings() {
	return ratings;
}

public void setRatings(List<Reputation> ratings) {
	this.ratings = ratings;
}
  
  
}
