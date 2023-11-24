package com.chat.app.repository;

import java.util.ArrayList;

import org.neo4j.driver.internal.value.ListValue;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import com.chat.app.model.User;

public interface UserRepository extends Neo4jRepository<User, String> {

	@Query("MATCH(gc: GroupChat) WHERE gc.name = $0 RETURN TRUE")
	public Iterable<Boolean> isGroupChat(String chat);
	
	@Query("MATCH(gc: GroupChat) return gc.name")
	public Iterable<String> getAllGroupChats();
	
	@Query("MATCH(gc: GroupChat) WHERE gc.name = $0 RETURN gc.numberOfParticipants")
	public Iterable<Integer> getNumberOfParticipantsInGroupChat(String chat);
	
	@Query("MATCH(u: User) WHERE NOT (u.username = $0) AND LEFT(u.username, SIZE($1)) = $1 RETURN u.username")
	public Iterable<String> getAllOtherUsers(String username, String searchString);
	
	@Query("MATCH(c : User | GroupChat) WHERE (NOT (c.username = $0) AND LEFT(c.username, SIZE($1)) = $1) OR "
			+ "($0 in c.participants AND LEFT(c.name, SIZE($1)) = $1) "
			+ "RETURN CASE c.name WHEN c.name THEN c.name ELSE c.username END AS result")
	public Iterable<String> getAllChatsForUser(String username, String searchString);
	
	@Query("CREATE(gc: GroupChat{name: $0, participants: $1})")
	public void createGroupChat(String name, String participants[]);
	
	@Query("MATCH(gc: GroupChat) WHERE gc.name = $0 RETURN gc.participants")
	public ArrayList<ListValue> getGroupChatParticipants(String name);
}
