let dropdown = document.getElementById("localitydropdown"); // cars names
let dropdown2 = document.getElementById("localitydropdown1"); // cars names
let defaultOption = document.createElement("option");
let defaultOption1 = document.createElement("option");
defaultOption.text = "Choose Car";
defaultOption1.text = "Choose Model";
dropdown.add(defaultOption);
dropdown2.add(defaultOption1);
dropdown2.selectedIndex = 0;
dropdown.selectedIndex = 0;

const url = "https://private-anon-74463ab434-carsapi1.apiary-mock.com/cars";

fetch(url)
  .then(function (response) {
    if (response.status !== 200) {
      console.warn(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }
    response.json().then(function (data) {
      console.log(data);
      // Array that cotains only cars models
      const carsModels = [];
      data.forEach((car) => {
        if (carsModels.includes(car.make)) {
          return;
        }
        carsModels.push(car.make);
      });

      console.log("cars: ", carsModels);
      carsModels.forEach((car) => {
        const option = document.createElement("option");
        option.text = car;
        dropdown.add(option);
      });
    });
  })
  .catch(function (err) {
    console.error("Fetch Error -", err);
  });

var changeCat = function changeCat(firstList) {
  console.log(firstList.value);

  const url = "https://private-anon-74463ab434-carsapi1.apiary-mock.com/cars";

  fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }
      response.json().then(function (data) {
        const models = data.reduce((acc, car) => {
          if (car.make === firstList.value) {
            acc = [...acc, car.model];
            return acc;
          }

          return acc;
        }, []);
        dropdown2.innerHTML = "";

        console.log(dropdown2.childNodes);
        //adding
        models.forEach((model) => {
          // create option for relevant model
          const option2 = document.createElement("option");
          option2.text = model;
          dropdown2.add(option2);
        });
      });
    })
    .catch(function (err) {
      console.error("Fetch Error -", err);
    });
};
//getting elements
function getRes() {
  let as = [
    document.forms[0].localitydropdown.value,
    document.forms[0].localitydropdown1.value,
  ];
  return as;
}

const form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", (event) => {
  // stop the form submitting and reloading the page
  event.preventDefault();

  // clear out any previous results
  output.innerHTML = "";

  // get the value of the field with name="pokemon"
  const formData = new FormData(event.target);
  const car = formData.get("locality");
  const model = formData.get("locality1");

  // request that pokemon from PokeAPI
  fetch("https://private-anon-74463ab434-carsapi1.apiary-mock.com/cars")
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    // if we get a successful response
    .then((cardsData) => {
      let indexOfCar = cardsData.findIndex((item) => item.model === model);
      const Car = document.createElement("h1");
      Car.textContent = car;
      const Model = document.createElement("h2");
      Model.textContent = model;
      const Price = document.createElement("h3");
      Price.textContent = cardsData[indexOfCar].price;
      Price.textContent += " $";
      const image = document.createElement("img");
      image.src = cardsData[indexOfCar].img_url;
      image.alt = "";
      const horsep = document.createElement("h4");
      horsep.textContent = cardsData[indexOfCar].horsepower;
      horsep.textContent += " hp";

      output.appendChild(Car);
      output.appendChild(Model);
      output.appendChild(Price);
      output.appendChild(image);
      output.appendChild(horsep);
    })
    // if the request is unsuccessful
    .catch((error) => {
      console.log(error);
      if (error.message === "404") {
        output.textContent = `⚠️ Couldn't find "${Car}"`;
      } else {
        output.textContent = "⚠️ Something went wrong";
      }
    });
});
