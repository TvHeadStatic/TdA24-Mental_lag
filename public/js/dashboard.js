var doc = document

fetch(`http://localhost:3000/api/lecturers/${uuid}`)
  .then((response) => response.json())
  .then((json) => {
	  console.log(json.uuid)
    if (json.picture_url == 0 || !json.picture_url){
      doc.getElementById("picture_url").src = "https://pngimg.com/uploads/smiley/smiley_PNG186.png"
    }
    else {
      doc.getElementById("picture_url"). src = json.picture_url
    }
  });