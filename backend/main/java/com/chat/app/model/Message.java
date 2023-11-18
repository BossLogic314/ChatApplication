package com.chat.app.model;

import org.springframework.data.neo4j.core.schema.Id;

public class Message {

	@Id
	private String from;
	private String to;
	private String groupName;
	private String message;
	private String[] readList;
	
	private int date;
	private int month;
	private int year;
	private int hours;
	private int minutes;
	private int seconds;
	
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public String getGroup() {
		return groupName;
	}
	public void setGroup(String groupName) {
		this.groupName = groupName;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String[] getReadList() {
		return readList;
	}
	public void setReadList(String[] readList) {
		this.readList = readList;
	}
	public int getDate() {
		return date;
	}
	public void setDate(int date) {
		this.date = date;
	}
	public int getMonth() {
		return month;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public int getHours() {
		return hours;
	}
	public void setHours(int hours) {
		this.hours = hours;
	}
	public int getMinutes() {
		return minutes;
	}
	public void setMinutes(int minutes) {
		this.minutes = minutes;
	}
	public int getSeconds() {
		return seconds;
	}
	public void setSeconds(int seconds) {
		this.seconds = seconds;
	}
}
