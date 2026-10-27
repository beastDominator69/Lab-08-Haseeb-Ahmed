
let recipes = [];
let editIndex = -1;

const form = document.getElementById("recipeForm");
const recipeList = document.getElementById("recipeList");

function displayRecipes() {
    recipeList.innerHTML = "";

    recipes.forEach(function(recipe, index) {
        recipeList.innerHTML += `
            <div class="recipe">
                <h3>${recipe.title}</h3>
                ${recipe.image ? `<img src="${recipe.image}" alt="Recipe image">` : ""}
                <p><b>Ingredients:</b> ${recipe.ingredients}</p>
                <button class="view" onclick="viewRecipe(${index})">View</button>
                <button class="edit" onclick="editRecipe(${index})">Edit</button>
                <button class="delete" onclick="deleteRecipe(${index})">Delete</button>
            </div>
        `;
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let title = document.getElementById("title").value.trim();
    let ingredients = document.getElementById("ingredients").value.trim();
    let instructions = document.getElementById("instructions").value.trim();
    let file = document.getElementById("image").files[0];

    if (!title || !ingredients || !instructions) {
        alert("Please fill in all required fields.");
        return;
    }

    function saveRecipe(image) {
        let recipe = {
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            image: image
        };

        if (editIndex === -1) {
            recipes.push(recipe);
        } else {
            recipes[editIndex] = recipe;
        }

        displayRecipes();
        form.reset();
        editIndex = -1;
        document.getElementById("saveButton").textContent = "Add Recipe";
    }

    let oldImage = editIndex === -1 ? "" : recipes[editIndex].image;

    if (file) {
        let reader = new FileReader();
        reader.onload = function() {
            saveRecipe(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveRecipe(oldImage);
    }
});

function viewRecipe(index) {
    let recipe = recipes[index];

    alert("Title: " + recipe.title +
        "\n\nIngredients: " + recipe.ingredients +
        "\n\nInstructions: " + recipe.instructions);
}

function editRecipe(index) {
    let recipe = recipes[index];

    document.getElementById("title").value = recipe.title;
    document.getElementById("ingredients").value = recipe.ingredients;
    document.getElementById("instructions").value = recipe.instructions;

    editIndex = index;
    document.getElementById("saveButton").textContent = "Update Recipe";

    window.scrollTo(0, 0);
}

function deleteRecipe(index) {
    if (confirm("Are you sure you want to delete this recipe?")) {
        recipes.splice(index, 1);
        displayRecipes();
    }
}

displayRecipes();
