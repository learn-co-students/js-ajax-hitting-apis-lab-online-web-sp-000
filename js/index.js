function getRepositories(){
    const req = new XMLHttpRequest();
    let name = document.querySelector('#username').value
   
    req.addEventListener('load', displayRepositories);
    req.open('GET', 'https://api.github.com/users/' + name + '/repos')
    req.send();
}

function displayRepositories(){
    const repos = JSON.parse(this.responseText);
    const repoList = '<ul>' +
                    repos.map(r => { 
                       return `<li> ${r.name}<br>
                        <a href="${r.html_url}">${r.html_url}</a>
                        <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a>
                        <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)"}>Get Branches</a></li>`; 
                    }).join('') +
                    '</ul>';
    
    document.getElementById('repositories').innerHTML = repoList;

}

function getCommits(el){
    const repo = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', 'https://api.github.com/repos/' + el.dataset.username + '/' + repo + '/commits');
    debugger;
    req.send();
}

function displayCommits(){
    const commits = JSON.parse(this.responseText);
    let list = `<ul>${commits.map(c => '<li>' + c.commit.author.name + ' (' + c.author.login +')' +  c.commit.message + '</li>').join('')}</ul>`;
    document.getElementById('details').innerHTML = list;

}

function getBranches(el){
    let req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', 'https://api.github.com/repos/'+ el.dataset.username + '/' + el.dataset.repository + '/branches' )
    req.send();
}

function displayBranches(){
    let branches = JSON.parse(this.responseText);
    let list = `<ul> ${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`;

    document.getElementById('details').innerHTML = list;
}


