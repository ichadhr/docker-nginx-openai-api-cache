// /etc/nginx/js/modify_mistral_body.js

// This function will be called by js_set and must return the new body string
function modifyRequestBody(r) {
    let originalBodyString = '';
    
    if (r.requestBuffer && r.requestBuffer.length > 0) {
        originalBodyString = r.requestBuffer.toString('utf8');
    } else {
        return '';
    }

    try {
        let json_obj = JSON.parse(originalBodyString);
        let bodyWasModified = false;

        if (json_obj.stream_options && typeof json_obj.stream_options === 'object' && json_obj.stream_options.include_usage !== undefined) {
            delete json_obj.stream_options.include_usage;
            if (Object.keys(json_obj.stream_options).length === 0) {
                delete json_obj.stream_options;
            }
            bodyWasModified = true;
        }

        let modifiedBodyString = JSON.stringify(json_obj);

        if (bodyWasModified) {
            return modifiedBodyString;
        } else {
            return originalBodyString;
        }

    } catch (e) {
        // In case of error, return the original body
        return originalBodyString; 
    }
}

export default { modifyRequestBody };