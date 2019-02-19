
function displayBranches() {
  const branches = JSON.parse(this.responseText)
  str = '<ul>'
  branches.forEach(b => {
    str += '<li>'
    str += b.name
    str += '</li>'
  });
  document.getElementById("details").innerHTML = str + "</ul>";
}

function getBranches(el) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open(
    "GET",
    `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/branches`
  );
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  str = '<ul>'
  commits.forEach(c => {
    str += '<li>'
    str += c.author ? c.author.login : "no author provided"
    str += ` (${c.commit.author.name}) - ${c.commit.message}`
    str += '</li>'
  });
  document.getElementById("details").innerHTML = str + "</ul>";
}

function getCommits(el) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  let url = `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/commits`
  req.open("GET", url);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  let str = "<ul>";
  repos.forEach(repo => {
    let li = `<a href="${repo.html_url}">${repo.name}</a>`;
    li += ` - <a href="#" onclick="getCommits(this)" data-repository="${repo.name}" data-username="${repo.owner.login}">Commits</a>`;
    li += ` - <a href="#" onclick="getBranches(this)" data-repository="${repo.name}" data-username="${repo.owner.login}">Branches</a>`
    str += `<li>${li}</li>`;
  });
  document.getElementById("repositories").innerHTML = str + "</ul>";
}

function getRepositories() {
  let username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}
