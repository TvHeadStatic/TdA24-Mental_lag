const loginForm = document.querySelector('.loginform')
const signupForm = document.querySelector('.signupform')


loginForm.addEventListener('submit', event => {
   event.preventDefault()
   const loginFormData = new FormData(loginForm)
   const data = Object.fromEntries(loginFormData)
   window.open(`http://4e6843e4cd0e2b27.app.tourdeapp.cz/dashboard/${data.uuid}`, "_self");
})

signupForm.addEventListener('submit', event => {
   event.preventDefault()
   const signupFormData = new FormData(loginForm)
   const data = Object.fromEntries(signupFormData)

   //post
   fetch("http://4e6843e4cd0e2b27.app.tourdeapp.cz/api/lecturers", {   
      method: "POST",
      body: JSON.stringify({
         first_name: data.firstname,
         last_name: data.lastname
      }),
      headers: {
         "Content-type": "application/json; charset=UTF-8",
         "Authorization": "Basic VGRBOmQ4RWY2IWRHR19wdg=="
      }
   })
   .then((response) => response.json())
   .then((json) => {
      console.log(json)
      window.open(`http://4e6843e4cd0e2b27.app.tourdeapp.cz/dashboard/${json.uuid}`, "_self");
   });
})