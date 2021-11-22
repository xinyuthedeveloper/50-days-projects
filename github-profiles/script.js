const APIURL = 'https://api.github.com/users/';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

form.addEventListener("submit", event => {
    event.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

    }
})

async function getUser(username) {
    try {
        const { data } = await axios(`${APIURL + username}`);
        createUserProfile(data)
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard("No profile found with this username");
        }
    }
    
}

function createUserProfile(user) {
    const profileElement = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>
                ${user.bio}
            </p>
            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>
        <div id="repos">
            <a href="#" class="repos">Repo 1</a>
            <a href="#" class="repos">Repo 1</a>
            <a href="#" class="repos">Repo 1</a>
        </div>
        </div>
    </div>
    ` 
    main.innerHTML = profileElement;
}

function createErrorCard(message) {
    const element = `
        <div class="card">
            <h1>${message}</h1>
        </div>
    `
    main.innerHTML = element;
}