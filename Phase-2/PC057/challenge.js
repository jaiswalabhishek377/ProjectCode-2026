// Challenge 1 — Fetch Single User
// When button clicked:
// - Fetch user 1 from JSONPlaceholder
// - Display: name, email, phone, website
// - Show loading state while fetching
// - Handle errors

async function fetchUser() {
  // Your code here
  const loading = document.getElementById('loading');
  loading.style.display = 'block'; // Show loading state

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const user= await response.json();
    const userInfo = `Name: ${user.name}
Email: ${user.email}
Phone: ${user.phone}
Website: ${user.website}`;
    document.getElementById('user-info').textContent = userInfo;
    //other way to display user info
    // const userInfoDiv = document.getElementById('user-info');
    // userInfoDiv.innerHTML = `
    //   <h3>${user.name}</h3>
    //   <p>Email: ${user.email}</p>
    //   <p>Phone: ${user.phone}</p>
    //   <p>Website: ${user.website}</p>
    // `;
  } catch (error) {
    console.error('Failed to load user:', error);
    document.getElementById('user-info').textContent = `Failed to load user: ${error.message}`;
  } finally {
    loading.style.display = 'none'; // Hide loading state
  }
}

document.getElementById('fetch-user-btn').addEventListener('click', fetchUser);


// Challenge 2 — Fetch All Posts (First 10)
// When button clicked:
// - Fetch posts from JSONPlaceholder
// - Display first 10 posts (title and body)
// - Show loading state
// - Handle errors

async function fetchPosts() {
  // Your code here
  const loading = document.getElementById('posts-loading');
  loading.style.display = 'block'; // Show loading state
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const posts = await response.json();
    const postsDiv = document.getElementById('posts-list');
    postsDiv.innerHTML = ''; // Clear existing content
    posts.slice(0, 10).forEach(post => {                             // slice(0, 10) to get first 10 posts
      const postCard = document.createElement('div');
      postCard.className = 'post-card';  //
      postCard.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      postsDiv.appendChild(postCard);
    });
  } catch (error) {
    console.error('Failed to load posts:', error);
    document.getElementById('posts-list').innerHTML = 
      `<p class="error">Failed to load posts: ${error.message}</p>`;
  } finally {
    loading.style.display = 'none'; // Hide loading state
  }
}

document.getElementById('fetch-posts-btn').addEventListener('click', fetchPosts);


// Challenge 3 — Random Dog Image
// When button clicked:
// - Fetch from: https://dog.ceo/api/breeds/image/random
// - Display the image
// - Show loading text while fetching
// - Handle errors

async function fetchDogImage() {
  // Your code here
  const loading = document.getElementById('dog-loading');
  loading.style.display = 'block'; // Show loading text
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    if(!response.ok){
      throw new Error(`HTTP error Status: ${response.status}`);
    }
    const data =await response.json();
    const dogImage= document.getElementById('dog-image');
    dogImage.src = data.message;
    dogImage.alt = 'Random Dog';
  } catch (error) {
    console.error('Failed to load dog image:', error);
    document.getElementById('dog-image').alt = `Failed to load dog image: ${error.message}`;
  } finally {
    loading.style.display = 'none'; // Hide loading text
  }
}

document.getElementById('fetch-dog-btn').addEventListener('click', fetchDogImage);


// Challenge 4 — GitHub User Search
// When search button clicked:
// - Get username from input
// - Fetch from: https://api.github.com/users/{username}
// - Display: avatar, name, bio, public_repos, followers
// - Handle user not found (404)
// - Handle empty input

