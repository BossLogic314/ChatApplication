package com.chat.app.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.app.model.Chat;
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
	public Iterable<Chat> getAllChats(String username, String searchString, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		if (searchString == null)
			searchString = "";
		
		return userService.getAllChats(username, searchString);
	}
	
	@GetMapping("/get-all-other-users")
	public Iterable<String> getAllOtherUsers(String username, String searchString, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		if (searchString == null)
			searchString = "";
		
		return userService.getAllOtherUsers(username, searchString);
	}
	
	@GetMapping("/get-all-group-chats")
	public Iterable<String> getAllGroupChats(HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return userService.getAllGroupChats();
	}
	
	@GetMapping("/create-group-chat")
	public Boolean createGroupChat(String name, String participants[], HttpServletRequest request) {
		
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
	
	@GetMapping("/get-display-picture-array-buffer")
	public Iterable<Integer> getDisplayPictureArrayBufferOfUser(String username, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return userService.getDisplayPictureArrayBufferOfUser(username);
	}
	
	@GetMapping("/new-display-picture-selected")
	public Boolean newDisplayPictureSelected(String user, Integer displayPictureArrayBuffer[], HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return userService.newDisplayPictureSelected(user, displayPictureArrayBuffer);
	}
	
	@GetMapping("/is-name-unique")
	public Boolean isNameUnique(String name) {
		return userService.isNameUnique(name);
	}
}
