let countries = [];
let timeout = null;
getCountries();

async function getCountry(name) {
  document.getElementById("card-area").style.display = "block";

  const res = await fetch(
    "https://restcountries.com/v3.1/name/" +
      name +
      "?fields=name,population,region,capital,flags,"
  )
    .then((response) => response.json())
    .catch((err) => console.log("Error:" + err));

  for (let i = 0; i < res.length; i++) {
    let n = res[i].population;

    const object = {
      name: res[i].name.common,
      population: n.toLocaleString(),
      region: res[i].region,
      capital: res[i].capital,
      flag: res[i].flags.svg,
    };
    countries.unshift(object);
  }
}

async function getCountries() {
  await getCountry("Algeria");
  await getCountry("Albania");
  await getCountry("Åland Islands");
  await getCountry("Afghanistan");
  await getCountry("Iceland");
  await getCountry("Brazil");
  await getCountry("United States of America");
  await getCountry("Germany");
  displayCountries(countries);
}

function displayCountries(arrayCountries){
    document.getElementById("card-area").style.display = "none";
    if (arrayCountries.length == 0) {
        document.getElementsByClassName("error")[0].style.display = "block";
      } else {
        document.getElementsByClassName("error")[0].style.display = "none";
      }
    
      for (let i = 0; i < arrayCountries.length; i++) {
        buildCard(
            arrayCountries[i].name,
            arrayCountries[i].capital,
            arrayCountries[i].region,
            arrayCountries[i].flag,
            arrayCountries[i].population
        );
      }
      const cards = document.querySelectorAll(".card");
  cards.forEach((card) =>
    card.addEventListener("click", (event) => {
      localStorage.setItem("name", card.children[1].children[0].innerText);})
  );
}

function buildCard(name, capital, region, flag, population) {
    let countryContainer = document.getElementsByClassName("row")[0];
    let innerText = ` <div class="col-md mb-3">
    <div class="card cardtext cardColor" style="width: 300px; height:350px">
      <img class="card-img-top imgSize" src="${flag}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"><strong>${name}</strong></h5>
        <p class="card-text"><strong>Population:</strong> ${population}
          <br><strong>Region:</strong> ${region}
          <br><strong>Capital:</strong> ${capital}
        </p>
         
        
        <a href="details.html" class="stretched-link"></a>
      </div>
    </div></div>
     
  `;
  
    let newDiv = document.createElement("div");
    newDiv.className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3";
    newDiv.innerHTML = innerText;
    countryContainer.appendChild(newDiv);
  }
  var darktheme = document.getElementById("dark-themeButton");
      darktheme.onclick = function(){
        document.body.classList.toggle("dark-theme")
      }


  
