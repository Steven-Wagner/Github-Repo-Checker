function clickSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        let username = $('#userName').val();
        fetchRepos (username);
    })
}

function fetchRepos (username) {
    let urlWithUsername = `https://api.github.com/users/${username}/repos`
    console.log(`fetching from ${urlWithUsername}`);
    fetch (urlWithUsername)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            convertReposToHTML (responseJson);
        })
        .catch(err => {
            alert(`${err.message}`)
        })
}

function convertReposToHTML (jsonObject) {
    let reposHTML = '';
    jsonObject.forEach(repo => {
        let name = repo['name'];
        let projectUrl = repo['html_url'];
        let projectDescription = '';
        if (repo['description'] === null) {
            projectDescription = 'No Description';
        }
        else {
            projectDescription = repo['description'];
        }
        reposHTML += `<li><h3>${name}</h3><p>${projectDescription}</p><a href=${projectUrl}>${projectUrl}</a></li>`;
    })
    console.log(`converted object to ${reposHTML}`);
    printRepos(reposHTML);
}

function printRepos (reposHTML) {
    $('.results').html(reposHTML)
}

$(RepoChecker);

function RepoChecker () {
    clickSubmit ();
}