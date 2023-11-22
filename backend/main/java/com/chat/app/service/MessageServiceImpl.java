package com.chat.app.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

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
		return messageRepository.getUnreadMessagesFromUser(user, chat);
	}

	@Override
	public Boolean postMessage(String from, String chat, String message) {
		
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date date = new Date();
		
		Boolean isGroupChat = isGroupChat(chat);
		int numberOfParticipants = isGroupChat ?
				userService.getNumberOfParticipantsInGroupChat(chat) : 2;
		
		String readList[] = new String[numberOfParticipants];
		
		if (!isGroupChat) {
			readList[0] = "true";
			readList[1] = "true";
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
		}
		messageRepository.postMessage(from, chat, message, readList,
				date.getDate(), date.getMonth(), date.getYear(),
				date.getHours(), date.getMinutes(), date.getSeconds());
		
		return true;
	}

	@Override
	public Boolean turnAllMessagesForUserIntoReadFromChat(String user, String chat) {
		messageRepository.turnAllMessagesIntoReadFromChat(user, chat);
		return true;
	}

	@Override
	public ArrayList<Integer> getNumberOfUnreadMessages(String user, String chats[]) {
		
		ArrayList<Integer> listOfNumberOfUnreadMessages = new ArrayList<>();
		for (String chat : chats)
			listOfNumberOfUnreadMessages.add(messageRepository.getNumberOfUnreadMessages(user, chat));
		
		return listOfNumberOfUnreadMessages;
	}
}
