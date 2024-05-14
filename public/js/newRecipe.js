let image = ""
const newRecipeHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const instructions = document.querySelector('#instructions').value.trim();
    const ingredients = document.querySelector('#ingredients').value.trim();


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
  .querySelector(".add-recipe")
  .addEventListener("click", newRecipeHandler);

 var myWidget = cloudinary.createUploadWidget(
   {
     cloudName: "drpv4wdcd",
     uploadPreset: "ahulubyv",
   },
   (error, result) => {
     if (!error && result && result.event === "success") {
       console.log("Done! Here is the image info: ", result.info);
       image = result.info.url
     }
   }
 );

 document.getElementById("upload_widget").addEventListener(
   "click",
   function (event) {
    event.preventDefault()
     myWidget.open();
   },
   false
 );
