// ---------- Background Rotation ----------
let bgIndex = 0;
function changeBackground() {
  document.getElementById("header").style.backgroundImage = `url('${bgImages[bgIndex]}')`;
  bgIndex = (bgIndex + 1) % bgImages.length;
}
setInterval(changeBackground, 2000);

// ---------- Load Gallery ----------
const galleryContainer = document.getElementById("galleryContainer");

galleryImages.forEach(item => {
  const div = document.createElement("div");
  div.classList.add("gallery-item");
  div.innerHTML = `
    <img src="${item.src}" onclick="openModal('${item.src}')">
    <div class="date">${item.date}</div>
  `;
  galleryContainer.appendChild(div);
});

// ---------- Modal ----------
function openModal(imgSrc) {
  document.getElementById("myModal").style.display = "flex";
  document.getElementById("modalImg").src = imgSrc;
  document.getElementById("downloadBtn").href = imgSrc;
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", changeBackground);
