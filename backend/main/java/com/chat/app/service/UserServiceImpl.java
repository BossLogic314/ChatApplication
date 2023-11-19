package com.chat.app.service;

import java.util.ArrayList;

import org.neo4j.driver.Value;
import org.neo4j.driver.internal.value.ListValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.app.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Iterable<String> getAllChats(String username, String searchString, Boolean includeGroupChats) {
		
		if (includeGroupChats)
			return userRepository.getAllChatsForUser(username, searchString);
		
		return userRepository.getAllOtherUsers(username, searchString);
	}
	
	@Override
	public void createGroupChat(String name, Iterable<String> participants) {
		userRepository.createGroupChat(name, participants);
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
		ArrayList<String> participants = (ArrayList<String>) getGroupChatParticipants(user);
		
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
}
