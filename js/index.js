// your code here
function getRepositories() {
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(r => '<li><a href=' + `https://github.com/${r.owner.login}/${r.name}` + ">" + r.name + '</a> <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a> <a href="#" data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const commit_req = new XMLHttpRequest();
  commit_req.addEventListener('load', displayCommits);
  commit_req.open('GET', `https://api.github.com/repos/${username}/${name}/commits`);
  commit_req.send();
}

function displayCommits() {
  let username = document.getElementById("username").value
  let commits_raw = JSON.parse(this.responseText);
  const commits = `<ul>${commits_raw
    .map(r => `<li> ${r.commit.author.name} - ${r.author.login} - ${r.commit.message} </li>`)
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commits;
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  branch_req = new XMLHttpRequest();
  branch_req.addEventListener('load', displayBranches);
  branch_req.open('GET', `https://api.github.com/repos/${username}/${name}/branches`);
  branch_req.send();
}

function displayBranches() {
  let branches_raw = JSON.parse(this.responseText);
  const branches = `<ul>${branches_raw
    .map(r => `<li> ${r.name} </li>`)
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branches;
}
