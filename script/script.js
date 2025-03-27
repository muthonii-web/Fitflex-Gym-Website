document.getElementById("subscriptionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subscriptionType = document.getElementById("subscriptionType").value;

  
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = `Thank you, ${name}! Your ${subscriptionType} subscription has been renewed.`;

    this.reset();
  });

  document.getElementById("darkModeToggle")
    .addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      alert('Dark Mode!');
    });

    document.getElementById("subscriptionForm")
      .addEventListener("focusin", function () {
        console.log("Form is focused!");
      });

async function fetchClasses() {
  const response = await fetch(
    "https://fitflex-gym-backend.onrender.com/api/subscription"
  );
  const classes = await response.json();
  displayClasses(classes.slice(0, 5));
}

function displayClasses(classes) {
  const classesContainer = document.getElementById("classesContainer");
  classesContainer.innerHTML = "";

  classes.forEach((classItem) => {
    const classDiv = document.createElement("div");
    classDiv.classList.add("class");
    classDiv.innerHTML = `
            <h3>${classItem.title}</h3>
            <p>${classItem.body}</p>
            <button class="like-button" data-id="${classItem.id}">Like</button>
            <span class="like-count" id="like-count-${classItem.id}">0</span>
        `;
    classesContainer.appendChild(classDiv);

    const likeButton = classDiv.querySelector(".like-button");
    likeButton.addEventListener("click", () => {
      const likeCountSpan = document.getElementById(
        `like-count-${classItem.id}`
      );
      let likeCount = parseInt(likeCountSpan.textContent);
      likeCount++;
      likeCountSpan.textContent = likeCount;
    });
  });
}

function searchClasses() {
  const searchInput = document.getElementById("searchInput");
  const filter = searchInput.value.toLowerCase();
  const classes = document.querySelectorAll(".class");

  classes.forEach((classItem) => {
    const title = classItem.querySelector("h3").textContent.toLowerCase();
    if (title.includes(filter)) {
      classItem.style.display = "";
    } else {
      classItem.style.display = "none";
    }
  });
}

document.getElementById("searchInput").addEventListener("input", searchClasses);

document
  .getElementById("darkModeToggle")
  .addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

fetchClasses();
