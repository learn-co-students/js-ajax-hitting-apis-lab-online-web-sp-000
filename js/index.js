// your code here
function displayRepositories() {
    var repos = JSON.parse(this.responseText);
    
    const repoList = `<ul>${repos
      .map(
        r =>
          '<li><a href="https://github.com/' + r.full_name +'">' +r.name+'</a>' +
          ' - <a href="#" data-repository="' +
          r.name + 
          '" data-username="' + r.owner.login +'" onclick="getCommits(this)">Get Commits</a>' + 
          ' - <a href="#" data-repository="' +
          r.name + 
          '" data-username="' + r.owner.login +'" onclick="getBranches(this)">Get Branches</a></li>'
      )
      .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
  }

function getRepositories(){
    let url = 'https://api.github.com/users/' + document.getElementById('username').value + '/repos';
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories)
    req.open('GET', url);
    req.send()
}

function getCommits(el) {
    const repo = el.dataset.repository.trim();
    const name = el.dataset.username;
    const req = new XMLHttpRequest();
    let url = 'https://api.github.com/repos/' + name +'/' + repo+'/commits';
    console.log(url)
    req.addEventListener('load', displayCommits);
    req.open('GET', url);
    req.send();
  }
  function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
      .map(
        commit =>
          '<li><strong>' +
          commit.author.login +
          '</strong> - ' + commit.commit.author.name +' - '+
          commit.commit.message +
          '</li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

  function getBranches(el) {
    const repo = el.dataset.repository.trim();
    const name = el.dataset.username;
    const req = new XMLHttpRequest();
    let url = 'https://api.github.com/repos/' + name +'/' + repo+'/branches';
    console.log(url)
    req.addEventListener('load', displayBranches);
    req.open('GET', url);
    req.send();
  }
  function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchList = `<ul>${branches
      .map(
        branch =>
          '<li><strong>' +
          branch.name +
          '</strong></li>'
      )
      .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchList;
  }