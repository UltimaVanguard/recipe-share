const addRecipe = async (event) => {

    const recipeId = event.target.getAttribute('data-recipe-id');

    const response = await fetch('/api/userRecipes/', {
        method: 'POST',
        body: JSON.stringify({ recipeId }),
        headers: { 'Content-Type': 'application/json' },
    });

      
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log in.');
    }
}

document
  .querySelector('.button-recipe')
  .addEventListener('click', addRecipe);