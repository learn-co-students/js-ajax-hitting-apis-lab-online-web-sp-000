// your code here

function getRepositories() {
  //GET /users/:username/repos
  const req = new XMLHttpRequest();
  req.open('GET', 'https://api.github.com/users/' + `${document.getElementById('username').value}` + '/repos' )
  req.send();
  req.addEventListener('load', displayRepositories);
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  //console.log(repos);
  const repoList = '<ul>' + repos.map(repo => {
    const dataRepoName = 'data-repository="' + repo.name + '"';
    const dataUsername = 'data-username="' + repo.owner.login + '"';
    return `<li>
    ${repo.name}
    <a href="${repo.html_url}">${repo.html_url}</a>
    <br>
    <br>
    <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a>
    <br>
    <br>
    <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
    </li>
    <br>`
  }).join('') + '</ul>' 
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  //GET /repos/:owner/:repo/commits
  const uri = 'https://api.github.com' + '/repos/' + el.dataset.username + '/' + el.dataset.repository + '/commits';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayCommits);
  //console.log(el.dataset);
  xhr.open('GET', uri);
  xhr.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits
  .map(individualCommit => 
  '<li><strong>' + 
  individualCommit.author.login +
  ' - ' +
  individualCommit.commit.author.name + 
  '</strong> - ' + 
  individualCommit.commit.message + 
  '</li>').join('')}</ul>`;
  console.log(commitsList);
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  //GET /repos/:owner/:repo/branches
  const uri = 'https://api.github.com' + '/repos/' + el.dataset.username + '/' + el.dataset.repository + '/branches';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  //console.log(el.dataset);
  xhr.open('GET', uri);
  xhr.send();
}


function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches
  .map(branch => 
  '<li><strong>' + 
  branch.name +
  '</strong>' + 
  '</li>').join('')}</ul>`;
  console.log(branchesList);
  document.getElementById('details').innerHTML = branchesList;
}