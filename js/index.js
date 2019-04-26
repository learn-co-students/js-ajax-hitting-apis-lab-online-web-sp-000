// your code here

function getRepositories() {
  const req = new XMLHttpRequest();
  let userData = document.querySelector('#username').value;

  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${userData}/repos`);
  req.send();
}


function displayRepositories() {
  var repos = JSON.parse(this.responseText);

  const repoList = `<ul> ${repos.map(
    repo => '<li>' + '<a href="' +
     repo.html_url +
      '">' +
       repo.name +
  '</a> <a href="#" data-username="'+
   repo.owner.login +
   '" data-repository="' +
   repo.name +
   '" onclick="getCommits(this)">Get Commits</a></li>' ).join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const request = new XMLHttpRequest;
  let uri = `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/commits`;
  request.addEventListener('load', displayCommits);
  request.open('GET', uri);
  request.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const uri = `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/branches`;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', uri);
  xhr.send();
}
function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
