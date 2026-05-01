// /* before code and */ after code will block comment

"use strict";

async function getAllRecords() {
    let getResultElement = document.getElementById("content");

    await fetch(
        `https://api.airtable.com/v0/appLBS1JnBSsMg3km/Art`,
        {
        method: "GET",
        headers: {
            Authorization: `Bearer patH6tiGyuRKhgO6l.7fad1c253dafaa4c23eab1ea52b0062cd06e6d07a7b66ea6287f420ceed2d5db`,
        }
    },)

        .then((response) => response.json())
        .then((data) => {
          window.contentData = data.records;
            console.log(data);

            getResultElement.innerHTML = "";

            let newHtml = "";

            for (let i = 0; i < data.records.length; i++) {
                let images = data.records[i].fields["Images"];
                let name = data.records[i].fields["Name"];
                // possibly add painting type (ie: portrait, landscape, political, etc.)

                // for the cards in list view - will change style
                newHtml +=`
                  <div class="col-md-4 d-flex justify-content-center my-4">
                    <div class="card h-100 w-100">
                      <a href="index.html?id=${data.records[i].id}">
                          ${
                          images
                          ? `<img class="card-img-top" alt="${name}" src="${images[0].url}" style="height: 200px; object-fit: cover;">`
                          : ``
                          }
                        </a>
                        <div class="card-body text-center">
                        <h6 class="card-title mb-0" style="font-family: 'Times New Roman', Times, serif;">${name}</h6>
                        </div>
                    </div>
                  </div>
                  `;
            }
            getResultElement.innerHTML = newHtml;
        });
    }
    /*
    getAllRecords();
    */

// detail view

async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("content");

  const hero = document.querySelector('.hero');
    if (hero) hero.style.display = 'none';

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patH6tiGyuRKhgO6l.7fad1c253dafaa4c23eab1ea52b0062cd06e6d07a7b66ea6287f420ceed2d5db`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appLBS1JnBSsMg3km/Art/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let images = data.fields["Images"];
      let name = data.fields["Name"];
      let price = data.fields["Price"];
      let availability = data.fields["Availability"];
      let medium = data.fields["Medium"];
      let size = data.fields["Size"];
      let description = data.fields["Description"];

      let dollar = "$";
    
      let newHtml = `
        <div class="mb-3">
  <div class="color blurb">
    <div class="col-12 d-flex justify-content-center align-items-center">
     ${
       images
         ? `<img class="img-fluid back ms-4" alt="${name}" src="${images[0].url}">`
         : ``
     }
    </div>
    <div class="col-12 d-flex text-center justify-content-center mt-3">
      <div>
        <h1><strong><em>${name}</strong></em></h1>
        <h4><strong>Description: </strong>${description}</h4>
        <h5><strong>${availability}</strong></h5>
        <h5><strong>${dollar}${price}</strong></h5>
        <h5><strong>Size: </strong>${size}</h5>
        <h5><strong>Medium: </strong>${medium}</h5>
      </div>
    </div>
  </div>
</div>
      `;

      jobsResultElement.innerHTML = newHtml;
    });
}


/* pop up for about me */
async function getAbout() {
    const modalElement = document.getElementById('recordModal');
    const modalBody = document.getElementById("modal-content-area");

    // 1. Get the existing instance or create a new one
    let bsModal = bootstrap.Modal.getInstance(modalElement);
    if (!bsModal) {
        bsModal = new bootstrap.Modal(modalElement);
    }

    modalBody.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading..</span>
            </div>
        </div>`;
    
    bsModal.show();

    const newHtml = `
        <h1 class="yatra text-center">About the Artist</h1>
        <div class="text-center my-4 mb-4">
        <img src="antonio.jpg" alt="Photo of Antonio Preza" class="img-fluid rounded-circle border shadow">
        </div>
        <h4 class="yatra text-center">Antonio Balmore Preza</h4>
        <p class="blurb text-center">I was born and raised in San Francisco, the Mission district being amongst the many neighborhoods I have lived in. My interest in art started as a young child with sketches. My passion for painting began around 2010. Acrylic paints are my preferred medium. I am inspired by music, life and memories.</p>
    `;

    setTimeout(() => {
        modalBody.innerHTML = newHtml;
    }, 500); 
}


// figure out what this is all about !!
/*
function filter() {
    let selectedName = document.getElementById("nameFilter").value;
    let getResultElement = document.getElementById("content");
    
    getResultElement.innerHTML = "";
    let filteredHtml = "";
    let previousName = ""; 

    window.contentData.forEach((record) => {
        let fields = record.fields;
        let name = fields["Name"] || "";

        if (selectedName === "All" || name === selectedName) {
            
            if (name !== previousName) {
                filteredHtml += `<div class="col-12 mt-4"><h1 class="text-center mb-3 fw-bold">${}</h1></div>`;
                previousName = name;
            }

            let images = fields["Images"];
            let name = fields["Name"];


            filteredHtml +=`
                  <div class="col-md-4 d-flex justify-content-center my-4">
                    <div class="card h-100 w-100")">
                      <a href="index.html?id=${record.id}">
                          ${
                          images
                          ? `<img class="card-img-top" alt="${name}" src="${images[0].url}" style="height: 200px; object-fit: cover;">`
                          : ``
                          }
                        </a>
                        <div class="card-body text-center">
                        <h6 class="card-title mb-0";">${name}</h6>
                        </div>
                    </div>
                  </div>
                  `;
        }
    });

    getResultElement.innerHTML = filteredHtml;
}
    */

function showHome() {
    const hero = document.querySelector('.hero');
    if (hero) hero.style.display = 'block';
    
    document.getElementById("content").innerHTML = ""; 
}

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}
// Remove onclick="getAbout()" from the HTML first!
document.querySelector('.rounded-circle').addEventListener('click', getAbout);