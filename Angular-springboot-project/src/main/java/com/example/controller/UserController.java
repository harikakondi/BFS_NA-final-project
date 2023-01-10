package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.City;
import com.example.entity.Country;
import com.example.entity.User;
import com.example.entity.State;
import com.example.service.CityService;
import com.example.service.CountryService;
import com.example.service.UserService;
import com.example.service.StateService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private CountryService countryService;
    
    @Autowired
    private StateService stateService;
    
    @Autowired
    private CityService cityService;
    
    
    @GetMapping(path = "/checkCredit")
   	public CreditCheck creditcheck() {
   		int min = 400;
   		int max = 1000;
   		int random_int = (int) Math.floor(Math.random() * (max - min + 1) + min);
   		return new CreditCheck(random_int);
   	}

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/users")
    public List<User> findAllUser() {
        return userService.getUsers();
    }
    
    @GetMapping("/countries")
    public List<Country> findAllCountries() {
        return countryService.getCountries();
        
    }
    
    @GetMapping("/states")
    public List<State> findAllStates() {
        return stateService.getStates();
    }
	
    @GetMapping("/cities") 
    public List<City> findAllCities() { 
	    return cityService.getCities(); 
	}
	 
}