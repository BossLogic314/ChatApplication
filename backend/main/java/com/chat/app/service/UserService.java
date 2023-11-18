package com.chat.app.service;

public interface UserService {

	public Iterable<String> getAllChats(String username, String searchString, Boolean includeGroupChats);
	
	public void createGroupChat(String name, Iterable<String> participants);
	
	public Iterable<String> getGroupChatParticipants(String name);
}
