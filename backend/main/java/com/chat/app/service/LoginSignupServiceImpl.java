package com.chat.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.app.repository.LoginSignupRepository;

@Service
public class LoginSignupServiceImpl implements LoginSignupService {

	@Autowired
	private LoginSignupRepository loginSignupRepository;

	@Override
	public Boolean authorizeUser(String username, String password) {
		Boolean authorize = loginSignupRepository.authorizeUser(username, password);
		return authorize != null && authorize;
	}
}
