// your code here

function getRepositories() {
	const name = document.getElementById('username').value;
	const uri = 'https://api.github.com' + '/users/' + name + '/repos';
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', displayRepositories);
	xhr.open('GET', uri);
	xhr.send()
}

function displayRepositories() {
	const repos = JSON.parse(this.responseText);
	const repoList = `<ul>${repos
		.map(r => {
			const dataUsername = 'data-username="' + r.owner.login + '"';
	        const dataRepoName = 'data-repo="' + r.name + '"';
	        return `
	        	<li>${r.name}
	        	<a href="${r.html_url}">${r.html_url}</a><br>
	        	<a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
	        	<a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a><br>
	        	</li>`}
			).join('')}</ul>`;
		document.getElementById('repositories').innerHTML = repoList;
}

 function getCommits(el) {
	const repoName = el.dataset.repository;
	const uri = 'https://api.github.com' + '/repos/' + el.dataset.username + '/' + repoName + '/commits';
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', displayCommits);
	xhr.open('GET', uri)
	xhr.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li>' +
        commit.commit.author.name +
        ' (' +
        commit.author.login +
        ')' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const uri =
    'https://api.github.com' + '/repos/' + el.dataset.username + '/' + repoName + '/branches';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', uri);
  xhr.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
