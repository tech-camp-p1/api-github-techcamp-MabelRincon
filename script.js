const APIURL = 'https://api.github.com/users/';

const $main = document.getElementById('main');

export async function getUserHandler(submitEvent) {
    submitEvent.preventDefault();
    const $search = document.getElementById('search');
    const usernameSearch = $search.value;

    getUser(usernameSearch);
    getRepositories(usernameSearch);
}

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        createUserCard(data);
    } catch (error) {
        if (error.response.status == 404) {
            createErrorCard('No se encontro el usuario');
        }
    }
}

async function getRepositories(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created');
        addRepositoriesToCard(data);
    } catch (error) {
        createErrorCard('Error al obtener los repositorios');
    }
}

function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>
                <!--The below div is to be filled by addRepositoriesToCard-->
                <div id="repositories"></div>
            </div>
        </div>
    `;
    $main.innerHTML = cardHTML;
}

function createErrorCard(message) {
    const cardHTML = `
        <div class="card">
            <div class="error-info">
                <h2>${message}</h2>
            </div>
        </div>
    `;
    $main.innerHTML = cardHTML;
}

function addRepositoriesToCard(repositories) {
    const $repositories = document.getElementById('repositories');
    repositories.slice(0, 5).forEach(repository => {
        const $repository = document.createElement('a');
        $repository.classList.add('repository');
        $repository.href = repository.html_url;
        $repository.target = '_blank';
        $repository.innerText = repository.name;
        $repositories.appendChild($repository);
    });
}