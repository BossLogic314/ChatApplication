export default class Constants {

    // (Database value - base value) gives the actual value of time
    static BASE_YEAR = 1900;
    static BASE_MONTH = 1;

    // Maximum allowed length of username
    static USERNAME_MAX_LENGTH = 10;

    // Error messages while authentication
    static USERNAME_EMPTY_MESSAGE = '*Username cannot be empty*';

    static PASSWORD_EMPTY_MESSAGE = '*Password cannot be empty*';

    static USERNAME_LENGTH_MESSAGE = `*Username can be atmost ${this.USERNAME_MAX_LENGTH} characters long*`;

    static INVALID_USERNAME_PASSWORD_MESSAGE = '*Invalid username or password. Please try again*';

    // Group chat participants constants
    static MIN_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT = 2;
    static MAX_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT = 5;

    // Error messages while creating a new group chat
    static INVALID_NUM_OF_GROUP_CHAT_PARTICIPANTS_MESSAGE =
        `*Each group chat must contain atleast ${Constants.MIN_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT} participants*`;

    static GROUP_CHAT_EMPTY_MESSAGE = "*The group chat's name cannot be empty*";

    static GROUP_CHAT_NAME_ALREADY_TAKEN_MESSAGE(name) {
        return `*The name '${name}' is already taken. Try another name for the group chat*`;
    }

    static USERNAME_ALREADY_TAKEN_MESSAGE(name) {
        return `*The name '${name}' is already taken. Try another username*`;
    }
}