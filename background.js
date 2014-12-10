chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var queryStringIndex = details.url.indexOf('?');
        if (details.url.indexOf('utm_') > queryStringIndex) {
            var stripped = details.url.replace(
                /([\?\&]utm_(source|medium|term|campaign|content|cid|reader)=[^&#]+)/ig,
                '');
            if (stripped.charAt(queryStringIndex) === '&') {
                stripped = stripped.substr(0, queryStringIndex) + '?' +
                stripped.substr(queryStringIndex + 1)
            }
            return { url: stripped };
        }
        return {};
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);
