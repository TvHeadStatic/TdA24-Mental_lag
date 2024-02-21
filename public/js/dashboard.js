var doc = document

fetch(`http://localhost:3000/api/lecturers/${uuid}`)
  .then((response) => response.json())
  .then((json) => {
	  //console.log(json.uuid)
  });