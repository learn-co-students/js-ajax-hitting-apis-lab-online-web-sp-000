// your code here
function displayCommits(){
  let commits = JSON.parse(this.responseText);
  const commitsList = `<ul> ${commits.map ( commit =>
  '<li>' + commit.commit.author.name + ' - ' + commit.author.login + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch =>
    '<li>' + branch.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul> ${repos.map( repo => '<li>' + '<a href="' + repo.html_url + '">' + repo.name +
  '</a> <a href="#" data-username="'+ repo.owner.login + '" data-repository="' + repo.name +'" onclick="getCommits(this)">Get Commits</a></li>' ).join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const request = new XMLHttpRequest
  let user = document.getElementById("username").value
  request.addEventListener('load', displayRepositories);
  request.open('GET', `https://api.github.com/users/${user}/repos`);
  request.send();
}

function getCommits(repo) {
  const request = new XMLHttpRequest;
  let url = 'https://api.github.com/repos/' + repo.dataset.username + '/' + repo.dataset.repository + '/commits'
  console.log(repo.dataset.username)
  console.log(repo.dataset.repository)
  console.log(url);
  request.addEventListener('load', displayCommits);
  request.open('GET', url);
  request.send();
}

function getBranches(repo) {
  const request = new XMLHttpRequest;
  let url = 'https://api.github.com/repos/' + repo.dataset.username + '/' + repo.dataset.repository + '/branches'
  request.addEventListener('load', displayBranches);
  request.open('GET', url);
  request.send();

}
