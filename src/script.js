let token;

function doLogin() {
  document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah form dari submit secara default

    // Mengambil nilai dari elemen input
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Mengirim data ke API
    fetch("http://192.168.100.14:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(function (response) {
        if (response.status == 200) {
          return response.json();
        } else {
          alert("Login Gagal ! Pastikan email dan password benar");
        }
      })
      .then((data) => {
        alert("Login berhasil, dengan username " + data.username);
        alert("Selamat Datang");
        token = data.accessToken;
        console.log(token);
        window.location.href = "../src/home.html";
      });
  });
}

// function doLogout() {
//   document.getElementById("logout").addEventListener("click", (event) => {
//     event.preventDefault(); // Mencegah form dari submit secara default

//     // Mengirim data ke API
//     fetch("http://192.168.100.14:8000/api/auth/logout", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then(function (response) {
//       if (response.status == 200) {
//         alert("Selamat Datang");
//         window.location.href = "../src/login.html";
//       } else {
//         alert("Logout Gagal ! Pastikan email dan password benar");
//       }
//     });
//   });
// }
