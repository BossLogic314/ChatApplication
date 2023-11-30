export default class Constants {
    static BASE_YEAR = 1900;
    static BASE_MONTH = 1;

    static MINIMUM_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT = 2;
    static MAXIMUM_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT = 5;

    static INVALID_NUM_OF_GROUP_CHAT_PARTICIPANTS_MESSAGE =
        `*Each group chat must contain atleast ${Constants.MINIMUM_NUM_OF_PARTICIPANTS_IN_GROUP_CHAT} participants*`;

    static GROUP_CHAT_EMPTY_MESSAGE = "*The group chat's name cannot be empty*";

    static GROUP_CHAT_NAME_ALREADY_TAKEN_MESSAGE(name) {
        return `*The name '${name}' is already taken. Try another name for the group chat*`;
    }

    static USERNAME_ALREADY_TAKEN_MESSAGE(name) {
        return `*The name '${name}' is already taken. Try another username*`;
    }
}