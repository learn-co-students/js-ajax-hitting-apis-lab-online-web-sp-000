function getRepositories() {
  const user = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${user}/repos`);
  req.send();
}
const repoList = [];

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r => '<li>' + r.name + ' ' + r.owner.login + ' - <a href="' + r.html_url
      + '">Get Repos</a></li>' +
      `<a href="#" onclick="getCommits(this)" data-repository="${r.name}" data-username="${r.owner.login}">Get commits</a>`
       + ' ' + `<a href="#" onclick="getBranches(this)" data-repository="${r.name}" data-username="${r.owner.login}">Get branches</a>`
      )
    .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  console.log(repoName);
  console.log(userName);
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + userName + '/' + repoName + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + ' ' + commit.commit.author.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}




function getBranches(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + userName + '/' + repoName + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

// function displayCommits() {
//   const commits = JSON.parse(this.responseText);
//   const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + ' ' + commit.commit.author.name + '</li>').join('')}</ul>`;
//   document.getElementById('details').innerHTML = commitsList;
// }
