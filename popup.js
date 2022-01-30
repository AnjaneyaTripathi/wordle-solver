let list = document.getElementById("suggestions");

chrome.tabs.query({ active: true, currentWindow: true }, function(tab) {
    chrome.tabs.sendMessage(tab[0].id, { "message": "get_suggestions" }, function(response) {
        let suggestions = response;
        suggestions.forEach(element => {
            list.innerHTML += "<li class='hint'>" + element + "</li>";

        });
    });
});