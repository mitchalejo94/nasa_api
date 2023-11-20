// let wholeURL ="https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=HkeNgIrQ2HClA3VMum0nMKiX93xdGA8H7PLQAHOv";

//Items
let dataInject = document.getElementById("dataInject");
let button = document.getElementById("button");
let input = document.getElementById("input");

let apiKey = "&api_key=HkeNgIrQ2HClA3VMum0nMKiX93xdGA8H7PLQAHOv";
let apiName = "https://api.nasa.gov";

button.addEventListener("click", function (event) {
  let apiEndPoint = `/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${input.value}&`;
  //clear data each time you search
  dataInject.innerHTML = "";
  fetchFunc(apiName + apiEndPoint + apiKey);
});

//call function api
// fetchFunc(wholeURL);

async function fetchFunc(url) {
  //fetch the URL
  const response = await fetch(url);

  //if the url connects. Get information back in JSON
  if (response.ok) {
    let jsonData = await response.json();
    console.log(jsonData.photos);

    //check if the jsonData.photos are an array. Name of array is "photos"
    if (Array.isArray(jsonData.photos)) {
      //itirate through photos
      jsonData.photos.forEach((photos) => {
        displayData(photos);
      });
    }
  }
}

//
function displayData(data) {
  //IMAGE
  //going to insert a div element into this variable.
  let imgCol = document.createElement("div");
  imgCol.className = "col-12";
  let img = document.createElement("img");
  img.setAttribute("src", data.img_src);

  imgCol.appendChild(img);

  //TEXT
  let textCol = document.createElement("div");
  textCol.className = "col-12";

  let cameraType = document.createElement("h2");
  cameraType.innerText = "View - " + data.camera.full_name;

  let roverName = document.createElement("h2");
  roverName.innerText = "Rover Name: " + data.rover.name;

  let roverStatus = document.createElement("h2");
  roverStatus.innerText = "Rover Status: " + data.rover.status;

  //Add type,name, status to textColumn
  textCol.appendChild(cameraType);
  textCol.appendChild(roverName);
  textCol.appendChild(roverStatus);

  //PUT EVERYTHING TOGETHER into html div
  dataInject.appendChild(imgCol);
  dataInject.appendChild(textCol);
}
