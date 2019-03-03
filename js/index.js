// your code here
function getRepositories() {
  let userName = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${userName}/repos`);
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);

  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '- <a href="' + r.html_url + '" data-repo="' + r.name + '" onClick="getCommits(this)">Get Commit</a></li>').join("")}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(obj) {
  const name = obj.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + obj.dataset.username + '/' + name + '/commits');
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.author.login + ", " + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(obj) {
  const name = obj.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + obj.dataset.username + '/' + name + '/branches');
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
