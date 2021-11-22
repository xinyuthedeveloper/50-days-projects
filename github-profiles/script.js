const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//Form submit handler that handles search and call getUser function 
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = search.value;

    if(user) {
        getUser(user);
        search.value = '';
    }
})

//API call with the inputted username and pass the response data to create user profile card and another api call for the repos associated with the user
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username')
        }
    }
}

//API call for getting the repos from inputted user
async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    }
}

//Create the div card for user and insert into main
function createUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class="card">
    <div>
      <a href="${user.html_url}" target="blank"><img src="${user.avatar_url}" alt="${user.name}" class="avatar"></a>
    </div>
    <div class="user-info">
      <h2>${userID}</h2>
      ${userBio}
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>
      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
    
}

//Handles error with message passed in
function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

//Get the repos from the user and insert them into the card as links
function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 10)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

