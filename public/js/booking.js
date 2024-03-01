const bookForm = document.querySelector('.bookform')
var doc = document

fetch(`${server_url}api/lecturers/${uuid}`, {
   headers: {
     "Authorization": "Basic VGRBOmQ4RWY2IWRHR19wdg=="
   }
 })
.then((response) => response.json())
.then((json) => {
   console.log(json.uuid)
   let placeholders = [
      json.title_before,
      json.first_name,
      json.middle_name,
      json.last_name,
      json.title_after,
      json.price_per_hour]
   for (let i = 0; i < placeholders.length; i++) {
      if (placeholders[i] == 0 || !placeholders[i]) {
         placeholders[i] = ""
      }
   }
   doc.getElementById("lecturername").innerHTML = placeholders[0] + " " + placeholders[1] + " " + placeholders[2] + " " + placeholders[3] + " " + placeholders[4]
});

bookForm.addEventListener('submit', event => {
   event.preventDefault()
   const bookFormData = new FormData(bookForm)
   const data = Object.fromEntries(bookFormData)

   //post
   fetch(`${server_url}book`, {   
      method: "POST",
      body: JSON.stringify({
         uuid: uuid,
         full_name: String(data.fullname),
         date: String(data.date),
         time: String(data.time),
         email: String(data.email),
         phone: String(data.phone),
         note: String(data.note)
      }),
      headers: {
         "Content-type": "application/json; charset=UTF-8",
         "Authorization": "Basic VGRBOmQ4RWY2IWRHR19wdg=="
      }
   })
   .then((response) => response.json())
   .then((json) => {
      console.log(json)
      doc.getElementById("booksub").style.display = "none"
      doc.getElementById("booksab").innerHTML = "Booked!"
   });
})