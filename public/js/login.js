const loginForm = document.querySelector('.loginform')
const signupForm = document.querySelector('.signupform')


loginForm.addEventListener('submit', event => {
   event.preventDefault()
   const loginFormData = new FormData(loginForm)
   const data = Object.fromEntries(loginFormData)
   window.open(`${server_url}dashboard/${data.uuid}`, "_self");
})

signupForm.addEventListener('submit', event => {
   event.preventDefault()
   const signupFormData = new FormData(signupForm)
   const data = Object.fromEntries(signupFormData)
   let RNG = Math.floor(Math.random() * 3);
   let personal_pepe = `${server_url}images/TdA_ikony/300ppi/TdA_ikony_napad_black.png`
   switch(RNG) {
      case 0:
         personal_pepe = `${server_url}images/TdA_ikony/300ppi/TdA_ikony_nastaveni_black.png`
      case 1:
         personal_pepe = `${server_url}images/TdA_ikony/300ppi/TdA_ikony_studium_black.png`
   }
   //post
   fetch(`${server_url}api/lecturers`, {   
      method: "POST",
      body: JSON.stringify({
         first_name: String(data.firstname),
         last_name: String(data.lastname),
         tags: [{"name": "Default"},{"name": "Newcomer"}],
         price_per_hour: 24.99,
         bio: "I am a lecturer available for purchase on Teacher digital Agency!",
         location: "Somewhere",
         picture_url: personal_pepe
      }),
      headers: {
         "Content-type": "application/json; charset=UTF-8",
         "Authorization": "Basic VGRBOmQ4RWY2IWRHR19wdg=="
      }
   })
   .then((response) => response.json())
   .then((json) => {
      console.log(json)
      window.open(`${server_url}dashboard/${json.uuid}`, "_self");
   });
})