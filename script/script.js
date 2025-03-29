document.addEventListener("DOMContentLoaded", function () {
  const subscriptionForm = document.getElementById("subscriptionForm");
  const messageDiv = document.getElementById("message");

  if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subscriptionType =
        document.getElementById("subscriptionType").value;

      messageDiv.textContent = `Thank you, ${name}! Your ${subscriptionType} subscription has been renewed.`;

      this.reset();
    });

    subscriptionForm.addEventListener("focusin", function () {
      console.log("Form is focused!");
    });
  }

  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      alert("Dark Mode!");
    });
  }
  async function fetchClasses() {
    try {
      const response = await fetch(
        "https://fitflex-gym-backend.onrender.com/api/subscription"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const classes = await response.json();
      displayClasses(classes.slice(0, 5));
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  }

  function displayClasses(classes) {
    const classesContainer = document.getElementById("classesContainer");
    if (!classesContainer) return;

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

  fetchClasses();

  // SEARCH CLASSES
  function searchClasses() {
    const searchInput = document.getElementById("searchInput");
    const filter = searchInput.value.toLowerCase();
    const classes = document.querySelectorAll(".class");

    classes.forEach((classItem) => {
      const title = classItem.querySelector("h3").textContent.toLowerCase();
      classItem.style.display = title.includes(filter) ? "" : "none";
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", searchClasses);
  }

  const viewSubscriptionsButton = document.getElementById(
    "viewSubscriptionsButton"
  );
  const loadingIndicator = document.getElementById("loadingIndicator");
  const subscriptionsContainer = document.getElementById(
    "subscriptionsContainer"
  );

  if (viewSubscriptionsButton) {
    viewSubscriptionsButton.addEventListener("click", async function () {
      try {
        loadingIndicator.style.display = "block";
        subscriptionsContainer.innerHTML = "";
        messageDiv.textContent = "";

        const response = await fetch(
          "https://fitflex-gym-backend.onrender.com/api/subscription"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const subscriptions = await response.json();
        console.log("API Response:", subscriptions);

        if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
          messageDiv.textContent = "No subscriptions found.";
          return;
        }

        displaySubscriptions(subscriptions);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        messageDiv.textContent = "Failed to load subscriptions.";
      } finally {
        loadingIndicator.style.display = "none";
      }
    });
  }

  function displaySubscriptions(subscriptions) {
    subscriptionsContainer.innerHTML = "";
    subscriptionsContainer.style.display = "block";

    subscriptions.forEach((sub) => {
      const subscriptionDiv = document.createElement("div");
      subscriptionDiv.classList.add("subscription");
      subscriptionDiv.innerHTML = `
        <h3>${sub.type || "Unknown Type"}</h3>
        <p>Name: ${sub.name || "N/A"}</p>
        <p>Email: ${sub.email || "N/A"}</p>
        <p>Status: ${sub.status || "N/A"}</p>
      `;
      subscriptionsContainer.appendChild(subscriptionDiv);
    });
  }
});
