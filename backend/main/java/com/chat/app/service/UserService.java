package com.chat.app.service;

public interface UserService {

	public Iterable<String> getAllChats(String username, String searchString, Boolean includeGroupChats);
	
	public Iterable<String> getAllGroupChats();
	
	public void createGroupChat(String name, Iterable<String> participants);
	
	public Integer getNumberOfParticipantsInGroupChat(String name);
	
	public Iterable<String> getGroupChatParticipants(String name);
	
	public Integer getGroupChatParticipantIndex(String user, String chat);
}
