function solve() {
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
        location.replace("./src/homeLogged.html");
    } else {
        location.replace("./src/home.html");
      }
}
