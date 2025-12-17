// Espera a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts');

  fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => {
      postsContainer.innerHTML = ''; // Limpiar el contenedor

      posts.reverse().forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        
        postElement.innerHTML = `
          <div class="postHeader">
            <strong>${post.nombre}</strong> <span>(${post.fecha})</span>
          </div>
          <div class="postBody">
            <p>${post.contenido}</p>
          </div>
        `;

        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => {
      console.error('Error al obtener publicaciones:', error);
      postsContainer.innerHTML = '<p>Error al cargar las publicaciones.</p>';
    });
});
