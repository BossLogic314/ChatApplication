package com.chat.app.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.app.model.Message;
import com.chat.app.repository.MessageRepository;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepository;

	/*private Integer getDesiredUserIndex(String user, String chat) {
		
		boolean isGroupChat = messageRepository.isGroupChat(chat) == null ? false : true;
		
		ArrayList<ListValue> listOfReadList;
		
		// If not a user chat
		if (messageRepository.isGroupChat(chat) == null)
			listOfReadList = messageRepository.getReadListFromUser(user1, user2);
		
		// There are no read messages to be returned
		if (listOfReadList.size() == 0)
			return -1;
		
		ListValue readList = messageRepository.getReadList(user1, user2).get(0);
		
		int len = readList.size();
		
		// Looping in the list to find the desired user
		for (int i = 0; i < len; i+=2) {
			
			StringValue userStringValue = (StringValue)readList.get(i);
			String userString = userStringValue.asString("");
			
			if (userString.compareTo(desiredUser) == 0)
				return i;
		}
		
		// Control must never reach here
		return null;
	}*/

	@Override
	public Iterable<Message> getReadMessagesFromChat(String user, String chat) {
		return messageRepository.getReadMessagesFromUser(user, chat);
	}

	@Override
	public Iterable<Message> getUnreadMessagesFromChat(String user, String chat) {
		return messageRepository.getUnreadMessagesFromUser(user, chat);
	}

	@Override
	public Boolean postMessage(String from, String chat, String message) {
		
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date date = new Date();
		
		messageRepository.postMessage(from, chat, message, date.getDate(), date.getMonth(),
				date.getYear(), date.getHours(), date.getMinutes(), date.getSeconds());
		
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
