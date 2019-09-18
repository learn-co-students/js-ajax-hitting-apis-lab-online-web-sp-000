// your code here
const rootUrl = 'https://api.github.com/'

function getRepositories () {
  const req = new XMLHttpRequest
  let username = document.querySelector('input[id="username"]').value
  req.addEventListener('load', displayRepositories)
  req.open('get', rootUrl + 'users/' + username + '/repos')
  req.send()
}

function displayRepositories (){
  const repos = JSON.parse(this.responseText)
  const repoList = 
    '<ul>' +
    repos.map (
      repo => {
        const dataName = "data-name='" + repo.owner.login + "'"
        const dataRepo = "data-repo='" + repo.name + "'"
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataName} ${dataRepo} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataName} ${dataRepo} onclick="getBranches(this)">Get Branches</a><br>
          </li>`;
      })
      .join("") +
      '</ul>';

  document.getElementById('repositories').innerHTML = repoList
}

function getCommits (el) {
  const name = el.dataset.repo;
  const uri = rootUrl + 'repos/' + el.dataset.username + '/' + el.dataset.repository + '/commits'
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', uri);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitList = '<ul>' + commits
    .map(
      commit => 
        '<li><h3>' +
        commit.commit.author.name +
        ' (' +
        commit.author.login +
        ')</h3>' +
        commit.commit.message +
        '</li>'
    )
    .join('') + '</ul>';
    document.getElementById('details').innerHTML = commitList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const uri =
    rootUrl + 'repos/' + el.dataset.username + '/' + repoName + '/branches';
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
