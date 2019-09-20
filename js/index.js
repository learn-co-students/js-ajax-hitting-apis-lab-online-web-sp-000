// your code here

function getRepositories() {
  const username = document.getElementById("username").value;
  console.log(username);
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        '<a href="' +
        r.html_url +
        '">' +
        r.name +
        '"</a> <a href="#" data-username="' +
        r.owner.login + 
        '" data-repository="' + 
        r.name +
        '" onclick="getCommits(this)">Get Commits</a>' + 
        ' <a href="#" data-username="' +
        r.owner.login + 
        '" data-repository="' +
        r.name + 
        '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open(
    "GET",
    "https://api.github.com/repos/" + username + "/" + name + "/commits"
  );
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits
    .map(
      commit =>
        "<li>" +
        commit.commit.committer.name +
        " - " +
        commit.author.login +
        " - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = commitList;
}

function getBranches(el){
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open(
    "GET",
    "https://api.github.com/repos/" + username + "/" + name + "/branches"
  );
  req.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches
    .map(
      branch => 
        "<li>" +
        branch.name +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}