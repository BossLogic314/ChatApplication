package com.chat.app.service;

import java.util.ArrayList;

import com.chat.app.model.Message;

public interface MessageService {

	public Iterable<Message> getReadMessagesFromChat(String user, String chat);
	public Iterable<Message> getUnreadMessagesFromChat(String user, String chat);
	public Boolean postMessage(String from, String chat, String message);
	public Boolean turnAllMessagesForUserIntoReadFromChat(String user, String chat);
	public ArrayList<Integer> getNumberOfUnreadMessages(String user, String chats[]);
}
