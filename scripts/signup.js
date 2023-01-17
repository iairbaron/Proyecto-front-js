console.log("validar formulario desde SignUp" + validarFormulario());
import {validarFormulario} from "./utils.js";



window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const inputNombre = document.querySelector("#inputNombre");
  const inputApellido = document.querySelector("#inputApellido");
  const inputEmail = document.querySelector("#inputEmail");
  const inputPassword = document.querySelector("#inputPassword");
  const inputPasswordRepetida = document.querySelector(
    "#inputPasswordRepetida"
  );
  const form = document.querySelector("form");
  const url = "http://todo-api.ctd.academy:3000/v1/users";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const datos = {
      firstName: inputNombre.value,
      lastName: inputApellido.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };
    console.log(datos);
    const settings = {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    };
    if(validarFormulario()){
      realizarRegister(settings)}
    ;
    form.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    if (validarNombre()) {
      fetch(url, settings)
        .then((response) => {
          return response.json();
        })
        .then((datos) => {
          console.log(datos);
          if (datos.jwt) {
            localStorage.setItem("jwt", JSON.stringify(datos.jwt));
            location.replace("index.html");
          }
        });
    }
  }
});
