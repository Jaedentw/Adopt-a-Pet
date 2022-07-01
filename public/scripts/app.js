// in app.js
$(document).ready(() => {
  document.getElementById("button").addEventListener("click", function() {
    document.querySelector(".popup").style.display = "flex";
  })

  document.querySelector(".close").addEventListener("click", function() {
    document.querySelector(".popup").style.display = "none";
  })

})
