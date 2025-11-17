// ---------- Background Rotation ----------
let bgIndex = 0;
function changeBackground() {
  document.getElementById("header").style.backgroundImage = `url('${bgImages[bgIndex]}')`;
  bgIndex = (bgIndex + 1) % bgImages.length;
}
setInterval(changeBackground, 2000);

// ---------- Load Gallery ----------
const galleryContainer = document.getElementById("galleryContainer");
const fragment = document.createDocumentFragment();

galleryImages.forEach((item, index) => {
  const div = document.createElement("div");
  div.classList.add("gallery-item");
  div.innerHTML = `
    <img data-src="${item.full}" loading="lazy" onclick="openModal(${index})">
    <div class="date">${item.date}</div>
  `;
  fragment.appendChild(div);
});

galleryContainer.appendChild(fragment);

// ---------- Lazy Loading with Intersection Observer ----------
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { rootMargin: "50px" });

document.querySelectorAll(".gallery-item img").forEach(img => {
  observer.observe(img);
});

// ---------- Modal ----------
let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modalImg");
  const downloadBtn = document.getElementById("downloadBtn");

  modal.style.display = "flex";
  modalImg.src = galleryImages[currentIndex].full;

  downloadBtn.onclick = () => {
    fetch(galleryImages[currentIndex].full)
      .then(r => r.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = galleryImages[currentIndex].full.split('/').pop();
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      })
      .catch(() => alert('Download failed due to CORS restrictions.'));
  };
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// ---------- Modal Navigation ----------
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  document.getElementById("modalImg").src = galleryImages[currentIndex].full;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById("modalImg").src = galleryImages[currentIndex].full;
}

// Keyboard support
window.addEventListener("keydown", e => {
  if (document.getElementById("myModal").style.display === "flex") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeModal();
  }
});

// ---------- Preload Background Images ----------
bgImages.forEach(url => { const img = new Image(); img.src = url; });

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", changeBackground);
