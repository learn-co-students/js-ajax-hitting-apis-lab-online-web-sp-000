// your code here
function displayCommits(){
    var commits = JSON.parse(this.responseText);
    const commitsList = `<ul>
        ${commits.map(r => 
            '<li>' + r.committer.login + ' (' + r.commit.committer.name + ') - ' + r.commit.message + '</li>').join('')}
    </ul>`;
    document.getElementById('details').innerHTML = commitsList;
}
function getCommits(el){
    const name = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', `https://api.github.com/repos/${el.dataset.username}/${name}/commits`);
    req.send();
}
function displayRepositories(){
    var repos = JSON.parse(this.responseText);
    const repoList = `<ul>
        ${repos.map(r => 
            '<li>' + r.name + ` <a href="${r.html_url}">` + r.html_url + '</a> - <a href="#" data-repository="' +
            r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-username="' +
            r.owner.login + '" data-repository="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}
    </ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}
function displayBranches(){
    var branches = JSON.parse(this.responseText);
    const branchesList = `<ul>
        ${branches.map(b =>
            '<li>' + b.name + '</li>').join('')}
    </ul>`;
    document.getElementById('details').innerHTML = branchesList;
}
function getBranches(el){
    const name = el.dataset.repository;
    const user = el.dataset.username;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', `https://api.github.com/repos/${user}/${name}/branches`);
    req.send();
}
function getRepositories(){
    console.log("HELLO");
    console.log("FIN");
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories);
    req.open('GET', `https://api.github.com/users/${document.getElementById('username').value}/repos`);
    req.send();
}