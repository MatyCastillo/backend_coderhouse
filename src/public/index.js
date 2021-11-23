document.addEventListener("submit", enviarFormulario);

function enviarFormulario(event) {
  event.preventDefault();
  let form = document.getElementById("productForm");
  let data = new FormData(form);
  fetch("/api/products", {
    method: "POST",
    body: data,
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      Swal.fire({
        title: "Éxito",
        text: json.message,
        icon: "success",
        timer: 2000,
      }).then((result) => {
        location.href = "/";
      });
    });
}
