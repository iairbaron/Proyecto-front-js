// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  const token = localStorage.getItem("jwt");
  const urlUsers = "http://todo-api.ctd.academy:3000/v1/users";
  const url = "http://todo-api.ctd.academy:3000/v1/tasks";

  const nuevaTarea = this.document.querySelector("#nuevaTarea");

  const formCrearTarea = document.querySelector(".nueva-tarea");
  const btnCerrarSesion = document.querySelector("#closeApp");
  consultarTareas();
  obtenerNombreUsuario();

  let tareas = null;

  if (!token) {
    location.replace("./index.html");
  }

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener("click", function () {
    let pregunta = confirm("Seguro que quiere cerrar sesion?");
    localStorage.removeItem("jwt");
    console.log(localStorage.getItem("jwt"));
    location.replace("./index.html");
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const userInfoP = document.querySelector(".user-info p");
    const config = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
    };
    const getMe = `${urlUsers}/getMe`;
    fetch(getMe, config)
      .then((response) => {
        return response.json();
      })
      .then((datos) => {
        console.log("nombre usuario es " + datos.firstName);
        userInfoP.innerHTML = datos.firstName;
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    const config = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
    };
    fetch(url, config)
      .then((response) => {
        return response.json();
      })
      .then((datos) => {
        console.log(datos);
        tareas = JSON.stringify(datos);

        renderizarTareas(datos);
        botonesCambioEstado();
        botonBorrarTarea();
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener("submit", function (event) {
    event.preventDefault();
    const datos = {
      description: nuevaTarea.value.trim(),
      completed: false,
    };

    const config = {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    fetch(url, config)
      .then((response) => response.json())
      .then((datos) => {
        console.log(datos);
        consultarTareas();
      })
      .catch((error) => console.log(error));

    formCrearTarea.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    let tareasPendientes = document.querySelector(".tareas-pendientes");
    let tareasTerminadas = document.querySelector(".tareas-terminadas");
    tareasPendientes.innerHTML = "";
    tareasTerminadas.innerHTML = "";

    const numeroFinalizadas = document.querySelector("#cantidad-finalizadas");
    let contador = 0;
    numeroFinalizadas.innerText = contador;

    listado.forEach((tarea) => {
      if (tarea.completed) {
        contador++;
        tareasTerminadas.innerHTML += `<li class="tarea">
            <div class="hecha">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>`;
      } else {
        tareasPendientes.innerHTML += `<li class="tarea">
            <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </li>`;
      }
      numeroFinalizadas.innerText = contador;
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    const btnCambioEstado = document.querySelectorAll(".change");

    btnCambioEstado.forEach((boton) => {
      boton.addEventListener("click", function (event) {
        console.log(event);

        const id = event.target.id;
        const urlTareasId = `${url}/${id}`;
        const payload = {};

        if (event.target.classList.contains("incompleta")) {
          payload.completed = false;
        } else {
          payload.completed = true;
        }

        const settingsCambio = {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(payload),
        };
        fetch(urlTareasId, settingsCambio).then((response) => {
          console.log(response.status);
          consultarTareas();
        });
      });
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
    const btnBorrarTarea = document.querySelectorAll(".borrar");
    btnBorrarTarea.forEach((boton) => {
      boton.addEventListener("click", function (e) {
        const id = e.target.id;
        const urlTareasId = `${url}/${id}`;

        const config = {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        };

        fetch(urlTareasId, config).then((response) => {
          console.log(response.status);
          consultarTareas();
        });
      });
    });
  }
});
