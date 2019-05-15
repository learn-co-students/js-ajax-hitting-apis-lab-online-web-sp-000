function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos)
  let repoList = "<ul>";

  for (var i = 0; i < repos.length; i++) {
    const repo = repos[i];
    // repoList += '<li><a href="' + repo.html_url + '">' + repo.name + '</a></li>';
    repoList += `
      <li>
        ${repo.html_url}
        <a href="#" data-repository="${repo.name}" onclick="getCommits(this)">Get Commits</a>
        <a href="#" data-repository="${repo.name}" onclick="getBranches(this)">Get Branches</a>
      </li>`;
  }

  repoList += "</ul>";

  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const username = document.getElementById("username").value;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  let commitList = "<ul>";

  for (var i = 0; i < commits.length; i++) {
    const commit = commits[i];
    commitList += `<li>${commit.commit.author.name} - ${commit.author ? commit.author.login : "N/A"} - ${commit.commit.message}</li>`;
  }

  commitList += "</ul>";

  document.getElementById("details").innerHTML = commitList;
}

function getBranches(el) {
  const username = document.getElementById("username").value;
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  let branchList = "<ul>";

  for (var i = 0; i < branches.length; i++) {
    const branch = branches[i];
    branchList += `<li>${branch.name}</li>`;
  }

  branchList += "</ul>";

  document.getElementById("details").innerHTML = branchList;
}
