package com.chat.app.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import com.chat.app.model.Message;

public interface MessageRepository extends Neo4jRepository<Message, String> {

	@Query("MATCH (m : Message) WHERE ((m.from = $0 AND m.to = $1 AND m.readList[0] = 'true') OR " +
			"(m.from = $1 AND m.to = $0 AND m.readList[1] = 'true')) AND m.groupName = '' " +
			"RETURN m ORDER BY m.year, m.month, m.date, m.hours, m.minutes, m.seconds")
	public Iterable<Message> getReadMessagesFromUser(String user, String chat);
	
	@Query("MATCH(m : Message) WHERE m.to = $1 AND m.groupName = $1 AND m.readList[$0] = 'true' " +
			"RETURN m ORDER BY m.year, m.month, m.date, m.hours, m.minutes, m.seconds")
	public Iterable<Message> getReadMessagesFromGroupChat(Integer userIndex, String chat);
	
	@Query("MATCH (m : Message) WHERE ((m.from = $0 AND m.to = $1 AND m.readList[0] = 'false') OR " +
			"(m.from = $1 AND m.to = $0 AND m.readList[1] = 'false')) AND m.groupName = '' " +
			"RETURN m ORDER BY m.year, m.month, m.date, m.hours, m.minutes, m.seconds")
	public Iterable<Message> getUnreadMessagesFromUser(String user, String chat);
	
	@Query("MATCH(m : Message) WHERE m.to = $1 AND m.groupName = $1 AND m.readList[$0] = 'false' " +
			"RETURN m ORDER BY m.year, m.month, m.date, m.hours, m.minutes, m.seconds")
	public Iterable<Message> getUnreadMessagesFromGroupChat(Integer userIndex, String chat);
	
	@Query("CREATE (message : Message{from: $0, to: $1, message: $2, groupName: $3, " +
			"readList: $4, date: $5, month: $6, year: $7, hours: $8, " +
			"minutes: $9, seconds: $10})")
	public void postMessage(String from, String chat, String message, String groupName, String[] readList,
			int dateNumber, int month, int year, int hours, int minutes, int seconds, int milliseconds);
	
	@Query("MATCH (m : Message) WHERE (m.from = $1 AND m.to = $0) SET m.readList = ['true', 'true']")
	public void turnAllMessagesIntoReadFromUser(String user, String chat);
	
	@Query("MATCH (m : Message) WHERE (m.groupName = $1 AND m.to = $1) SET m.readList = m.readList[0..$0] + 'true' + m.readList[$0+1..]")
	public void turnAllMessagesIntoReadFromGroupChat(Integer userIndex, String chat);
	
	@Query("MATCH (m : Message) WHERE (m.from = $1 AND m.to = $0 AND m.readList[1] = 'false') RETURN COUNT(*)")
	public Integer getNumberOfUnreadMessagesFromUser(String user, String chat);
	
	@Query("MATCH (m : Message) WHERE (m.to = $1 AND m.readList[$0] = 'false') RETURN COUNT(*)")
	public Integer getNumberOfUnreadMessagesFromGroupChat(Integer userIndex, String chat);
	
	@Query("MATCH (m : Message) WHERE ((m.from = $0 AND m.to = $1) OR (m.from = $1 AND m.to = $0) OR m.groupName = $1) " +
			"RETURN toString(m.year) + toString(m.month) + toString(m.date) + " +
			"toString(m.hours) + toString(m.minutes) + toString(m.seconds) + toString(m.milliseconds)")
	public String getLatestMessageTimeFromChat(String user, String chat);
}
