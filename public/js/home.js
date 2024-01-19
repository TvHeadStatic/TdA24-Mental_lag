var doc = document
fetch(`http://localhost:3000/api/lecturers`)
   .then((response) => response.json())
   .then((json) => {
      let tagssss = ""
      for (let i = 0; i < json.length; i++) {
         tagssss = ""
         for (let j = 0; j < json[i].tags.length; j++) {
            tagssss += json[i].tags[j].name + " "
         }
         //obrázek, claim, cenu za hodinu, lokalitu a tagy 
         doc.getElementById("lecturerlist").innerHTML += `
         <section class="special-section lecturer ${tagssss} ${json[i].price_per_hour} ${json[i].location}">
            <h2>${json[i].title_before} ${json[i].first_name} ${json[i].middle_name} ${json[i].last_name} ${json[i].title_after}</h2>
            <img class="lectimg" src="${json[i].picture_url}">
            <div>
               <p>${json[i].claim}</p>
               <p>${json[i].location}</p>
               <p><span class="lectprice">${json[i].price_per_hour} CZK/h</span> <a href="/lecturer/${json[i].uuid}"><span class="lectgo">CHECK OUT</span></a></p>
            </div>
            <p id="tags${i}" class="lecttags"></p>
         </section><br>
         `
         for (let j = 0; j < json[i].tags.length; j++){
            doc.getElementById(`tags${i}`).appendChild(doc.createElement("span"))
            doc.getElementById(`tags${i}`).children[j].innerHTML = json[i].tags[j].name + " "
         }
      }
   });

doc.getElementById("lectfilterbuttons").innerHTML += `
<p>price: <form class="main" onsubmit="filterbyprice(event)">
<input type="text" id="a" placeholder="a" value="0">
<input type="text" id="b" placeholder="b" value="1200">
<button type="submit">filter</button>
</form></p>
<p><button onclick="unfilter()">show all</button></p>
<p>location: <button onclick="filterby('Brno')">Brno</button> <button onclick="filterby('Praha')">Praha</button></p>
<p>tags: <button onclick="filterby('Dobrovolnictví')">Dobrovolnictví</button>
<button onclick="filterby('Studentské .spolky')">Studentské spolky</button>
<button onclick="filterby('Efektivní .učení')">Efektivní učení</button>
<button onclick="filterby('Marketing .pro .neziskové studentské projekty')">Marketing pro neziskové studentské projekty</button>
<button onclick="filterby('Mimoškolní .aktivity')">Mimoškolní aktivity</button>
<button onclick="filterby('Projektový .management, .event .management')">Projektový management, event management</button>
<button onclick="filterby('Fundraising .pro .neziskové .studentské .projekty')">Fundraising pro neziskové studentské projekty</button>
</p>
`


//cenového rozpětí, tagů, lokality
function filterby(filter) {
   unfilter()
   document.getElementById("lecturerlist").querySelector(`section:not(.${filter})`).style.display = "none"
   document.getElementById("lecturerlist").querySelector(`.${filter}`).style.display = "grid"
}

function unfilter() {
   document.getElementById("lecturerlist").querySelector(`.lecturer`).style.display = "grid"
}

const filterbyprice = event =>
{
   event.preventDefault()
   const items = document.querySelectorAll('#lecturerlist section');

  const searchMin = Number(document.getElementById('a').value);
  const searchMax = Number(document.getElementById('b').value);

  items.forEach(item =>
  {
    const price = Number(item.querySelector('.lectprice').textContent);
    
    if (price < searchMin || price > searchMax)
      item.style.display = 'none';
    else
      item.style.display = 'grid';
  });
};

