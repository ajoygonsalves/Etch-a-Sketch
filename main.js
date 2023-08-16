// Select main container
const main = document.querySelector("main");

// Set CSS styles to main
main.style.cssText =
  "display: flex;flex-wrap: wrap; gap: 0.2rem;justify-content: space-around";

// Select button
const button = document.querySelector("button");
button.style.cssText =
  "display: flex; margin-right: auto; margin-left: auto; margin-top: 1.5rem; margin-bottom: 1.5rem; padding: 0.5rem;";

// Add handler on button to render grid
button.addEventListener("click", askSize);

// Ask size from user
function askSize() {
  size = prompt("Number: ");
  while (
    size == null ||
    size > 100 ||
    size < 1 ||
    isNaN(size) ||
    size != Math.floor(size)
  ) {
    alert("Invalid Size. Please try again");
    size = prompt("Number:");
  }
  renderGrid(size);
}

// Render Grid
function renderGrid(size) {
  clearGrid();

  const cellPercentage = 100 / size - 2;
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const grid = document.createElement("div");
      grid.style.cssText = `width: ${cellPercentage}%; height: 40px; border: 1px solid black;`;
      grid.textContent = row * size + col + 1;
      grid.setAttribute("data-interactions", "0"); // To store interaction count

      grid.addEventListener("mouseover", function () {
        // Get the current interaction count from the data attribute
        let interactions = parseInt(grid.getAttribute("data-interactions"));

        // Calculate the decrement value based on interactions
        let decrementValue = interactions * 25.5; // 10% of 255

        // Ensure that we don't exceed 255
        decrementValue = Math.min(decrementValue, 255);

        let newColorValue = 255 - decrementValue;

        // Set the new background color
        grid.style.backgroundColor = `rgb(${newColorValue}, ${newColorValue}, ${newColorValue})`;

        // Increase the interaction count and update the data attribute
        interactions += 1;
        grid.setAttribute("data-interactions", interactions.toString());

        grid.style.transitionDuration = "0ms";
      });

      grid.addEventListener("mouseout", function () {
        grid.style.backgroundColor = "white"; // Commenting this will maintain the progressive darkening effect
        grid.style.transitionDuration = "50000ms";
      });

      main.appendChild(grid);
    }
  }
}

// Clear Grid
function clearGrid() {
  let grid = document.querySelectorAll("div");
  grid.forEach((e) => e.remove());
}

// Initial render
renderGrid(16);
