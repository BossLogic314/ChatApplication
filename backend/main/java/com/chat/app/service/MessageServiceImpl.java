package com.chat.app.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.app.model.Message;
import com.chat.app.repository.MessageRepository;
import com.chat.app.repository.UserRepository;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private UserService userService;
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Boolean isGroupChat(String chat) {
		
		// The list should ideally contain only one element
		ArrayList<Boolean> list = (ArrayList<Boolean>) userRepository.isGroupChat(chat);
		
		// Looping anyway
		for (Boolean element : list) {
			if (element)
				return true;
		}
		
		return false;
	}

	@Override
	public Iterable<Message> getReadMessagesFromChat(String user, String chat) {
		
		// If not a group chat
		if (!isGroupChat(chat))
			return messageRepository.getReadMessagesFromUser(user, chat);
		
		// If a group chat
		Integer userIndex = userService.getGroupChatParticipantIndex(user, chat);
		return messageRepository.getReadMessagesFromGroupChat(userIndex, chat);
	}

	@Override
	public Iterable<Message> getUnreadMessagesFromChat(String user, String chat) {
		
		// If not a group chat
		if (!isGroupChat(chat))
			return messageRepository.getUnreadMessagesFromUser(user, chat);
		
		// If a group chat
		Integer userIndex = userService.getGroupChatParticipantIndex(user, chat);
		return messageRepository.getUnreadMessagesFromGroupChat(userIndex, chat);
	}

	@Override
	public Boolean postMessage(String from, String chat, String message,
			Integer year, Integer month, Integer date, Integer hours,
			Integer minutes, Integer seconds, Integer milliseconds) {
		
		Boolean isGroupChat = isGroupChat(chat);
		int numberOfParticipants = isGroupChat ?
				userService.getNumberOfParticipantsInGroupChat(chat) : 2;
		
		String readList[] = new String[numberOfParticipants];
		String groupName = "";
		
		if (!isGroupChat) {
			readList[0] = "true";
			readList[1] = "false";
		}
		else {
			int groupChatParticipantIndex = userService.getGroupChatParticipantIndex(from, chat);
			
			for (int i = 0; i < numberOfParticipants; ++i) {
				
				if (i == groupChatParticipantIndex) {
					readList[i] = "true";
					continue;
				}
				
				readList[i] = "false";
			}
			
			groupName = chat;
		}
		messageRepository.postMessage(from, chat, message, groupName, readList,
				date, month, year, hours, minutes, seconds, milliseconds);
		
		return true;
	}

	@Override
	public Boolean turnAllMessagesForUserIntoReadFromChat(String user, String chat) {
		
		if (!isGroupChat(chat))
			messageRepository.turnAllMessagesIntoReadFromUser(user, chat);
		else {
			Integer groupChatParticipantIndex = userService.getGroupChatParticipantIndex(user, chat);
			messageRepository.turnAllMessagesIntoReadFromGroupChat(groupChatParticipantIndex, chat);
		}
		return true;
	}

	@Override
	public ArrayList<Integer> getNumberOfUnreadMessagesFromEachChat(String user, String chats[]) {
		
		ArrayList<Integer> listOfNumberOfUnreadMessages = new ArrayList<>();
		for (String chat : chats) {
			
			// Group chat
			if (isGroupChat(chat)) {
				int groupChatParticipantIndex = userService.getGroupChatParticipantIndex(user, chat);
				listOfNumberOfUnreadMessages.add(
						messageRepository.getNumberOfUnreadMessagesFromGroupChat(
								groupChatParticipantIndex, chat));
				continue;
			}
			
			// Not a group chat
			listOfNumberOfUnreadMessages.add(messageRepository.getNumberOfUnreadMessagesFromUser(user, chat));
		}
		
		return listOfNumberOfUnreadMessages;
	}
	
	public ArrayList<String> getLatestMessageTimeFromEachChat(String user, String chats[]) {
		
		ArrayList<String> listOfLatestMessageTimes = new ArrayList<>();
		for (String chat : chats) {
			
			String latestMessageTime = messageRepository.getLatestMessageTimeFromChat(user, chat);
			
			if (latestMessageTime == null) {
				listOfLatestMessageTimes.add("0");
				continue;
			}
			
			listOfLatestMessageTimes.add(latestMessageTime);
		}
		
		return listOfLatestMessageTimes;
	}
}
