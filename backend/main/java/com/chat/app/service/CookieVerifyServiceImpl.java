package com.chat.app.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.chat.app.model.Constants;

@Service
public class CookieVerifyServiceImpl implements CookieVerifyService {

	@Override
	public String verifyCookie(HttpServletRequest request) {
		
		Cookie[] cookies = request.getCookies();
		
		// If there are no cookies
		if (cookies == null)
			return null;
		
		for (Cookie cookie : cookies) {
			
			if (cookie.getName().equals(Constants.COOKIE_NAME))
				return cookie.getValue();
		}
		
		return null;
	}
	
	@Override
	public Boolean deleteCookie(String username, HttpServletResponse response) {
		
		Cookie cookie = new Cookie(Constants.COOKIE_NAME, username);
		
		// Setting the expiry time
		cookie.setMaxAge(0);
		
		response.addCookie(cookie);
		
		return true;
	}
}
