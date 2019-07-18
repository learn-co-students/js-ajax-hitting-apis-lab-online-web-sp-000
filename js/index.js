// // your code here
//
// let url = 'https://api.github.com'
//
// function getUsername() {
//   return document.querySelector('#username').value
// }
//
// function getRepositoires () {
//   let username = getUsername()
//
//   let request = new XMLHttpRequest()
//   request.addEventListener('load', loadRepositores)
//   request.open('GET', `https://api.github.com/users/${username}/repos`, true)
//   request.send()
// }
//
// function displayRepositories() {
//   let respond = JSON.parse(this.responseText)
//   let respondList = '<ul>' + .map(respond => {
//     const dataUsername = 'data-username="' + respond.owner.login + '"';
//     const dataRepoName = 'data-repository="' + respond.name + '"';
//
//     return `
//       <li> +
//         <h3>${respond.name}</h3>
//         <a href="${respond.html_url}">${respond.html_url}</a><br>
//         <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
//         <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
//       </li>`;
//   })
//   .join('') + '</ul>';
//    document.getElementById('repositories').innerHTML = respondList;
// }
//
//
// function displayCommits(){
//   const commits = JSON.parse(this.responseText);
//   const commitsList = `<ul>${commits
//     .map(
//       commit =>
//         '<li><strong>' + '(' +
//         commit.author.login + ')' +
//         '<li><strong>' +
//         commit.commit.author.name +
//         '</strong> - ' +
//         commit.commit.message +
//         '</li>'
//     ).join('')}</ul>`;
//   document.getElementById('details').innerHTML += commitsList;
// }
//
//
// function getCommits(el){
//   const name = el.dataset.repo;
//   const user = el.dataset.username;
//   const req = new XMLHttpRequest();
//   req.addEventListener('load', displayCommits);
//   req.open('GET', `https://api.github.com/repos/${user}/${name}/commits`);
//   req.send();
// }
//






function getRepositories() {
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  // console.log(repos);
  // debugger
  const repoList =
    '<ul>' +
    repos.map(r => {
      const dataUser = 'data-username ="' + r.owner.login + '"';
      const dataRepo = 'data-repository ="' + r.name + '"';
      return `<li>
        <a href="${r.html_url}"${r.html_url}>${r.name}</a>
        <br>
        <a href="#" ${dataRepo} ${dataUser} onclick="getCommits(this)">List Commits</a><br>
        <a href="#" ${dataRepo} ${dataUser} onclick="getBranches(this)">Get Branches</a></li>`;
    })
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(elem) {
  const user = elem.dataset.username;
  const repo = elem.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${user}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.author.login +
        ' - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(elem) {
  const user = elem.dataset.username;
  const repo = elem.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + user + '/' + repo + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
