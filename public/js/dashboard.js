var doc = document

fetch(`http://localhost:3000/api/lecturers/${uuid}`)
  .then((response) => response.json())
  .then((json) => {
	  console.log(json.uuid)
    if (json.picture_url == 0 || !json.picture_url) {
      doc.getElementById("picture_url").src = 'https://pngimg.com/uploads/smiley/smiley_PNG186.png'
    }
    else {
      doc.getElementById("picture_url").src = json.picture_url
    }

    if (json.title_before == 0 || !json.title_before) {
      doc.getElementById("title_before").innerHTML = ""
    }
    else {
      doc.getElementById("title_before").innerHTML = json.title_before + " "
      doc.getElementById("title1").value = json.title_before
    }

    if (json.first_name == 0 || !json.first_name) {
      doc.getElementById("first_name").innerHTML = ""
    }
    else{
      doc.getElementById("first_name").innerHTML = json.first_name + " "
      doc.getElementById("fname").value = json.first_name
    }

    if (json.middle_name == 0 || !json.middle_name) {
      doc.getElementById("middle_name").innerHTML = ""
    }
    else{
      doc.getElementById("middle_name").innerHTML = json.middle_name + " "
      doc.getElementById("mname").value = json.middle_name
    }

    if (json.last_name == 0 || !json.last_name) {
      doc.getElementById("last_name").innerHTML = ""
    }
    else {
      doc.getElementById("last_name").innerHTML = json.last_name + " "
      doc.getElementById("lname").value = json.last_name
    }

    if (json.title_after == 0 || !json.title_after) {
      doc.getElementById("title_after").innerHTML = ""
    }
    else {
      doc.getElementById("title_after").innerHTML = json.title_after + " "
      doc.getElementById("title2").value = json.title_after
    }

    if (json.location != 0 || !json.location == false) {
      doc.getElementById("location").value = json.location
    }

    if (json.claim != 0 || !json.claim == false) {
      doc.getElementById("claim").value = json.claim
    }

    if (json.bio != 0 || !json.bio == flase) {
      doc.getElementById("bio").value = json.bio
    }

    if (json.price_per_hour != 0 || !json.price_per_hour == false) {
      doc.getElementById("price").value = json.price_per_hour
    }
  });

const d = new Date()
let days = 31;
let month = d.getMonth()
let year = d.getFullYear()
const firstDay = new Date(`${month + 1} 1, ${year} 01:00:00`)

if (month == 1 && year % 4 == 0) {
  days = 29
}
else if (month == 1 && year % 4 != 0) {
  days = 28
}
else if (month == 3 || month == 5 || month == 8 || month == 10) {
  days = 30
}

if (month == 0){
  doc.getElementById("calm").innerHTML = "January"
}
else if (month == 1) {
  doc.getElementById("calm").innerHTML = "February"
}
else if (month == 2) {
  doc.getElementById("calm").innerHTML = "March"
}
else if (month == 3) {
  doc.getElementById("calm").innerHTML = "April"
}
else if (month == 4) {
  doc.getElementById("calm").innerHTML = "May"
}
else if (month == 5) {
  doc.getElementById("calm").innerHTML = "June"
}
else if (month == 6) {
  doc.getElementById("calm").innerHTML = "July"
}
else if (month == 7) {
  doc.getElementById("calm").innerHTML = "August"
}
else if (month == 8) {
  doc.getElementById("calm").innerHTML = "September"
}
else if (month == 9) {
  doc.getElementById("calm").innerHTML = "October"
}
else if (month == 10) {
  doc.getElementById("calm").innerHTML = "November"
}
else if (month == 11) {
  doc.getElementById("calm").innerHTML = "December"
}

let donut = firstDay.getDay()

for (i = 0 ; i < days ; i++) {
  doc.getElementById(`cal${i + donut}`).innerHTML = i + 1
}

doc.getElementById(`cal${d.getDate() + donut - 1}`).style = "background-color: var(--sunglow);"