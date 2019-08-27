// your code here
function displayBranches(){
    const branches = JSON.parse(this.responseText);
    console.log(branches)
    const branchesList = `<ul>${branches
      .map(
        branch =>
          '<li><strong>' +
          branch.name +
          '</strong>' +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;

}

function getBranches(el) {
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/' + el.dataset.username + '/' + name + '/branches');
    req.send();
  }

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          '<li><strong>' +
          commit.author.login +
          ' ' +
         commit.commit.author.name +
          '</strong> - ' +
          commit.commit.message +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

function getCommits(el) {
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + el.dataset.username + '/' + name + '/commits');
    req.send();
  }

function displayRepositories(){
    let repos = JSON.parse(this.responseText);
    
    const repoList = document.createElement('ul')
    for(let repo of repos){
        const repoLiTag = document.createElement('li')
        const repoATag = document.createElement('a')
        const commitATag = document.createElement('a')
        const branchATag = document.createElement('a')

        commitATag.innerText = "get commits"
        commitATag.setAttribute('onclick', 'getCommits(this)')
        commitATag.setAttribute('data-repository', repo.name )
        commitATag.setAttribute('data-username', repo.owner.login)

        branchATag.innerText = "get branches"
        branchATag.setAttribute('onclick', 'getBranches(this)')
        branchATag.setAttribute('data-repository', repo.name )
        branchATag.setAttribute('data-username', repo.owner.login)

        repoATag.innerText = repo.name
        repoATag.setAttribute('href', repo.html_url);

        repoLiTag.appendChild(repoATag)
        repoLiTag.appendChild(commitATag)
        repoLiTag.appendChild(branchATag)

        repoList.appendChild(repoLiTag)
    }
    document.getElementById('repositories').appendChild(repoList);
    // var t0 = performance.now();
    // let repos = JSON.parse(this.responseText);
    // const repoList = `<ul>${repos
    //     .map(
    //     r =>
    //         '<li>' +
    //         r.name +
    //         ' - <a href="#" data-repo="' +
    //         r.name +
    //         '" onclick="getCommits(this)">Get Commits</a></li>'
    //     )
    //     .join('')}</ul>`;
    // document.getElementById('repositories').innerHTML = repoList;
    // var t1 = performance.now();
    // console.log("Call to showRepositories took " + (t1 - t0) + " milliseconds.")
}

function getRepositories(){
    userName = document.querySelector('#username').value
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', `https://api.github.com/users/${userName}/repos`);
    req.send();
}