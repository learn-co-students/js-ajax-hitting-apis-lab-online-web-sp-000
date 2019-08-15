// your code here
function getRepositories() {
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories() {
  let username = document.getElementById("username").value
  let repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(r => '<li><a href=' + `https://github.com/${username}/${r.name}` + ">" + r.name + '</a> <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>')
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo
  let username = document.getElementById("username").value
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
