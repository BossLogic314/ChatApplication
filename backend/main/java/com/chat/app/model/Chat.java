package com.chat.app.model;

import java.util.ArrayList;

import org.springframework.data.neo4j.core.schema.Id;

public class Chat {

	@Id
	private String name;
	private ArrayList<Integer> displayPictureArrayBuffer;

	public Chat(String name, ArrayList<Integer> displayPictureArrayBuffer) {
		this.name = name;
		this.displayPictureArrayBuffer = displayPictureArrayBuffer;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public ArrayList<Integer> getDisplayPictureArrayBuffer() {
		return displayPictureArrayBuffer;
	}
	public void setDisplayPictureArrayBuffer(ArrayList<Integer> displayPictureArrayBuffer) {
		this.displayPictureArrayBuffer = displayPictureArrayBuffer;
	}
}
