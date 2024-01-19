var doc = document
var clamp = 0

fetch(`http://4e6843e4cd0e2b27.app.tourdeapp.cz/api/lecturers/${uuid}`)
  .then((response) => response.json())
  .then((json) => {
	  console.log(json.uuid)
    doc.getElementById("picture_url").src = json.picture_url
    doc.getElementById("title_before").innerHTML = json.title_before + " "
    doc.getElementById("first_name").innerHTML = json.first_name + " "
    doc.getElementById("middle_name").innerHTML = json.middle_name + " "
    doc.getElementById("last_name").innerHTML = json.last_name + " "
    doc.getElementById("title_after").innerHTML = json.title_after + " "
    doc.getElementById("location").innerHTML = "Location:<br>" + "<span style=\"weight: normal;\">" + json.location + "</span>"
    doc.getElementById("claim").innerHTML = json.claim
    doc.getElementById("bio").innerHTML = json.bio

    for (let i = 0; i < json.tags.length; i++){
      doc.getElementById("tags").appendChild(document.createElement("span"))
      doc.getElementById("tags").children[i].innerHTML = json.tags[i].name + " "
    }
    
    doc.getElementById("price_per_hour").innerHTML = "Price: " + json.price_per_hour + " CZK/h"

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