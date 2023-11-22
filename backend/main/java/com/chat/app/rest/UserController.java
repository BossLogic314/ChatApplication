package com.chat.app.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.app.service.CookieVerifyService;
import com.chat.app.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private CookieVerifyService cookieVerifyService;
	
	@GetMapping("/get-current-user")
	public String getCurrentUser(HttpServletRequest request) {
		
		// Returning the current user's username
		return cookieVerifyService.verifyCookie(request);
	}
	
	@GetMapping("/get-all-chats")
	public Iterable<String> getAllChats(String username, String searchString, Boolean includeGroupChats, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		if (searchString == null)
			searchString = "";
		
		return userService.getAllChats(username, searchString, includeGroupChats);
	}
	
	@GetMapping("/get-all-group-chats")
	public Iterable<String> getAllGroupChats(HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return userService.getAllGroupChats();
	}
	
	@GetMapping("/create-group-chat")
	public Boolean createGroupChat(String name, Iterable<String> participants, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		userService.createGroupChat(name, participants);
		return true;
	}
	
	@GetMapping("/get-group-chat-participants")
	public Iterable<String> getGroupChatParticipants(String name, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return userService.getGroupChatParticipants(name);
	}
}
