const addRecipe = async (event) => {

    const recipeId = event.target.getAttribute('data-recipe-id');

    const response = await fetch('/api/userRecipes/', {
        method: 'POST',
        body: JSON.stringify({ recipeId }),
        headers: { 'Content-Type': 'application/json' },
    });


    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert('Failed to add recipe. You might already have this recipe added!');
    }
}

document
  .querySelector('.button-recipe')
  .addEventListener('click', addRecipe);

  var myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "drpv4wdcd",
      uploadPreset: "ahulubyv",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
      }
    }
  );

  document.getElementById("upload_widget").addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );
