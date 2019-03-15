function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  repos.forEach(repo => {
    const repoList = document.querySelector("#repositories").innerHTML += `<li>name: ${repo.name} <br> url: ${repo.html_url}</li>`
  })
}

function getCommits() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits)
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  commits.forEach(commit => {
    const commitList = document.querySelector("#details").innerHTML += `<li>name: ${commit.author.login} <br> full name: ${commit.commit.author.name} <br> commit message: ${commit.commit.message}</li>`
  })
}

function getBranches() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches)
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/branches')
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  console.log(branches);
  branches.forEach(branch => {
    const branchList = document.querySelector("#details").innerHTML += `<li>${branch.name}</li>`
  })
}

// your code here
