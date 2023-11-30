package com.chat.app.service;

import java.util.ArrayList;

import org.neo4j.driver.Value;
import org.neo4j.driver.internal.value.ListValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.app.model.Chat;
import com.chat.app.model.Constants;
import com.chat.app.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Iterable<Chat> getAllChats(String username, String searchString) {
		
		ArrayList<String> chatsNamesList = (ArrayList<String>)
				userRepository.getAllChatsNames(username, searchString);
		
		ArrayList<ListValue> arrayBuffersList = (ArrayList<ListValue>)
				userRepository.getAllChatsDisplayPictureBufferArrays(username, searchString);
		
		ArrayList<ArrayList<Integer>> arrayBuffersIntList = new ArrayList<>();
		
		int arrayBuffersListLen = arrayBuffersList.size();
		for (int i = 0; i < arrayBuffersListLen; ++i) {
			ListValue arrayBuffer = (ListValue) arrayBuffersList.get(i);
			arrayBuffersIntList.add(getArrayBufferInt(arrayBuffer));
		}
		
		ArrayList<Chat> chatsList = new ArrayList<>();
		for (int i = 0; i < arrayBuffersListLen; ++i) {
			Chat chat = new Chat(chatsNamesList.get(i), arrayBuffersIntList.get(i));
			chatsList.add(chat);
		}
		
		return chatsList;
	}
	
	@Override
	public Iterable<String> getAllOtherUsers(String username, String searchString) {
		return userRepository.getAllOtherUsersNames(username, searchString);
	}
	
	@Override
	public Iterable<String> getAllGroupChats() {
		return userRepository.getAllGroupChats();
	}
	
	@Override
	public void createGroupChat(String name, String participants[]) {
		userRepository.createGroupChat(name, participants, Constants.DEFAULT_DISPLAY_PICTURE_ARRAY_BUFFER);
	}
	
	@Override
	public Integer getNumberOfParticipantsInGroupChat(String name) {
		// This list must contain only one element
		ArrayList<Integer> numberOfParticipantsList =
				(ArrayList<Integer>) userRepository.getNumberOfParticipantsInGroupChat(name);
		
		return numberOfParticipantsList.get(0);
	}
	
	@Override
	public Iterable<String> getGroupChatParticipants(String chat) {
		ArrayList<ListValue> participantsList = userRepository.getGroupChatParticipants(chat);
		ListValue participants = participantsList.get(0);
		int len = participants.size();
		
		ArrayList<String> participantsStr = new ArrayList<>();
		for (int i = 0; i < len; ++i) {
			Value participant = participants.get(i);
			String participantStr = participant.asString();
			participantsStr.add(participantStr);
		}
		
		return participantsStr;
	}
	
	@Override
	public Integer getGroupChatParticipantIndex(String user, String chat) {
		ArrayList<String> participants = (ArrayList<String>) getGroupChatParticipants(chat);
		
		// Index of the user
		int index = 0;
		
		// Iterating through the group chat's participants to find the user's index
		for (String participant : participants) {
			
			if (participant.compareTo(user) == 0)
				return index;
			
			index++;
		}
		
		// If the user is not a participant of the group chat
		return null;
	}
	
	@Override
	public Iterable<Integer> getDisplayPictureArrayBufferOfUser(String username) {
		
		ArrayList<ListValue> arrayBuffersList = userRepository.getDisplayPictureArrayBufferOfUser(username);
		
		// There has to be only one element in the list returned
		ListValue arrayBuffer = arrayBuffersList.get(0);
		
		return getArrayBufferInt(arrayBuffer);
	}
	
	private ArrayList<Integer> getArrayBufferInt(ListValue arrayBuffer) {
		
		ArrayList<Integer> arrayBufferInt = new ArrayList<>();
		
		int arrayBufferLen = arrayBuffer.size();
		for (int j = 0; j < arrayBufferLen; ++j) {
			Value value = arrayBuffer.get(j);
			Integer intValue = value.asInt();
			
			arrayBufferInt.add(intValue);
		}
		
		return arrayBufferInt;
	}
	
	@Override
	public Boolean newDisplayPictureSelected(String user, Integer displayPictureArrayBuffer[]) {
		ArrayList<Integer> displayPictureArrayBufferList = new ArrayList<>();
		
		int len = displayPictureArrayBuffer.length;
		for (int i = 0; i < len; ++i)
			displayPictureArrayBufferList.add(displayPictureArrayBuffer[i]);
		
		userRepository.newDisplayPictureSelected(user, displayPictureArrayBufferList);
		return true;
	}
}
