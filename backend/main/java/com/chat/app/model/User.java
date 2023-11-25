package com.chat.app.model;

import org.springframework.data.neo4j.core.schema.Id;

public class User {

	@Id
	private String username;
	private String password;

	public String getName() {
		return username;
	}
	public void setUsername(String name) {
		this.username = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
