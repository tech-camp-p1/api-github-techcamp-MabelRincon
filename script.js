const APIURL = 'https://api.github.com/users/'

// Declarar las variables de los elementos que se necesitan del DOM

const $main = document.getElementById('main');
const $search = document.getElementById('search');

// Extraer los datos del usuario utilizando la API de GitHub usando try...catch
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username);
    } catch (error) {
        if (error.response.status == 404) {
            createErrorCard('No se encontro el usuario');
        }
    }
}

// Extraer los repositorios del usuario utilizando la API de GitHub usando try...catch

async function getRepositories(username) {
    try {
        const { data } = await axios(APIURL + username + '/repositories?sort=created');
        addRepositoriesToCard(data);
    } catch (error) {
        createErrorCard('Error al obtener los repositorios');
    }
}

// Crear el card del usuario con un div dinámico.

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
                <div id="repos"></div>
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
console.log(cardHTML);
}

// Añadir los repositorios al HTML

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