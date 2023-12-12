package com.chat.app.repository;

import java.util.ArrayList;

import org.neo4j.driver.internal.value.ListValue;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import com.chat.app.model.Chat;

public interface UserRepository extends Neo4jRepository<Chat, String> {

	@Query("MATCH(gc: GroupChat) WHERE gc.name = $0 RETURN TRUE")
	public Iterable<Boolean> isGroupChat(String chat);
	
	@Query("MATCH(gc: GroupChat) return gc.name")
	public Iterable<String> getAllGroupChats();
	
	@Query("MATCH(gc: GroupChat) WHERE gc.name = $0 RETURN gc.numberOfParticipants")
	public Iterable<Integer> getNumberOfParticipantsInGroupChat(String chat);
	
	@Query("MATCH(u: User) WHERE NOT (u.username = $0) AND LEFT(u.username, SIZE($1)) = $1 RETURN u.username")
	public Iterable<String> getAllOtherUsersNames(String username, String searchString);
	
	@Query("MATCH(c : User | GroupChat) WHERE (NOT (c.username = $0) AND LEFT(c.username, SIZE($1)) = $1) OR "
			+ "($0 in c.participants AND LEFT(c.name, SIZE($1)) = $1) "
			+ "RETURN CASE c.name WHEN c.name THEN c.name ELSE c.username END")
	public Iterable<String> getAllChatsNames(String username, String searchString);
	
	@Query("MATCH(c : User | GroupChat) WHERE (NOT (c.username = $0) AND LEFT(c.username, SIZE($1)) = $1) OR "
			+ "($0 in c.participants AND LEFT(c.name, SIZE($1)) = $1) "
			+ "RETURN c.displayPictureArrayBuffer")
	public ArrayList<ListValue> getAllChatsDisplayPictureBufferArrays(String username, String searchString);
	
	@Query("CREATE(gc: GroupChat{name: $0, participants: $1, displayPictureArrayBuffer: $2})")
	public void createGroupChat(String name, String participants[], ArrayList<Integer> defaultDisplayPictureArrayBuffer);
	
	@Query("MATCH(gc: GroupChat) WHERE gc.name = $0 RETURN gc.participants")
	public ArrayList<ListValue> getGroupChatParticipants(String name);
	
	@Query("MATCH(u: User) WHERE u.username = $0 RETURN u.displayPictureArrayBuffer")
	public ArrayList<ListValue> getDisplayPictureArrayBufferOfUser(String username);
	
	@Query("MATCH(u: User) WHERE u.username = $0 SET u.displayPictureArrayBuffer = $1")
	public void newDisplayPictureSelected(String user, ArrayList<Integer> displayPictureArrayBuffer);
	
	@Query("MATCH(u: User | GroupChat) WHERE (u.username = $0 OR u.name = $0) RETURN FALSE")
	public Iterable<Boolean> isNameUnique(String name);
	
	@Query("CREATE(u: User{username: $0, password: $1, displayPictureArrayBuffer: $2})")
	public void registerNewUser(String username, String password, Integer displayPictureArrayBuffer[]);
}
