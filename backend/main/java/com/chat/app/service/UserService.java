package com.chat.app.service;

import java.util.ArrayList;

import com.chat.app.model.Chat;

public interface UserService {

	public Iterable<Chat> getAllChats(String username, String searchString);
	
	public Iterable<String> getAllOtherUsers(String username, String searchString);
	
	public Iterable<String> getAllGroupChats();
	
	public void createGroupChat(String name, String participants[]);
	
	public Boolean isGroupChat(String chat);
	
	public Iterable<ArrayList<String>> getGroupChatParticipantsOfEachChat(String chatNames[]);
	
	public Integer getNumberOfParticipantsInGroupChat(String name);
	
	public Iterable<String> getGroupChatParticipants(String name);
	
	public Integer getGroupChatParticipantIndex(String user, String chat);
	
	public Iterable<Integer> getDisplayPictureArrayBufferOfUser(String username);
	
	public Boolean newDisplayPictureSelected(String chat, Integer displayPictureArrayBuffer[]);
	
	public Boolean isNameUnique(String name);
	
	public Boolean registerNewUser(String username, String password, Integer displayPictureArrayBuffer[]);
}
