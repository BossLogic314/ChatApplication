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
	public Iterable<String> getGroupChatParticipants(String name) {
		ArrayList<ListValue> a = userRepository.getGroupChatParticipants(name);
		ListValue participants = a.get(0);
		int len = participants.size();
		
		ArrayList<String> participantsStr = new ArrayList<>();
		for (int i = 0; i < len; ++i) {
			Value participant = participants.get(i);
			String participantStr = participant.asString();
			participantsStr.add(participantStr);
		}
		
		return participantsStr;
	}
}
