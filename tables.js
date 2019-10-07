async function show(league) {
  const standings = await fetchStandingsAsync(league);

  const tableDiv = document.getElementById("table");
  standings.forEach(team => {
    tableDiv.appendChild(createTeamEl(team));
  });
}

function createTeamEl(standing) {
  const teamEl = document.createElement("div");
  teamEl.innerHTML =
    `<div class= "tables_look">` +
    '<span class= "position">' +
    standing.position +
    `</span>` +
    `<span class="team_name">` +
    standing.team.name +
    `</span>` +
    `<span class="won_number">` +
    "Z " +
    standing.won +
    `</span>` +
    `<span class= "draw_number">` +
    "R " +
    standing.draw +
    `</span> ` +
    `<span class= "lost_number">` +
    "P " +
    standing.lost +
    `</span>` +
    `<span class="points_number">` +
    "PKT " +
    standing.points +
    `</span>` +
    `<span class= "goals_for">` +
    "GZ " +
    standing.goalsFor +
    `</span>` +
    `<span class= "goals_against">` +
    "GS " +
    standing.goalsAgainst +
    `</span> ` +
    `<span class="goal_diff">` +
    "RG " +
    standing.goalDifference +
    `</span>` +
    `</div>`;

  return teamEl;
}
