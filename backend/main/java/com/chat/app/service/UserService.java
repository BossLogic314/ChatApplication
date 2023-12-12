package com.chat.app.service;

import com.chat.app.model.Chat;

public interface UserService {

	public Iterable<Chat> getAllChats(String username, String searchString);
	
	public Iterable<String> getAllOtherUsers(String username, String searchString);
	
	public Iterable<String> getAllGroupChats();
	
	public void createGroupChat(String name, String participants[]);
	
	public Integer getNumberOfParticipantsInGroupChat(String name);
	
	public Iterable<String> getGroupChatParticipants(String name);
	
	public Integer getGroupChatParticipantIndex(String user, String chat);
	
	public Iterable<Integer> getDisplayPictureArrayBufferOfUser(String username);
	
	public Boolean newDisplayPictureSelected(String user, Integer displayPictureArrayBuffer[]);
	
	public Boolean isNameUnique(String name);
	
	public Boolean registerNewUser(String username, String password, Integer displayPictureArrayBuffer[]);
}
