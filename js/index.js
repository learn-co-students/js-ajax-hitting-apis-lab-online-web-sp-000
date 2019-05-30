// your code here
function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(r =>
      '<li> https://github.com/' + r.full_name
      + '<br> <a href="#" data-repo="' +
      r.url
      + '" onclick="getCommits(this)">Get Commits</a></li>'
      + '<br> <a href="#" data-branchUrl="' +
      r.url
      + '" onclick="getBranches(this)">Get Branches</a></li>'
    ).join('')}</ul>`
    debugger;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const inputName = document.querySelector('input#username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/octocat/repos`);
  req.send();
}

function getCommits(el) {
  const repo = el.dataset.repo;
  const name = el.dataset.name;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsData = `<ul>${commits
    .map(commit =>
      '<li>' +
      '/' + commit.author.login + '/' + commit.commit.author.name + '/' + commit.commit.message
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsData;
}

function getBranches(el) {
  const branchUrl = el.dataset.branchUrl;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesData = `<ul>${branches
    .map(branch =>
      '<li>' +
      '/' + branch.name + '/'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesData;
}
