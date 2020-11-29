package edu.sjsu.directexchange.controller;

import edu.sjsu.directexchange.model.User;
import edu.sjsu.directexchange.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="*")
@RestController
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/")
  public String home() {
    return "Home page";
  }

  @GetMapping("/user/{id}")
  public User getUserById(@PathVariable int id){
    return userService.getUserById(id);
  }

  @GetMapping("/user")
  public int getUserById(@RequestParam String email){
    return userService.getUserByEmail(email);
  }

  @PostMapping("/user")
  public void createUser(@RequestBody User user) {
    userService.createUser(user);
  }

  @PutMapping("/user/{id}")
  public void updateUser(@RequestBody User user, @PathVariable int id) {
    User dbUser = userService.getUserById(id);
    dbUser.setNickname(user.getNickname());
    userService.updateUser(dbUser);
  }
}
