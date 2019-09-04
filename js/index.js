function displayRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText);
  console.log(repos)
  const repoList = `<ul>${repos
    .map(r => `<li>${r.name}, <a href="${r.html_url}">Link to Repo</a>, <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a>, <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a></li>`)
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits)
  const commitsList = `<ul>${commits
    .map(
      commit =>
        `<li><strong>${commit.author.login}</strong> - Full Name: ${commit.commit.author.name}, Message: ${commit.commit.message}</li>`
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches)
  const branchesList = `<ul>${branches
    .map(
      branch =>
        `<li><strong>${branch.name}</strong></li>`
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${name}/branches`);
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${document.getElementById('username').value}/repos`);
  req.send();
}
