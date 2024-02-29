var doc = document
var clamp = 0

fetch(`${server_url}api/lecturers/${uuid}`, {
    headers: {
      "Authorization": "Basic VGRBOmQ4RWY2IWRHR19wdg=="
    }
  })
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
    }

    if (json.first_name == 0 || !json.first_name) {
      doc.getElementById("first_name").innerHTML = ""
    }
    else{
      doc.getElementById("first_name").innerHTML = json.first_name + " "
    }

    if (json.middle_name == 0 || !json.middle_name) {
      doc.getElementById("middle_name").innerHTML = ""
    }
    else{
      doc.getElementById("middle_name").innerHTML = json.middle_name + " "
    }

    if (json.last_name == 0 || !json.last_name) {
      doc.getElementById("last_name").innerHTML = ""
    }
    else {
      doc.getElementById("last_name").innerHTML = json.last_name + " "
    }

    if (json.title_after == 0 || !json.title_after) {
      doc.getElementById("title_after").innerHTML = ""
    }
    else {
      doc.getElementById("title_after").innerHTML = json.title_after + " "
    }

    if (json.location == 0 || !json.location) {
      doc.getElementById("location").innerHTML = ""
    }
    else {
      doc.getElementById("location").innerHTML = "Location:<br>" + "<span style=\"weight: normal;\">" + json.location + "</span>"
    }

    if (json.claim == 0 || !json.claim) {
      doc.getElementById("claim").innerHTML = ""
    }
    else {
      doc.getElementById("claim").innerHTML = json.claim
    }

    if (json.bio == 0 || !json.bio) {
      doc.getElementById("bio").innerHTML = ""
    }
    else {
      doc.getElementById("bio").innerHTML = json.bio
    }

    for (let i = 0; i < json.tags.length; i++){
      doc.getElementById("tags").appendChild(document.createElement("span"))
      doc.getElementById("tags").children[i].innerHTML = json.tags[i].name + " "
    }

    if (json.price_per_hour == 0 || !json.price_per_hour) {
      doc.getElementById("price_per_hour").innerHTML = ""
    }
    else {
      doc.getElementById("price_per_hour").innerHTML = "Price: " + json.price_per_hour + " CZK/h"
    }

    doc.getElementById("contact").children[0].innerHTML = "<b>Telephone:<br></b>"
    for(let i = 0; i < json.contact.telephone_numbers.length; i++) {
      doc.getElementById("telephone_numbers").appendChild(document.createElement("span"))
      doc.getElementById("telephone_numbers").children[i+1].innerHTML = json.contact.telephone_numbers[i] + "<br>"
    }

    doc.getElementById("contact").children[1].innerHTML = "<b>Email:<br></b>"
    for(let i = 0; i < json.contact.emails.length; i++) {
      doc.getElementById("emails").appendChild(document.createElement("span"))
      doc.getElementById("emails").children[i+1].innerHTML = json.contact.emails[i] + "<br>"
    }
  });

function Clamp() {
  if (clamp == 0) {
    doc.getElementById("bio").style = "-webkit-line-clamp: unset;"
    doc.getElementById("showMore").innerHTML = "Show less"
    clamp = 1
  }
  else {
    doc.getElementById("bio").style = ""
    doc.getElementById("showMore").innerHTML = "Show more"
    clamp = 0
  }
}