async function searchGitHubUser() {
  // Your code here
  const usernameInput = document.getElementById('github-username');
  const username = usernameInput.value.trim();
  if (!username) {
    document.getElementById('github-user-info').textContent = 'Please enter a GitHub username.';
    return;
  }
  const loading = document.getElementById('github-loading');
  loading.style.display = 'block';
  try {
    const response= await fetch(`https://api.github.com/users/${username}`);
    if(!response.ok){
      if(response.status === 404){
        throw new Error('User not found');
      }
    }
    const user = await response.json();
    const userInfoDiv= document.getElementById('github-user-info');
    userInfoDiv.innerHTML=`
      <img src="${user.avatar_url}" alt="${user.login}'s avatar" class="avatar">
      <h3>${user.name || user.login}</h3>
      <p>${user.bio || 'No bio available'}</p>
      <p>Public Repos: ${user.public_repos}</p>
      <p>Followers: ${user.followers}</p>
    `;
  } catch (error) {
    document.getElementById('github-user-info').innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
  finally {
    loading.style.display = 'none';
  }
}

document.getElementById('search-github-btn').addEventListener('click', searchGitHubUser);


// Challenge 5 — Pokémon Info
// When fetch button clicked:
// - Get Pokémon name from input
// - Fetch from: https://pokeapi.co/api/v2/pokemon/{name}
// - Display: name, sprite (image), height, weight, types
// - Handle Pokémon not found
// - Handle empty input

async function fetchPokemon() {
  // Your code here
  const pokemonInput = document.getElementById('pokemon-name');
  const pokemonName = pokemonInput.value.trim().toLowerCase();
  if (!pokemonName) {
    document.getElementById('pokemon-info').textContent = 'Please enter a Pokémon name.';
    return;
  }
  const loading = document.getElementById('pokemon-loading');
  loading.style.display = 'block';
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }
    const pokemon = await response.json();
    const pokemonInfoDiv = document.getElementById('pokemon-info');
    pokemonInfoDiv.innerHTML = `
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="sprite">
      <p>Height: ${pokemon.height}</p>
      <p>Weight: ${pokemon.weight}</p>
      <p>Types: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    `;
  } catch (error) {
    document.getElementById('pokemon-info').innerHTML = `<p class="error">Error: ${error.message}</p>`;
  } finally {
    loading.style.display = 'none';
  }
}

document.getElementById('fetch-pokemon-btn').addEventListener('click', fetchPokemon);


// Challenge 6 — Fetch Multiple Users in Parallel
// Create a function that:
// - Fetches users 1, 2, and 3 from JSONPlaceholder
// - Uses Promise.all to fetch in parallel
// - Returns array of user objects
// - Times the operation

async function fetchMultipleUsers() {
  // Your code here
  const startTime = performance.now();
  try {
    const userIds = [1, 2, 3];
    const userPromises = userIds.map(id => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch user ${id}: ${response.status}`);
      }
      return response.json();
    }));
    const users = await Promise.all(userPromises);
    const endTime = performance.now();
    const resultDiv = document.getElementById('multi-users-info');
    resultDiv.innerHTML = `
      <p><strong>Time taken:</strong> ${(endTime - startTime).toFixed(2)} ms</p>
      ${users.map(user => `
        <div class="card">
          <h3>${user.name}</h3>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
        </div>
      `).join('')}
    `;
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    document.getElementById('multi-users-info').innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

document.getElementById('fetch-multiple-users-btn').addEventListener('click', fetchMultipleUsers);


// Challenge 7 — Posts with Pagination
// Create a pagination system:
// - Fetch 5 posts per page
// - Add "Next Page" and "Previous Page" buttons
// - Display current page number
// - Disable buttons when appropriate

let currentPage = 1;

async function fetchPostsPage(page) {
  // Your code here
  const loading = document.getElementById('pagination-loading');
  loading.style.display = 'block';
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
    const posts = await response.json();
    // Process and display posts
    const postsDiv = document.getElementById('pagination-posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'post-card';
      postCard.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;
      postsDiv.appendChild(postCard);
    });
    // Update pagination controls
    document.getElementById('current-page').textContent = `Page ${page}`;
    document.getElementById('prev-page-btn').disabled = page === 1;
    document.getElementById('next-page-btn').disabled = posts.length < 5; // Disable if less than 5 posts fetched
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    loading.style.display = 'none';
  }
}

document.getElementById('prev-page-btn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    fetchPostsPage(currentPage);
  }
});

document.getElementById('next-page-btn').addEventListener('click', () => {
  currentPage += 1;
  fetchPostsPage(currentPage);
});

fetchPostsPage(currentPage);
