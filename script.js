// /* before code and */ after code will block comment

"use strict";

async function getAllRecords() {
    let getResultElement = document.getElementById("content");

    await fetch(
        `https://api.airtable.com/v0/appLBS1JnBSsMg3km/Table%201`,
        {
        method: "GET",
        headers: {
            Authorization: `Bearer patH6tiGyuRKhgO6l.7fad1c253dafaa4c23eab1ea52b0062cd06e6d07a7b66ea6287f420ceed2d5db`,
        }
    },)

        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            getResultElement.innerHTML = "";

            let newHtml = "";

            for (let i = 0; i < data.records.length; i++) {
                let images = data.records[i].fields["Images"];
                let name = data.records[i].fields["Name"];
                // possibly add painting type (ie: portrait, landscape, political, etc.)

                // for the cards in list view - will change style
                newHtml += `
                
                <div class="col-xl-4 cardImageText">
                  <div class="card list move border-dark mb-5" style="width: 20rem;">
                  <a href="index.html?id=${data.records[i].id}">${
                    images
                    // ? if true and : if false
                      ? `<img class="card-img-top rounded" alt=${name}" src="${images[0].url}">`
                      : ``
                  }
                  </a>
                  </div>
                </div>

                `;
            }
            getResultElement.innerHTML = newHtml;
        });
    }
    getAllRecords();

// Detail View
    async function getOneRecord(id) {
        let artResultElement = document.getElementById("content");

        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer patH6tiGyuRKhgO6l.7fad1c253dafaa4c23eab1ea52b0062cd06e6d07a7b66ea6287f420ceed2d5db`,
            },
        }
    }

    await fetch(
        `https://api.airtable.com/v0/appLBS1JnBSsMg3km/Table%201/${id}`
    )