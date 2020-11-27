package edu.sjsu.directexchange.controller;

import edu.sjsu.directexchange.model.User;
import edu.sjsu.directexchange.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
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

  @PostMapping("/user")
  public void createUser(@RequestBody User user) {
    userService.createUser(user);
  }

  @PutMapping("/user/{id}")
  public void updateUser(@RequestBody User user, @PathVariable Long id) {
    User dbUser = userService.getUserById(id);
    dbUser.setNickname(user.getNickname());
    userService.updateUser(dbUser);
  }
}
