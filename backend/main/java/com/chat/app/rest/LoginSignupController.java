package com.chat.app.rest;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.app.model.Constants;
import com.chat.app.service.CookieVerifyService;
import com.chat.app.service.LoginSignupService;

@RestController
public class LoginSignupController {

	@Autowired
	private LoginSignupService loginSignupService;
	
	@Autowired
	private CookieVerifyService cookieVerifyService;
	
	@GetMapping("/authorize-user")
	public Boolean authorizeUser(HttpServletRequest request) {
		return cookieVerifyService.verifyCookie(request) != null;
	}
	
	@GetMapping("/login")
	public Boolean getAccess(String username, String password, HttpServletResponse response) {
		
		if (!loginSignupService.authorizeUser(username, password))
			return false;
		
		Cookie cookie = new Cookie(Constants.COOKIE_NAME, username);
		
		// Setting the expiry time
		cookie.setMaxAge(Constants.COOKIE_EXPIRY_TIME);
		
		response.addCookie(cookie);
		
		return true;
	}
	
	@GetMapping("/logout")
	public Boolean logout(String username, HttpServletResponse response) {
		return cookieVerifyService.deleteCookie(username, response);
	}
}
