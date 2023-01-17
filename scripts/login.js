window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const inputEmail = document.querySelector("#inputEmail");
  const inputPassword = document.querySelector("#inputPassword");
  const form = this.document.querySelector("form");
  const url = `http://todo-api.ctd.academy:3000/v1/users/login`;

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const datos = {
      email: inputEmail.value,
      password: inputPassword.value,
    };

    const config = {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(datos);

    realizarLogin(config);

    form.reset;
  });

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarLogin(config) {
    console.log("lanzando consulta");
    fetch(url, config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("promesa cumplida");
        console.log(data);

        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
           location.replace("./mis-tareas.html");
        }
      });
  }
});
