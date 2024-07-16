const btn = document.querySelector("button");
const input = document.querySelector("input");
const resultsBlocks = document.querySelector("#results");
const newText = document.createElement("h2");

function capitalizeFirstLetterOfEachWord(str) {
  const words = str.split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(" ");
}
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log(input.value);
  resultsBlocks.innerHTML = "";
  newText.innerHTML = "";
  let text = capitalizeFirstLetterOfEachWord(input.value);
  get(text);
});

async function get(text) {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    console.log(response);
    const myData = await response.json();
    console.log(myData.meals);
    search(myData.meals, text);
  } catch (error) {
    console.log(error);
  }
}

function search(myData, text) {
  console.log(myData);
  let found = true;
  for (let i = 0; i < myData.length; i++) {
    if (Object.values(myData[i]).includes(text)) {
      console.log("The value exists in the object.");
      if (found == true) {
        newText.innerHTML = `Recipes contain ${text}`;
        newText.style.textAlign = "center";
        resultsBlocks.parentNode.insertBefore(newText, resultsBlocks);

        found = false;
      }

      draw(
        myData[i].strMealThumb,
        myData[i].strMeal,
        myData[i].strCategory,
        myData[i].strArea,
        text
      );
    }
  }
}

function draw(image, name, category, area) {
  const newDiv = document.createElement("div");
  newDiv.style.borderRadius = "3px";
  newDiv.style.backgroundColor = "white";
  newDiv.style.boxShadow = "3px 3px 5px 0px #999";
  newDiv.style.textAlign = "center";
  newDiv.style.border = "1px solid black";
  newDiv.style.marginBottom = "50px";

  const newImg = document.createElement("img");
  newImg.src = image;
  newImg.width = 300;
  newImg.height = 300;
  newImg.style.padding = "10px";
  newImg.style.borderRadius = "3px";

  const recipeName = document.createElement("h3");
  recipeName.innerText = `${name}`;
  recipeName.style.paddingBottom = "5px";
  const recipeCat = document.createElement("p");
  recipeCat.innerText = `Category: ${category}`;
  recipeCat.style.paddingBottom = "5px";
  const recipeArea = document.createElement("p");
  recipeArea.innerText = `Area: ${area}`;

  newDiv.appendChild(newImg);
  newDiv.appendChild(recipeName);
  newDiv.appendChild(recipeCat);
  newDiv.appendChild(recipeArea);
  resultsBlocks.appendChild(newDiv);
}
