export default class Constants {

    // (Database value - base value) gives the actual value of time
    static BASE_MONTH = 1;

    // Allowed lengths of username
    static USERNAME_MIN_LENGTH = 4;
    static USERNAME_MAX_LENGTH = 10;

    // Error messages while authentication and signing up
    static USERNAME_EMPTY_MESSAGE = '*Username cannot be empty*';
    static PASSWORD_EMPTY_MESSAGE = '*Password cannot be empty*';
    static USERNAME_MIN_LENGTH_MESSAGE = `*Username has to be atleast ${this.USERNAME_MIN_LENGTH} characters long*`;
    static USERNAME_MAX_LENGTH_MESSAGE = `*Username can be atmost ${this.USERNAME_MAX_LENGTH} characters long*`;
    static INVALID_USERNAME_PASSWORD_MESSAGE = '*Invalid username or password. Please try again*';
    static USERNAME_ALREADY_TAKEN_MESSAGE(name) {
        return `*The name '${name}' is already taken. Try another username*`;
    }

    // Allowed lengths of group name
    static GROUP_NAME_MIN_LENGTH = 4;
    static GROUP_NAME_MAX_LENGTH = 10;

    // Group chat participants constants
    static MIN_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT = 2;
    static MAX_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT = 5;

    // Error messages while creating a new group chat
    static INVALID_NUM_OF_GROUP_CHAT_PARTICIPANTS_MESSAGE =
        `*Each group chat must contain atleast ${Constants.MIN_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT} participants*`;

    static GROUP_CHAT_EMPTY_MESSAGE = "*The group chat's name cannot be empty*";
    static GROUP_NAME_MIN_LENGTH_MESSAGE = `*Group name has to be atleast ${this.GROUP_NAME_MIN_LENGTH} characters long*`;
    static GROUP_NAME_MAX_LENGTH_MESSAGE = `*Group name can be atmost ${this.GROUP_NAME_MAX_LENGTH} characters long*`;

    static GROUP_CHAT_NAME_ALREADY_TAKEN_MESSAGE(name) {
        return `*The name '${name}' is already taken. Try another name for the group chat*`;
    }
}