const MATCH_STATUSES = {
  LIVE: ["IN_PLAY", "PAUSED"],
  FINISHED: ["FINISHED", "AWARDED"],
  SCHEDULED: ["POSTPONED", "SCHEDULED", "CANCELED", "SUSPENDED"]
};

const COMPETITIONS = [2001, 2021, 2014, 2002, 2019];

async function fetchAllMatchesAsync(date) {
  const response = await fetch(
    "https://api.football-data.org/v2/matches?dateFrom=" +
      date +
      "&dateTo=" +
      date,
    {
      method: "GET",
      headers: {
        "X-Auth-Token": "a51bec0852834faaa347936a5ed966a3"
      }
    }
  )
    .then(status)
    .then(json);

  return response.matches.filter(competitionsFilter);
}

async function fetchMatchesAsync(date) {
  const response = await fetch(
    "https://api.football-data.org/v2/matches?dateFrom=" +
      date +
      "&dateTo=" +
      date +
      "&status=LIVE",
    {
      method: "GET",
      headers: {
        "X-Auth-Token": "a51bec0852834faaa347936a5ed966a3"
      }
    }
  )
    .then(status)
    .then(json);

  return response.matches.filter(competitionsFilter);
}

async function fetchStandingsAsync(league) {
  const response = await fetch(
    "https://api.football-data.org/v2/competitions/" + league + "/standings",
    {
      method: "GET",
      headers: {
        "X-Auth-Token": "a51bec0852834faaa347936a5ed966a3"
      }
    }
  )
    .then(status)
    .then(json);

  return response.standings.filter(filterTotal)[0].table;
}

function filterTotal(standing) {
  return standing.type === "TOTAL";
}

function competitionsFilter(match) {
  return COMPETITIONS.includes(match.competition.id);
}

function json(response) {
  return response.json();
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function isMatchFinished(status) {
  return MATCH_STATUSES.FINISHED.includes(status);
}

function isMatchLive(status) {
  return MATCH_STATUSES.LIVE.includes(status);
}

function isMatchScheduled(status) {
  return MATCH_STATUSES.SCHEDULED.includes(status);
}
