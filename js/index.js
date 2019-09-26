// your code here
const gitURL = "https://api.github.com"

function getRepositories() {
  let userName = document.getElementById('username').value
  let repoURL = `${gitURL}/users/${userName}/repos`

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayRepositories)
  req.open("GET", repoURL )
  req.send()
  return false;
}

function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText)

  const repoList = "<ul>" + repos.map(repo => {
    return(`
      <li>
        <h2><a href="${repo.html_url}">${repo.name}</a></h2>
        <span><a href="#" data-repository="${repo.name}" data-username="${repo["owner"]["login"]}" onclick="getCommits(this)">Get Commits</a></span>
        <span><a href="#" data-repository="${repo.name}" data-username="${repo["owner"]["login"]}" onclick="getBranches(this)">Get Branches</a></span>
      </li>`
    )
  }).join('') + "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(element) {
  const repoName = element.dataset.repository
  const userName = element.dataset.username
  const commitsURL = `${gitURL}/repos/${userName}/${repoName}/commits`

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits)
  req.open("GET", commitsURL)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)

  const commitsList = "<ul>" + commits.map(commit => {
    const commitAuthor = commit['author']['login']
    const commitAuthorName = commit['commit']['author']['name']
    const commitMessage = commit['commit']['message']

    return (`
      <li>
        <p><strong>Author's Name:</strong> ${commitAuthorName}</p>
        <strong>${commitAuthor}</strong> - ${commitMessage}
      </li>
    `)
  }).join('') + "</ul>"
  document.getElementById('details').innerHTML = commitsList
}

function getBranches(element) {
  const repoName = element.dataset.repository
  const userName = element.dataset.username
  const branchesURL = `${gitURL}/repos/${userName}/${repoName}/branches`

  const req = new XMLHttpRequest()

  req.addEventListener('load', displayBranches)
  req.open('GET', branchesURL)
  req.send()
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText)

  const branchesList = "<ul>" + branches.map(branch => {
    return(`<li>${branch.name}</li>`)
  }).join('') + "</ul>"
  document.getElementById('details').innerHTML = branchesList
}
