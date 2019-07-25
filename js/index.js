// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  const user = document.querySelector('#username').value;
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${user}/repos`);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos.map(r => '<li>' + `<a href= ${r.html_url}>${r.name}</a>` + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(e) {
  const repo = e.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${e.dataset.username}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.committer.login  + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(e) {
  const repo = e.dataset.repository;
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
