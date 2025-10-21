let result;
let values;
let selectstate;
let selectedcity;
let currcity = [];
let index;
let keys;
let reset = document.querySelector(".reset")
let select = document.querySelector("#states")
let cities = document.querySelector("#cities")
let container = document.querySelector(".container")  
let currweather = document.querySelector(".current-weather h1")
let humidity = document.querySelector(".humidity p")
let windspeed = document.querySelector(".windspeed p")
let winddirection = document.querySelector(".winddirection p")
let condition = document.querySelector(".condition p")
let uvindex = document.querySelector(".uvindex p")
let feelslike = document.querySelector(".feelslike p")  

let spinner = document.getElementById("spinner"); 

async function fetchData() {
  let res = await fetch('citycode.json');
  result = await res.json();
 
  keys = Object.keys(result)
  //console.log(keys.length)
   for(i=0;i<keys.length;i++){
    let option = document.createElement("option")
    option.value = keys[i]
    option.textContent = keys[i]
    //console.log(keys[i])
    select.appendChild(option)
   }
   let btn = document.querySelector(".btn_states")
btn.addEventListener("click",()=>{
selectstate = select.value;
   index = keys.indexOf(`${selectstate}`)
   //console.log(index)
   values = Object.values(result)
   //console.log(values)
   curr = values[index]
   currcity = Object.values(curr)
   //console.log(currcity)
   select.disabled = true;
   
   async function getcity() {
  for(i=0;i<currcity.length;i++){
    let option = document.createElement("option")
    option.value = currcity[i]
    //console.log(currcity[i])
    option.textContent = currcity[i]
    //console.log(keys[i])
    cities.appendChild(option)
   }
  
}
   getcity()
  })
   
  //console.log(keys[0])
  //const values = Object.values(result)
  //const tic = values[0]
  //console.log((Object.values(tic))[0])

}

reset.addEventListener("click",()=>{
  select.disabled = false;
  cities.innerHTML= "none";
  cities.innerHTML+= `<option value="city">select city</option>`
  humidity.textContent = "I am humidity";
  windspeed.textContent = "I am speed of wind";
  winddirection.textContent = "I give direction to wind";
  condition.textContent = "i tell condition of weather";
  uvindex.textContent = "I am uv index";
  feelslike.textContent = "I tell how it feels like";
  currweather.textContent = "0";
  cities.disabled = false;
})

let citybtn = document.querySelector(".btn_cities")
citybtn.addEventListener("click",()=>{
  selectedcity = cities.value;
  cities.disabled = true;
  //console.log(selectedcity)
})


let submitbtn = document.querySelector(".submit")
submitbtn.addEventListener("click",()=>{
  //show spinner 
  spinner.classList.remove("hidden");
  container.style.opacity = "43%";
  fetch(` https://weather.indianapi.in/global/current?location=${selectedcity}`, {
  method: 'GET',
  headers: {
    'x-api-key': 'sk-live-PyskHVaMzhBB5xJgvWe3J0nBtvKvdR3HseZyP1LR'
  }
})     
.then(response => response.json())
.then(data => {
  //hide spinner on success
  spinner.classList.add("hidden");
  container.style.opacity = "100%";
  
  console.log(Object.keys(data))
  console.log(Object.values(data))
  humidity.textContent = data.humidity + '%';
  windspeed.textContent = data.wind_speed + ' km/h';
  winddirection.textContent = data.wind_direction;
  condition.textContent = data.condition;
  uvindex.textContent = data.uv_index;
  feelslike.textContent = data.feels_like;
  currweather.textContent = data.temperature+'°C';
})
.catch(error => {console.error('Error:', error)});

 
})

fetchData()





