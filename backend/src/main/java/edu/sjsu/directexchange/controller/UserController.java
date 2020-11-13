package edu.sjsu.directexchange.controller;

import edu.sjsu.directexchange.model.User;
import edu.sjsu.directexchange.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/")
  public String home() {
    return "Home page";
  }

  @GetMapping("/user/{id}")
  public User getUserById(@PathVariable Long id){
    return userService.getUserById(id);
  }

}
