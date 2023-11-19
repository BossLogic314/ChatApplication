package com.chat.app.model;

import org.neo4j.driver.internal.value.ListValue;

public class GroupChat {

	private String name;
	private Integer numberOfParticipants;
	private ListValue participants;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getNumberOfParticipants() {
		return numberOfParticipants;
	}
	public void setNumberOfParticipants(Integer numberOfParticipants) {
		this.numberOfParticipants = numberOfParticipants;
	}
	public ListValue getParticipants() {
		return participants;
	}
	public void setParticipants(ListValue participants) {
		this.participants = participants;
	}
}
