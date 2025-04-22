import { personalInfo, projects, profiles, aboutMe, education, skills, certificates } from "./info.js";

const nameEl = document.getElementById("introName");
const roleEl = document.getElementById("introRole");

if (nameEl && roleEl) {
  nameEl.textContent = personalInfo.name;
  roleEl.textContent = personalInfo.role;
}
const aboutContent = document.getElementById("aboutContent");
if (aboutContent) {
  aboutContent.innerHTML = aboutMe.map(para => `<p>${para}</p>`).join("");
}

const educationContent = document.getElementById("educationContent");
if (educationContent) {
  educationContent.innerHTML = education.map(item => `
    <div>
      <h3 class="text-xl font-semibold">${item.institution}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-200 dark:bg-gray-900">${item.program}</p>
      <span class="text-sm text-gray-500 dark:text-gray-200 dark:bg-gray-900">${item.duration}</span>
    </div>
  `).join("");
}

const projectContainer = document.getElementById("projectContainer");
if (projectContainer) {
  projectContainer.innerHTML = projects.map((project) => `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md-dark overflow-hidden text-center hover:scale-105 transition-transform">
      <img src="${project.image}" alt="${project.title}" class="w-full h-40 object-cover bg-gray-100 dark:bg-gray-700" />
      <p class="py-2 font-semibold">${project.title}</p>
      <a href="${project.link}" target="_blank" class="inline-block bg-accent hover:bg-hoverAccent text-white py-2 px-4 rounded mb-4">
        View Project
      </a>
    </div>
  `).join("");
}

const profileContainer = document.getElementById("profileContainer");
if (profileContainer) {
  profileContainer.innerHTML = profiles.map((profile) => `
    <div class="scroll-item bg-white dark:bg-gray-800">
      <a href="${profile.link}" target="_blank">
        <img src="${profile.image}" alt="${profile.name} Profile" class="bg-white dark:bg-gray-700 p-2" />
      </a>
    </div>
  `).join("");
}

const skillsContent = document.getElementById("skillsContent");
if (skillsContent) {
  skillsContent.innerHTML = `
    <div>
      <h3 class="text-xl font-semibold mb-2">Technical Skills</h3>
      <ul class="list-disc ml-6 space-y-1">
        ${skills.technical.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
    </div>
    <div>
      <h3 class="text-xl font-semibold mb-2">Soft Skills</h3>
      <ul class="list-disc ml-6 space-y-1">
        ${skills.soft.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
    </div>
  `;
}

const certificatesContent = document.getElementById("certificatesContent");
if (certificatesContent) {
  certificatesContent.innerHTML = certificates.map(cert => `
    <div class="cert-card bg-white dark:bg-gray-800 text-center rounded-lg shadow-md-dark overflow-hidden">
      <a href="${cert.link}" target="_blank">
        <img src="${cert.image}" alt="${cert.title}" class="object-cover h-40 w-full bg-gray-100 dark:bg-gray-700" />
        <p class="text-lg font-semibold mt-2">${cert.title}</p>
      </a>
    </div>
  `).join("");
}