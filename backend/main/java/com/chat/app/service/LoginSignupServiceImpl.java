package com.chat.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.app.repository.LoginSignupRepository;

@Service
public class LoginSignupServiceImpl implements LoginSignupService {

	@Autowired
	private LoginSignupRepository loginSignupRepository;

	@Override
	public Boolean authenticateUser(String username, String password) {
		return loginSignupRepository.authenticateUser(username, password);
	}
}
