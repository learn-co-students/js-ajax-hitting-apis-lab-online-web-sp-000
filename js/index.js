// your code here
// Create a form with a username field that calls a getRepositories function 
// that loads the repositories div with a list of public repositories for that user. 
// The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).

function getRepositories() {
    const username = document.getElementById("username").value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open("GET", `https://api.github.com/users/${username}/repos`);
    req.send();
  }

  function displayRepositories() {
    const repos = JSON.parse(this.responseText);
    const repoDisplay =
      '<ul>' +
      repos.map(repo => {
          const dataUsername = 'data-username="' + repo.owner.login + '"';
          const dataRepoName = 'data-repository="' + repo.name + '"';
          return `
            <li>
              <h4>${repo.name}</h4>
              <a href="${repo.html_url}">${repo.html_url}</a><br>
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
              <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
            </li>`;
        })
        .join('') +
      '</ul>';
    document.getElementById('repositories').innerHTML = repoDisplay;
}


function getCommits(el) {
    const username = document.getElementById('username').value;
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', `https://api.github.com/repos/${username}/${name}/commits`);
    req.send();
}

// displayCommits function that fills the `details` div with a list of commits for that repository. 
// The display of commits should include the author's Github name, the author's full name, and the
// commit message. Give the link data attributes of `username` and `repository` to
// be used by the `getCommits` function.

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    console.log(commits);

    const commitsList = `<ul>${commits.map(
            commit =>
                '<li><strong>' +
                commit.author.login +
                '</strong> - ' +
                commit.commit.author.name +
                '</strong> - ' +
                commit.commit.message +
                '</li>'
        )
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = commitsList;
  }

  // `getBranches` function when clicked and, when complete, 
  // calls a `displayBranches` function that fills the `details` div with a 
  // list of names of each branch of the repository. 
  // Give the link data attributes of `username` and `repository` for use by the `getBranches`
  function getBranches(el) {
    const username = document.getElementById('username').value;
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', `https://api.github.com/repos/${username}/${name}/branches`);
    req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    console.log(branches);
    const branchesList = `<ul>${branches.map(
            branch =>
                '<li><strong>' +
                branch.name +
                '</strong>' +
                '</li>'
        )
        .join('')}</ul>`;
    document.getElementById('details').innerHTML = branchesList;  }