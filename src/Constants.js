export default class Constants {

    // (Database value - base value) gives the actual value of time
    static BASE_MONTH = 1;

    // Default profile picture array buffer
    static DEFAULT_DISPLAY_PICTURE_ARRAY_BUFFER =
        '255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 255, 226, 1, 216, 73, 67, 67,\
            95, 80, 82, 79, 70, 73, 76, 69, 0, 1, 1, 0, 0, 1, 200, 0, 0, 0, 0, 4, 48, 0, 0, 109, 110, 116, 114,\
            82, 71, 66, 32, 88, 89, 90, 32, 7, 224, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 97, 99, 115, 112, 0, 0, 0, 0,\
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 246, 214, 0, 1, 0, 0,\
            0, 0, 211, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 100, 101, 115, 99, 0, 0, 0,\
            240, 0, 0, 0, 36, 114, 88, 89, 90, 0, 0, 1, 20, 0, 0, 0, 20, 103, 88, 89, 90, 0, 0, 1, 40, 0, 0, 0,\
            20, 98, 88, 89, 90, 0, 0, 1, 60, 0, 0, 0, 20, 119, 116, 112, 116, 0, 0, 1, 80, 0, 0, 0, 20, 114, 84,\
            82, 67, 0, 0, 1, 100, 0, 0, 0, 40, 103, 84, 82, 67, 0, 0, 1, 100, 0, 0, 0, 40, 98, 84, 82, 67, 0, 0,\
            1, 100, 0, 0, 0, 40, 99, 112, 114, 116, 0, 0, 1, 140, 0, 0, 0, 60, 109, 108, 117, 99, 0, 0, 0, 0, 0,\
            0, 0, 1, 0, 0, 0, 12, 101, 110, 85, 83, 0, 0, 0, 8, 0, 0, 0, 28, 0, 115, 0, 82, 0, 71, 0, 66, 88, 89,\
            90, 32, 0, 0, 0, 0, 0, 0, 111, 162, 0, 0, 56, 245, 0, 0, 3, 144, 88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 98,\
            153, 0, 0, 183, 133, 0, 0, 24, 218, 88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 36, 160, 0, 0, 15, 132, 0, 0,\
            182, 207, 88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 246, 214, 0, 1, 0, 0, 0, 0, 211, 45, 112, 97, 114, 97, 0,\
            0, 0, 0, 0, 4, 0, 0, 0, 2, 102, 102, 0, 0, 242, 167, 0, 0, 13, 89, 0, 0, 19, 208, 0, 0, 10, 91, 0, 0,\
            0, 0, 0, 0, 0, 0, 109, 108, 117, 99, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 101, 110, 85, 83, 0, 0, 0,\
            32, 0, 0, 0, 28, 0, 71, 0, 111, 0, 111, 0, 103, 0, 108, 0, 101, 0, 32, 0, 73, 0, 110, 0, 99, 0, 46, 0,\
            32, 0, 50, 0, 48, 0, 49, 0, 54, 255, 219, 0, 67, 0, 10';

    // Allowed lengths of username and password
    static USERNAME_MIN_LENGTH = 4;
    static USERNAME_MAX_LENGTH = 10;
    static PASSWORD_MIN_LENGTH = 4;
    static PASSWORD_MAX_LENGTH = 20;

    // Error messages while authentication and signing up
    static USERNAME_EMPTY_MESSAGE = '*Username cannot be empty*';
    static PASSWORD_EMPTY_MESSAGE = '*Password cannot be empty*';
    static USERNAME_MIN_LENGTH_MESSAGE = `*Username has to be atleast ${this.USERNAME_MIN_LENGTH} characters long*`;
    static USERNAME_MAX_LENGTH_MESSAGE = `*Username can be atmost ${this.USERNAME_MAX_LENGTH} characters long*`;
    static PASSWORD_MIN_LENGTH_MESSAGE = `*Password has to be atleast ${this.PASSWORD_MIN_LENGTH} characters long*`;
    static PASSWORD_MAX_LENGTH_MESSAGE = `*Password can be atmost ${this.PASSWORD_MAX_LENGTH} characters long*`;
    static INVALID_USERNAME_PASSWORD_MESSAGE = '*Invalid username or password. Please try again*';
    static USERNAME_ALREADY_TAKEN_MESSAGE(name) {
        return `*The name '${name}' is already taken. Try another username*`;
    }
    static SIGNUP_SUCCESS_MESSAGE = 'User successfully register!';

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