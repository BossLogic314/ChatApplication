package com.chat.app.service;

import java.util.ArrayList;

import com.chat.app.model.Message;

public interface MessageService {

	public Iterable<Message> getReadMessagesFromChat(String user, String chat);
	public Iterable<Message> getUnreadMessagesFromChat(String user, String chat);
	public Boolean postMessage(String from, String chat, String message,
			Integer year, Integer month, Integer date, Integer hours,
			Integer minutes, Integer seconds, Integer milliseconds);
	public Boolean turnAllMessagesForUserIntoReadFromChat(String user, String chat);
	public ArrayList<Integer> getNumberOfUnreadMessagesFromEachChat(String user, String chats[]);
	public ArrayList<String> getLatestMessageTimeFromEachChat(String user, String chats[]);
}
