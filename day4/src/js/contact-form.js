const form = document.querySelector("form");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");
const formMessage = document.getElementById("formMessage");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const themeToggleBtn = document.getElementById("themeToggle");

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
    const message = messageInput.value.trim();

    if (!fname || !lname || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("First Name:", fname);
    console.log("Last Name:", lname);
    console.log("Email:", email);
    console.log("Message:", message);

    formMessage.classList.remove("hidden");

    setTimeout(() => {
      formMessage.classList.add("hidden");
    }, 5000);

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

if (themeToggleBtn) {
    const html = document.documentElement;
    themeToggleBtn.addEventListener("click", () => {
      html.classList.toggle("dark");
      const isDark = html.classList.contains("dark");
      themeToggleBtn.textContent = isDark ? "Light Theme" : "Dark Theme";
      themeToggleBtn.classList.toggle("bg-black", isDark);
      themeToggleBtn.classList.toggle("text-white", isDark);
      themeToggleBtn.classList.toggle("bg-white", !isDark);
      themeToggleBtn.classList.toggle("text-black", !isDark);
    });
}
