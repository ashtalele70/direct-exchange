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

  @PutMapping("/user")
  public void updateUser(@RequestParam String nickname, @RequestParam int id) {
    User dbUser = userService.getUserById(id);
    //dbUser.setNickname(nickname);
    userService.updateUser(dbUser, nickname);
  }
}
