package edu.sjsu.directexchange.model;
import java.util.List;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column
  private int id;

  @Column
  private String username;

  @Column
  private int oauth_type;

  @Column
  private boolean isVerified;

  @Column
  private String nickname;

  public long getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public int getOauth_type() {
    return oauth_type;
  }

  public void setOauth_type(int oauth_type) {
    this.oauth_type = oauth_type;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }
  
  @OneToMany(mappedBy = "user")
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "user",
  	"ratings"})
  private List<Reputation> ratings;

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
