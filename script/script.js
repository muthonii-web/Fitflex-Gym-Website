document
  .getElementById("subscriptionForm")
  .addEventListener("submit", function (event) {
      event.preventDefault(); 
      
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subscriptionType = document.getElementById("subscriptionType").value;


    const messageDiv = document.getElementById("message");
    messageDiv.textContent = `Thank you, ${name}! Your ${subscriptionType} subscription has been renewed.`;

    
    this.reset();
  });
  document
    .getElementById("darkModeToggle")
    .addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      alert("Dark mode!");
    });

    document
      .getElementById("subscriptionForm")
      .addEventListener("focusin", function () {
        console.log("Form is focused!");
      });
