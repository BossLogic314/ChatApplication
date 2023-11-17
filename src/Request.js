export default class Request {

    static getArgumentsOfUrl(args, index, len) {
        if (index >= len) {
            return '';
        }

        if (index == 0) {
            return `?${ args[index].key }=${ args[index].value }` + this.getArgumentsOfUrl(args, index + 1, len);
        }

        return `&${ args[index].key }=${ args[index].value }` + this.getArgumentsOfUrl(args, index + 1, len);
    }

    static makeXhrRequest(requestType, url, args=[], withCredentials=false, jsonReturnFormat=false) {
        const xhr = new XMLHttpRequest();
        var result = null;
        xhr.onload = function() {
            if (xhr.status === 200) {

                if (xhr.responseText != '') {

                    if (jsonReturnFormat) {
                        result = JSON.parse(xhr.responseText);
                    }
                    else {
                        result = xhr.responseText;
                    }
                }
            }
        };

        const urlString = url + Request.getArgumentsOfUrl(args, 0, args.length);

        xhr.open(requestType, urlString, false);
        xhr.withCredentials = withCredentials;
        xhr.send();

        return result;
    }
}