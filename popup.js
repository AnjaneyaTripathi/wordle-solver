let list = document.getElementById("suggestions");
let sugg_count = document.getElementById("count");

const answer_element = document.getElementById("answer");
const check_answer = document.getElementById("check_answer");

let today_solution = "Copying will not help you grow :)"; // Incase they change the key - "Solution" from local storage, then we'll show this message to the user

chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
  chrome.tabs.sendMessage(tab[0].id, { message: "get_answer" }, function (
    response
  ) { 
    response && (today_solution = response);
  });

  chrome.tabs.sendMessage(tab[0].id, { message: "get_unlock_status" }, function (
    response
  ) {
      // If true that means the player 
      // has already unlocked the answer
      response && setAnswer();
  });

  chrome.tabs.sendMessage(tab[0].id, { message: "get_suggestions" }, function (
    response
  ) {
    let suggestions = response;
    sugg_count.innerHTML = suggestions
      ? "Number of possible words: " + suggestions.length
      : "";
    
    suggestions.forEach((element) => {
      let li_element = document.createElement('li');
      li_element.className="hint";
      li_element.innerHTML = element;

      list.appendChild(li_element);
    });
  });
});

const setAnswer = () => {
  answer_element.innerHTML = today_solution;
  check_answer.parentElement.innerHTML = "Well the answer is -";
};

check_answer.addEventListener("click", () => {
  setAnswer();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    chrome.tabs.sendMessage(tab[0].id, { message: "set_unlock_answer" });
  });
});
