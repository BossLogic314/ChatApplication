package com.chat.app.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface CookieVerifyService {

	public String verifyCookie(HttpServletRequest request);
	public Boolean deleteCookie(String username, HttpServletResponse response);
}
