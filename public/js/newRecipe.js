const newRecipeHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const instructions = document.querySelector('#instructions').value.trim();
    const ingredients = document.querySelector('#ingredients').value.trim();
    const image = './img/placeholder.jpg'
    
    const response = await fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify({ name, description, instructions, ingredients, image }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to add recipe');
      }
    }

document
  .querySelector('.ingredient-form')
  .addEventListener('submit', newRecipeHandler);