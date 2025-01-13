"use strict"

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el botón que ya está en el HTML
    const button = document.getElementById('show-comments');
    
    // Obtener el post
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => res.json())
        .then(respuesta => {
            let h1 = document.createElement('h1');
            h1.textContent = respuesta.title;

            let p = document.createElement('p');
            p.textContent = respuesta.body;

            let div = document.querySelector('.main');
            div.appendChild(h1);
            div.appendChild(p);

            /* En caso de que quisieramos crear el botón desde JavaScript
            // Crear el botón para mostrar comentarios
            let button = document.createElement('button');
            button.textContent = "Mostrar comentarios";
            button.id = "show-comments";
            div.appendChild(button);
            */

            // Agregar evento click al botón
            button.addEventListener('click', () => {
                // Evitar cargar los comentarios más de una vez
                if (!button.dataset.loaded) {
                    fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
                        .then(res => res.json())
                        .then(comentarios => {
                            comentarios.forEach(comentario => {
                                let h2 = document.createElement('h2');
                                h2.textContent = comentario.name;

                                let email = document.createElement('p');
                                email.textContent = comentario.email;

                                let body = document.createElement('p');
                                body.textContent = comentario.body;

                                div.appendChild(h2);
                                div.appendChild(email);
                                div.appendChild(body);
                            });

                            // Marcar los comentarios como cargados
                            button.dataset.loaded = true;
                            button.textContent = "Comentarios cargados";
                        });
                }
            });
        });
});