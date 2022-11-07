let activities = document.getElementById("displayMovies")


document.querySelector("#button-addon2").addEventListener("click", () => {

    // Get the zip code value from the input
    let zipCode = document.querySelector("input").value

    // Make a request to the zippopotam api. 
    fetch(`https://api.zippopotam.us/us/${zipCode}`)
        .then(res => res.json())
        .then(data => {

            console.log(data)
            // Store coordinates location. We'll need this for the travel advisor fetch call
            let longitudeNum = data.places[0].longitude
            let latitudeNum = data.places[0].latitude


            // Make a request to the travel-advisor api. 
            fetch(`https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=${longitudeNum}&latitude=${latitudeNum}&lunit=mi&currency=USD&lang=en_US`, {
                "method": "GET",
                "headers": {
                    'X-RapidAPI-Key': '8c65eecf0fmsh69d4bfdbf3a8bd3p1478f0jsnd22316cdad37',
		            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            })
                .then(res => res.json())
                .then(data =>{
                    console.log(data.data)
                    // console.log(data.data[0].photo.images.original.url)

                    // Filter the array that came back from the fetch request. Take out any elements that have undefined or "" values
                    let arr = data.data.filter((element, index) => {
                      return element.name != undefined && element.address != undefined && element.description != undefined && element.description != ""
                    })
                    console.log(arr)


                    activities.innerHTML =

                    `${arr
                      .map(
                        (item) =>


                        
                          `<div class="card" style="width: 25rem;">
                            <img src="https://www.zuerich.com/sites/default/files/styles/1920_1244_focal_scale_crop/public/image/2022/web_zuerich_limmat_general_view_1600x900_4170.jpg?h=1643899651" class="card-img-top">
                          <div class="card-body">
                              <h5 class="card-title" >${item.name}</h5>
                              <p class="card-text">${item.address}</p>
                              <p class="card-text">${item.description}</p>
                              <button type="button" class="btn btn-primary">Save Attraction</button>
                          </div>
                      </div>`
                      )
                      .join("")}`

                    // Select the button that saves the attraction
                    let btn = document.getElementsByClassName("btn")
                    
                    // Add EventListener to all btns
                    Array.from(btn).forEach(element => {

                        element.addEventListener('click', () => {
                            


                            // Grab the movie title, year and image so we can send it with the POST request
                            let title = element.parentNode.parentNode.childNodes[3].childNodes[1].innerText
                            let address = element.parentNode.parentNode.childNodes[3].childNodes[3].innerText
                            let description = element.parentNode.parentNode.childNodes[3].childNodes[5].innerText
                            let img = element.parentNode.parentNode.childNodes[1].src





                            //Make a server request and store the movie in the data base if the user bookmarks it
                            fetch('addAttraction', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                'Attraction': title,
                                "Address": address,
                                "Image": img,
                                "Description": description
                            })
                            })
                            .then(response => {
                            if (response.ok) return response.json()
                            })
                            .then(data => {
                            console.log(data)
                            // window.location.reload(true)
                            })


                        })






                    })

                })
                .catch(err => {
                    console.error(err);
                });



        })
        .catch(err => {
            console.error('this' + err);
        });



})

// When the back to top button is clicked
//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}