package com.chat.app.rest;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.app.model.Message;
import com.chat.app.service.CookieVerifyService;
import com.chat.app.service.MessageService;

@RestController
public class MessageController {

	@Autowired
	private MessageService messageService;
	
	@Autowired
	private CookieVerifyService cookieVerifyService;
	
	@GetMapping("/get-read-messages")
	public Iterable<Message> getReadMessagesFromChat(String user, String chat, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return messageService.getReadMessagesFromChat(user, chat);
	}
	
	@GetMapping("/get-unread-messages")
	public Iterable<Message> getUnreadMessagesFromChat(String user, String chat, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return messageService.getUnreadMessagesFromChat(user, chat);
	}
	
	@GetMapping("/get-number-of-unread-messages-from-each-chat")
	public ArrayList<Integer> getNumberOfUnreadMessagesFromEachChat(String user, String chats[], HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return messageService.getNumberOfUnreadMessagesFromEachChat(user, chats);
	}
	
	@GetMapping("/get-latest-message-time-of-each-chat")
	public ArrayList<String> getLatestMessageTimeFromEachChat(String user, String chats[], HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return messageService.getLatestMessageTimeFromEachChat(user, chats);
	}
	
	@GetMapping("/post-message")
	public Boolean postMessageToChat(String from, String chat, String message,
			Integer year, Integer month, Integer date, Integer hours,
			Integer minutes, Integer seconds, Integer milliseconds, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		return messageService.postMessage(from, chat, message, year, month, date, hours, minutes, seconds, milliseconds);
	}
	
	@GetMapping("/turn-all-messages-into-read")
	public Boolean turnAllMessagesFromUserIntoRead(String user, String chat, HttpServletRequest request) {
		
		// If the user has to login
		if (cookieVerifyService.verifyCookie(request) == null)
			return null;
		
		messageService.turnAllMessagesForUserIntoReadFromChat(user, chat);
		return true;
	}
}
