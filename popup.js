let list = document.getElementById("suggestions");
let sugg_count = document.getElementById("count");
chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
  chrome.tabs.sendMessage(tab[0].id, { message: "get_suggestions" }, function (
    response
  ) {
    let suggestions = response;
    sugg_count.innerHTML = suggestions
      ? "Number of possible words: " + suggestions.length
      : "";
    suggestions.forEach((element) => {
      list.innerHTML += "<li class='hint'>" + element + "</li>";
    });
  });
});
