function getRepositories() {
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayRepositories);

  req.open('GET', 'https://api.github.com/users/octocat/repos');

  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);

  const repoList = `<ul>${repos
    .map(repo => {
      return `
        <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getBranches(this)">Get Branches</a><br>
        </li>`
    })
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(element) {
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayCommits);

  req.open('GET', 'https://api.github.com/repos/' + element.dataset.username + '/' + element.dataset.repository + '/commits');

  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);

  const commitsList = `<ul>${commits
    .map(commit => {
      return `
        <li><strong>
        ${commit.author.login}
        </strong><br>
        ${commit.commit.committer.name}
        ${commit.commit.message}
        </li>
      `
    })
    .join('')}</ul>`;

  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(element) {
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayBranches);

  req.open('GET', 'https://api.github.com/repos/' + element.dataset.username + '/' + element.dataset.repository + '/branches');

  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);

  const branchesList = `<ul>${branches
    .map(branch => {
      return `
        <li><strong>
        ${branch.name}
        </strong><br>
        ${branch.commit.sha}
        ${branch.protected}
        ${branch.protection_url}
        </li>
      `
    })
    .join('')}</ul>`;

  document.getElementById('details').innerHTML = branchesList;
}
