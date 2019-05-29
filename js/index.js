// your code here
function getRepositories(){
  const req = new XMLHttpRequest();
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}


 function displayCommits(){
   const commits = JSON.parse(this.responseText);
   // console.log(commits[0]);
  const commitsList = `<ul>${commits
  .map(
    commit =>
      '<li>' +
      commit.commit.author.name +

      commit.author.login +

      commit.commit.message +
      '</li>'
  )
  .join('')}</ul>`;
 document.getElementById('details').innerHTML = commitsList;
}
//   //  const commitsList = {commits
//   //    .map(
//   //      commit =>
//   //        commit.author.name
//   //        // '</strong> - ' +
//   //        // commit.commit.message +
//   //        // '</li>'
//   //    )
//   //    .join('')}</ul>`;
//   //  document.getElementById('details').innerHTML = commitsList;
//


function displayRepositories(){
  var repos = JSON.parse(this.responseText);
    // console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.html_url +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
 const name = el.dataset.repository;
  // console.log(el);
 const req = new XMLHttpRequest();
 req.addEventListener('click', displayCommits);
 req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
 req.send();
}

// function getBranches(el){
//   const name = el.dataset.repo;
//   const req = new XMLHttpRequest();
//   req.addEventListener('click', displayBranches);
//   req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/branches');
//   req.send();
//
// }
//
//
function displayBranches(){
 var branches = JSON.parse(this.responseText);
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
//
// function displayRepositories(){
//
// }

function getBranches(el){
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/branches');
  req.send();
}
