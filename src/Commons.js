export default class Commons {

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

        const urlString = url + this.getArgumentsOfUrl(args, 0, args.length);

        xhr.open(requestType, urlString, false);
        xhr.withCredentials = withCredentials;
        xhr.send();

        return result;
    }

    static getDisplayPictureURL(displayPictureArrayBuffer) {
        const uint8Array = new Uint8Array(displayPictureArrayBuffer);
        const blob = new Blob([ uint8Array ]);
        const blobURL = URL.createObjectURL(blob);
        return blobURL;
    }

    static isNameUnique(name) {
        const args = [
            { 'key': 'name', 'value': name },
        ];

        return Commons.makeXhrRequest('GET', 'http://localhost:8080/is-name-unique', args, true, true);
    }
}