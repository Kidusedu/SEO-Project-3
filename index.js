

document.addEventListener("DOMContentLoaded", function() {
    var closeButton = document.getElementById("close");

    closeButton.addEventListener("click", function() {
      chrome.extension.getViews({ type: "popup" })[0].close();
    });

});

document.addEventListener("DOMContentLoaded", function() {
    // Get the URL of the other_page.html
    const form = document.getElementById("form");
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Get the values from the form fields
      const name_input = document.getElementById("nameInput").value;


      const requestData = {
        username: name_input,
      };
      
    fetch('http://127.0.0.1:5000/submit-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      
      // Fetch the resume_data after submitting the username
      return fetch('http://127.0.0.1:5000/get-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    })
    .then((response) => response.json())
    .then((data) => {
      const resumeData = data.resume;
      console.log(resumeData);
      
      if (resumeData == null || resumeData.length === 0){
        const resumeElement = document.getElementById("resumeElement");
        resumeElement.textContent = "No found experiences, please add below";
      } else {
        const resumeElement = document.getElementById("resumeElement");
        resumeElement.textContent = resumeData;
        for(x = 1; x<resumeData.length; x++){
          resumeElement.innerHTML += "<li><a href='https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwit4_fI1aeAAxXRlmoFHes5DQcQPAgJ'>"+resumeData[x]+"</a></li>";
          console.log(x);
        }
      }
    })
      // Redirect the popup to index.html
      fetch(chrome.runtime.getURL("index.html"))
            .then((response) => response.text())
            .then((data) => {
                document.open();
                document.write(data);
                document.close();
            });
      });
    });




document.addEventListener("DOMContentLoaded", function() {
  // Get the URL of the other_page.html
  const form = document.getElementById("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the form fields
    const experience = document.getElementById("experienceInput").value;
    const title = document.getElementById("title_name").value;


    const requestData = {
      experience: experience,
      title: title,
    };
    fetch('http://127.0.0.1:5000/add-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      .then((response) => response.json())
      .then((data) => {
          console.log(data.message);
          
          return fetch('http://127.0.0.1:5000/get-resume', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
        });
      })
        .then((response) => response.json())
        .then((data) => {
          const resumeData = data.resume;
          console.log(resumeData)
          if (resumeData == null || resumeData.length === 0){
            const resumeElement = document.getElementById("resumeElement");
            resumeElement.textContent = "No found experiences, please add below";
          } else {
            const resumeElement = document.getElementById("resumeElement");
            resumeElement.textContent = resumeData;
            for(x = 1; x<resumeData.length; x++){
              resumeElement.innerHTML += "<li><a href='https://www.google.com/webhp?hl=en&sa=X&ved=0ahUKEwit4_fI1aeAAxXRlmoFHes5DQcQPAgJ'>"+resumeData[x]+"</a></li>";
              console.log(x);
            }
          }

         
        });
      });
});

 // Send the data to the backend server
    //   fetch('http://127.0.0.1:5000/submit-username', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(requestData)
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //       console.log(data.message);
    //     });
    //     return fetch('http://127.0.0.1:5000/get-resume', {
    //     method: 'GET',
    //     credentials: 'include'  // Include credentials (session cookies) in the request
    //   });
    // })

    //   // fetch('http://127.0.0.1:5000/get-resume', {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Content-Type': 'application/json'
    //   //   },
    //   // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const resumeData = data.resume;
    //     console.log(resumeData)
    //     if (resumeData == null || resumeData.length === 0){
    //       const resumeElement = document.getElementById("resumeElement");
    //       resumeElement.textContent = "No found experiences, please add below";
    //     } else {
    //       const resumeElement = document.getElementById("resumeElement");
    //       resumeElement.textContent = resumeData;
    //     }

        
    //   });