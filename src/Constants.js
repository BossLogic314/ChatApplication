export default class Constants {

    // (Database value - base value) gives the actual value of time
    static BASE_MONTH = 1;

    // Default profile picture array buffer
    static DEFAULT_DISPLAY_PICTURE_ARRAY_BUFFER =
        [ 255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 255, 226, 1, 216, 73, 67,
            67, 95, 80, 82, 79, 70, 73, 76, 69, 0, 1, 1, 0, 0, 1, 200, 0, 0, 0, 0, 4, 48, 0, 0, 109, 110, 116,
            114, 82, 71, 66, 32, 88, 89, 90, 32, 7, 224, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 97, 99, 115, 112, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 246, 214, 0, 1,
            0, 0, 0, 0, 211, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 100, 101, 115, 99, 0,
            0, 0, 240, 0, 0, 0, 36, 114, 88, 89, 90, 0, 0, 1, 20, 0, 0, 0, 20, 103, 88, 89, 90, 0, 0, 1, 40, 0,
            0, 0, 20, 98, 88, 89, 90, 0, 0, 1, 60, 0, 0, 0, 20, 119, 116, 112, 116, 0, 0, 1, 80, 0, 0, 0, 20,
            114, 84, 82, 67, 0, 0, 1, 100, 0, 0, 0, 40, 103, 84, 82, 67, 0, 0, 1, 100, 0, 0, 0, 40, 98, 84, 82,
            67, 0, 0, 1, 100, 0, 0, 0, 40, 99, 112, 114, 116, 0, 0, 1, 140, 0, 0, 0, 60, 109, 108, 117, 99, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 101, 110, 85, 83, 0, 0, 0, 8, 0, 0, 0, 28, 0, 115, 0, 82, 0, 71,
            0, 66, 88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 111, 162, 0, 0, 56, 245, 0, 0, 3, 144, 88, 89, 90, 32, 0,
            0, 0, 0, 0, 0, 98, 153, 0, 0, 183, 133, 0, 0, 24, 218, 88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 36, 160,
            0, 0, 15, 132, 0, 0, 182, 207, 88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 246, 214, 0, 1, 0, 0, 0, 0, 211,
            45, 112, 97, 114, 97, 0, 0, 0, 0, 0, 4, 0, 0, 0, 2, 102, 102, 0, 0, 242, 167, 0, 0, 13, 89, 0, 0,
            19, 208, 0, 0, 10, 91, 0, 0, 0, 0, 0, 0, 0, 0, 109, 108, 117, 99, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            12, 101, 110, 85, 83, 0, 0, 0, 32, 0, 0, 0, 28, 0, 71, 0, 111, 0, 111, 0, 103, 0, 108, 0, 101, 0,
            32, 0, 73, 0, 110, 0, 99, 0, 46, 0, 32, 0, 50, 0, 48, 0, 49, 0, 54, 255, 219, 0, 67, 0, 10, 7, 7,
            8, 7, 6, 10, 8, 8, 8, 11, 10, 10, 11, 14, 24, 16, 14, 13, 13, 14, 29, 21, 22, 17, 24, 35, 31, 37,
            36, 34, 31, 34, 33, 38, 43, 55, 47, 38, 41, 52, 41, 33, 34, 48, 65, 49, 52, 57, 59, 62, 62, 62, 37,
            46, 68, 73, 67, 60, 72, 55, 61, 62, 59, 255, 219, 0, 67, 1, 10, 11, 11, 14, 13, 14, 28, 16, 16, 28,
            59, 40, 34, 40, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59,
            59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59, 59,
            59, 59, 59, 59, 255, 192, 0, 17, 8, 0, 50, 0, 50, 3, 1, 34, 0, 2, 17, 1, 3, 17, 1, 255, 196, 0, 27,
            0, 1, 0, 2, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 3, 6, 7, 2, 1, 255, 196, 0, 44, 16, 0,
            2, 2, 1, 2, 4, 4, 6, 3, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, 3, 4, 5, 17, 6, 18, 33, 49, 19, 65, 97, 129,
            34, 81, 82, 113, 145, 161, 21, 35, 177, 240, 255, 196, 0, 20, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 255, 196, 0, 20, 17, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 218,
            0, 12, 3, 1, 0, 2, 17, 3, 17, 0, 63, 0, 179, 136, 150, 124, 61, 66, 100, 107, 120, 235, 96, 221, 84,
            150, 219, 230, 64, 220, 126, 224, 88, 233, 188, 34, 247, 212, 182, 230, 218, 212, 134, 27, 138, 212,
            124, 94, 231, 202, 73, 202, 224, 218, 124, 50, 113, 50, 92, 56, 236, 45, 216, 131, 238, 7, 73, 179,
            68, 14, 99, 145, 143, 110, 45, 239, 69, 200, 82, 196, 59, 16, 102, 41, 179, 241, 157, 8, 182, 99,
            100, 1, 179, 176, 101, 111, 80, 54, 219, 253, 51, 88, 128, 136, 136, 9, 39, 79, 204, 108, 12, 250,
            114, 148, 111, 225, 183, 81, 243, 29, 143, 234, 70, 146, 240, 52, 188, 205, 69, 249, 113, 170, 44,
            7, 119, 61, 20, 123, 192, 232, 88, 217, 52, 230, 80, 183, 208, 225, 209, 135, 66, 38, 82, 66, 130,
            73, 0, 14, 164, 153, 174, 96, 112, 190, 86, 39, 199, 252, 155, 210, 199, 184, 164, 29, 143, 231,
            191, 226, 103, 204, 225, 236, 156, 186, 249, 95, 86, 189, 135, 210, 235, 184, 62, 192, 136, 20, 92,
            75, 170, 38, 163, 156, 169, 75, 115, 83, 64, 32, 55, 212, 79, 115, 250, 18, 154, 90, 106, 28, 63,
            159, 167, 169, 177, 144, 91, 80, 238, 245, 245, 3, 238, 59, 137, 87, 1, 17, 16, 45, 52, 45, 29, 181,
            92, 163, 207, 186, 209, 95, 91, 24, 121, 250, 9, 189, 211, 77, 88, 245, 45, 84, 160, 68, 81, 176,
            80, 59, 72, 90, 22, 24, 194, 210, 40, 77, 182, 119, 94, 119, 251, 159, 251, 111, 105, 99, 1, 17, 16,
            62, 77, 75, 137, 116, 20, 161, 78, 118, 34, 114, 215, 191, 246, 214, 59, 47, 168, 244, 155, 116, 241,
            101, 105, 109, 109, 93, 138, 25, 28, 21, 96, 124, 193, 129, 203, 226, 77, 200, 210, 242, 105, 201,
            182, 165, 173, 152, 35, 149, 7, 231, 177, 136, 29, 18, 190, 149, 175, 216, 79, 81, 16, 17, 17, 1, 17,
            16, 32, 216, 171, 226, 55, 194, 59, 159, 40, 136, 129, 255, 217 ];

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
        `*Group chat must contain atleast ${Constants.MIN_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT} participants*`;

    static GROUP_CHAT_EMPTY_MESSAGE = "*The group chat's name cannot be empty*";
    static GROUP_NAME_MIN_LENGTH_MESSAGE = `*Group name has to be atleast ${this.GROUP_NAME_MIN_LENGTH} characters long*`;
    static GROUP_NAME_MAX_LENGTH_MESSAGE = `*Group name can be atmost ${this.GROUP_NAME_MAX_LENGTH} characters long*`;

    static GROUP_CHAT_NAME_ALREADY_TAKEN_MESSAGE(name) {
        return `*The name '${name}' is already taken. Try another name for the group chat*`;
    }
}