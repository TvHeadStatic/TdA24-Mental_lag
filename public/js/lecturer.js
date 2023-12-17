fetch("/lecturer.json")
  .then((response) => response.json())
  .then((json) => {
	  console.log(json.UUID)
  });