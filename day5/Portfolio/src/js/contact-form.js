const form = document.querySelector("form");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");
const formMessage = document.getElementById("formMessage");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });
}


if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = messageInput.value.trim();
    // if (!fname || !lname || !email || !message) {
    //   alert("Please fill in all fields.");
    //   return;
    // }

    // console.log("First Name:", fname);
    // console.log("Last Name:", lname);
    // console.log("Email:", email);
    // console.log("Message:", message);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!fname) {
      alert("First name is required.");
      return;
    }
    if (!lname) {
      alert("Last name is required.");
      return;
    }
    if (!email) {
      alert("Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!phone) {
      alert("Contact number is required.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit contact number.");
      return;
    }
    if (!message) {
      alert("Message is required.");
      return;
    }
    if (message.length > 300) {
      alert("Message must be 300 characters or less.");
      return;
    }

    const randomId = Math.random().toString(36).substring(2, 10);

    console.log(`Form Submission [ID: ${randomId}]
    - First Name: ${fname}
    - Last Name: ${lname}
    - Email: ${email}
    - Contact Number: ${phone}
    - Message: ${message}`);

    formMessage.classList.remove("hidden");

    setTimeout(() => {
      formMessage.classList.add("hidden");
    }, 5000);

    alert("Form submitted successfully! ✅");

    form.reset();
    charCount.textContent = "0 / 300";
  });
}

if (messageInput && charCount) {
  messageInput.addEventListener("input", () => {
    const currentLength = messageInput.value.length;
    charCount.textContent = `${currentLength} / 300`;
  });
}

document.querySelectorAll('.themeToggle').forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const html = document.documentElement;
    html.classList.toggle("dark");

    const isDark = html.classList.contains("dark");

    document.querySelectorAll('.themeToggle').forEach((toggleBtn) => {
      toggleBtn.textContent = isDark ? "Light" : "Dark";
      toggleBtn.classList.toggle("bg-black", isDark);
      toggleBtn.classList.toggle("text-white", isDark);
      toggleBtn.classList.toggle("bg-white", !isDark);
      toggleBtn.classList.toggle("text-black", !isDark);
    });
  });
});

function toggleDropdown() {
  document.getElementById("mobileDropdown").classList.toggle("hidden");
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (!openDropdown.classList.contains("hidden")) {
        openDropdown.classList.add("hidden");
      }
    }
  }
};
