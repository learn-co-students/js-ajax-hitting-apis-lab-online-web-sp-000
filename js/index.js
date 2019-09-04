function getRepositories() {
  const userName = document.getElementById('username').value;
  const url = 'https://api.github.com/users/' + userName + '/repos';
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayRepositories);
  req.open('GET', url);
  req.send();
}

// function displayRepositories() {
//   //this is set to the XMLHttpRequest object that fired the event
//   console.log(this.responseText);
// }

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        r.html_url +
        ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>' +
        ' - <a href="#" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  const url = 'https://api.github.com/repos/' + userName + '/' + repoName + '/commits';
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', url);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li>' +
        commit.commit.author.name +
        '-' +
        commit.author.login +
        '-' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  const url = 'https://api.github.com/repos/' + userName + '/' + repoName + '/branches';
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', url);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li>' +
        branch.name +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
