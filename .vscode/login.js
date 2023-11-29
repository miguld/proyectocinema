// JavaScript para mostrar y ocultar la ventana emergente de registro
function mostrarFormularioRegistro() {
  var popup = document.getElementById("registro-popup");
  popup.style.display = "block";
}

function cerrarFormularioRegistro() {
  var popup = document.getElementById("registro-popup");
  popup.style.display = "none";
}

// JavaScript para validar el formulario de registro
function validarRegistro() {
  var tipoDocumento = document.getElementById("tipo-documento").value;
  var numeroDocumento = document.getElementById("numero-documento").value;
  var nombres = document.getElementById("nombres").value;
  var apellidos = document.getElementById("apellidos").value;
  var correo = document.getElementById("correo").value;
  var contrasena = document.getElementById("contrasena-registro").value;
  var confirmarContrasena = document.getElementById("confirmar-contrasena").value;

  // Validaciones adicionales según las especificaciones
  if (!validarCorreo(correo)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return false;
  }

  if (contrasena.length < 5 || !(/[A-Z]/.test(contrasena)) || !(/[a-z]/.test(contrasena)) || !(/\d/.test(contrasena))) {
      alert("La contraseña debe tener al menos 5 caracteres y contener letras mayúsculas, minúsculas y números.");
      return false;
  }

  if (contrasena !== confirmarContrasena) {
      alert("La contraseña y la confirmación de contraseña deben ser idénticas.");
      return false;
  }

  // Si todas las validaciones pasan, el formulario se envía
  registrarme();

  // No es necesario retornar true ya que registrarme() se encarga de enviar el formulario
}

// Función para enviar el formulario al servidor
function registrarme() {
  // Datos del formulario
  var tipoDocumento = document.getElementById("tipo-documento").value;
  var numeroDocumento = document.getElementById("numero-documento").value;
  var nombres = document.getElementById("nombres").value;
  var apellidos = document.getElementById("apellidos").value;
  var correo = document.getElementById("correo").value;
  var contrasena = document.getElementById("contrasena-registro").value;
  var confirmarContrasena = document.getElementById("confirmar-contrasena").value;

  // Validaciones adicionales según las especificaciones (puedes repetir las validaciones aquí si lo deseas)

  // Construir el objeto de datos
  var datos = {
      tipoDocumento: tipoDocumento,
      numeroDocumento: numeroDocumento,
      nombres: nombres,
      apellidos: apellidos,
      correo: correo,
      contrasena: contrasena,
      confirmarContrasena: confirmarContrasena
      // Puedes agregar más campos según sea necesario
  };

  // Enviar la solicitud POST
  fetch('http://localhost:3003/registro', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Respuesta del servidor:', data);
      // Puedes mostrar un mensaje en tu interfaz aquí
      alert(data.mensaje);
  })
  .catch(error => console.error('Error:', error));
}
