// your code here
function getRepositories() {
  const req = new XMLHttpRequest()
  const userName = document.querySelector('input').value
  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${userName}/repos`)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList =
    `<ul>${repos.map(repo =>
      `<li>
        <a href="${repo.html_url}">${repo.name}</a>
        --
        <a href="#" onclick="getCommits(this)" data-username="${repo.owner.login}" data-repository="${repo.name}">Get Commits</a>
        --
        <a href="#" onclick="getBranches(this)" data-username="${repo.owner.login}" data-repository="${repo.name}">Get Branches</a>
      </li>`).join('')}
    </ul>`
  document.querySelector('#repositories').innerHTML = repoList
}

function getCommits(el) {
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  //req.open('GET', `https://api.github.com/repos/octocat/:name/commits`)
  req.open('GET', `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList =
    `<ul>${commits.map(c =>
      `<li>
        GitHub Name: ${c.author.login} Author's Full Name: ${c.commit.author.name} Message: ${c.commit.message}
      </li>`).join('')}
    </ul>`
  document.querySelector('#details').innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', `https://api.github.com/repos/${el.dataset.username}/${el.dataset.repository}/branches`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList =
    `<ul>${branches.map(b =>
      `<li>
        ${b.name}
      </li>`).join('')}
    </ul>`
  document.querySelector('#details').innerHTML = branchesList
}
