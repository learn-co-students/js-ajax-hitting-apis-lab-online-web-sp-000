// your code here
const rootUrl = 'https://api.github.com';


function getRepositories(){
  const userName = document.getElementById('username').value
  console.log(userName)
  const repoUrl = rootUrl + '/users/' + userName + '/repos';
  const xhrRequest = new XMLHttpRequest();
  xhrRequest.addEventListener('load', displayRepositories )
  xhrRequest.open("GET", repoUrl);
  xhrRequest.send();
  // return false;
}//end

// function displayRepositories(){
//
//   const repos = JSON.parse(this.responseText)
//   console.log(repos)
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//   // const repoList =
//     // '<ul>' +
//     // repos
//     //   .map(repo => {
//     //     const userName = 'data-username="' + repo.owner.login + '"';
//     //     const repoName = 'data-repository="' + repo.name + '"';
//     //     return `
//     //       <li>
//     //         <h2>${repo.name}</h2>
//     //         <a href="${repo.html_url}">${repo.html_url}</a><br>
//     //         <a href="#" ${repoName} ${userName} onclick="getCommits(this)">Get Commits</a><br>
//     //         <a href="#" ${repoName} ${userName} onclick="getBranches(this)">Get Branches</a></li>
//     //       </li>`;
//     //   })
//     //   .join('') +
//     // '</ul>';
//   // document.getElementById('repositories').innerHTML = repoList;
// }//end
//
//
function getCommits(el){
  const repoName =  el.dataset.repository;
  const commitsUrl = rootUrl + '/repos/' + el.dataset.username + '/'  + repoName + '/commits'
  const xhrRequestCommits = new XMLHttpRequest();
  xhrRequestCommits.addEventListener("load", displayCommits)
  xhrRequestCommits.open("GET", commitsUrl)
  xhrRequestCommits.send();
} //end


function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList =
    '<ul>' +
    repos
      .map(repo => {
        const dataUsername = 'data-username="' + repo.owner.login + '"';
        const dataRepoName = 'data-repository="' + repo.name + '"';
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}


function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList =
  `<ul>
  ${commits
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
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
} //edn

function getBranches(el){
  const repoNameForBranches = el.dataset.repository;
  const branchesUrl = rootUrl + '/repos/' + el.dataset.username + '/'  + repoNameForBranches + '/branches'
  const xhrRequestBranches = new XMLHttpRequest();
  xhrRequestBranches.addEventListener("load", displayBranches)
  xhrRequestBranches.open("GET", branchesUrl)
  xhrRequestBranches.send();

} //end

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
} //end
