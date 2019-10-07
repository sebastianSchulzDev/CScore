var today = new Date();
today = today.toISOString().substring(0, 10);

function addMatchesToUI(matchList) {
  var matchesDiv = document.getElementById("scores");

  matchList.forEach(match => {
    matchesDiv.appendChild(createMatchDiv(match));
  });
}

function createMatchDiv(match) {
  var element = document.createElement("div");
  var matchDate = new Date(match.utcDate);
  var statusClass = getStatusClass(match.status);
  var elHtml =
    `<div class="match ` +
    statusClass +
    `">
      <span class="hour">` +
    matchDate.getHours() +
    ":" +
    (matchDate.getMinutes() === 0 ? "00" : matchDate.getMinutes()) +
    `</span>
      <span class="team">` +
    match.homeTeam.name +
    `</span>
    <span>` +
    (match.score.fullTime.homeTeam || 0) +
    `:` +
    (match.score.fullTime.awayTeam || 0) +
    `</span>
      <span class="team1">` +
    match.awayTeam.name +
    `</span>
  </div>`;

  element.innerHTML = elHtml;
  return element;
}

function clearMatches() {
  var matchesDiv = document.getElementById("scores");
  matchesDiv.innerHTML = "";
}

function getStatusClass(status) {
  if (isMatchFinished(status)) return "finished";
  else if (isMatchLive(status)) return "in-play";
  else return "scheduled";
}

function getRequestedDate() {
  return today;
}

async function loadData() {
  clearMatches();

  const date = getRequestedDate();
  try {
    const matches = await fetchMatchesAsync(date);
    addMatchesToUI(matches);
  } catch (err) {
    showIntervalError();
  }
}

function showIntervalError() {
  clearInterval(intervalId);
  setTimeout(initSite, 30000);
  var matchesDiv = document.getElementById("scores");

  matchesDiv.innerHTML =
    "Wystąpił bład podczas ładowania danych. Ponowna próba nastąpi za 30 sekund";
}

var intervalId;
function initSite() {
  loadData();
  intervalId = setInterval(loadData, 20000);
}

initSite();
