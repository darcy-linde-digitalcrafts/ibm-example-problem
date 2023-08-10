document.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.chess.com/pub/leaderboards")
    .then((res) => res.json())
    .then((data) => addPlayers(data.live_blitz.slice(0, 10)));
});

const addPlayers = (players) => {
  const tableBody = document.querySelector("tbody");
  for (let player of players) {
    const row = document.createElement("tr");
    const rank = document.createElement("td");
    const name = document.createElement("td");
    const username = document.createElement("td");
    const score = document.createElement("td");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const div = document.createElement("div");

    rank.classList.add("rank");
    rank.textContent = player.rank;
    name.classList.add("name");
    a.href = player.url;
    img.src = player.avatar;
    div.textContent = player.name || "Anonymous";
    a.appendChild(img);
    a.appendChild(div);
    name.appendChild(a);
    username.classList.add("username");
    username.textContent = player.username;
    score.classList.add("score");
    score.textContent = player.score;

    row.appendChild(rank);
    row.appendChild(name);
    row.appendChild(username);
    row.appendChild(score);
    tableBody.appendChild(row);
  }
};

const sortTable = (column) => {
  const rowsArray = Array.from(document.querySelectorAll("tbody tr"));
  rowsArray.sort((a, b) => {
    let item1 = a.querySelector(`td.${column}`);
    let item2 = b.querySelector(`td.${column}`);

    if (column === "name") {
      item1 = a.querySelector("div");
      item2 = b.querySelector("div");
    }

    if (column === "rank" || column === "score") {
      const compare = Number(item1.textContent) < Number(item2.textContent);
      return compare ? -1 : 1;
    }
    return item1.textContent.localeCompare(item2.textContent);
  });

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  rowsArray.forEach((row) => tbody.appendChild(row));
};

document.querySelector("#rank").addEventListener("click", () => {
  sortTable("rank");
});

document.querySelector("#name").addEventListener("click", () => {
  sortTable("name");
});

document.querySelector("#username").addEventListener("click", () => {
  sortTable("username");
});

document.querySelector("#score").addEventListener("click", () => {
  sortTable("score");
});
