package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.State;
import com.example.repository.StateRepository;

@Service
public class StateService {
    @Autowired
    private StateRepository repository;

    public List<State> getStates() {
        return repository.findAll();
    }


}
