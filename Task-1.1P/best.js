const button = document.getElementById("btn");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  const now = new Date();
  output.textContent = "Button clicked at: " + now.toLocaleTimeString();
});
