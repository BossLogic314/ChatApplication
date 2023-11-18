package com.chat.app.repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

import com.chat.app.model.User;

public interface LoginSignupRepository extends Neo4jRepository<User, String> {

	@Query("MATCH(user : User) WHERE user.username=$0 AND user.password=$1 RETURN TRUE")
	public Boolean authenticateUser(String username, String password);
}
