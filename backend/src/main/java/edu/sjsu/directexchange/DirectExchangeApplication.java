package edu.sjsu.directexchange;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class DirectExchangeApplication {
  public static void main(String[] args) {
    SpringApplication.run(DirectExchangeApplication.class, args);
  }
}
