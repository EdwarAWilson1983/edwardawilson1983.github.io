/* ==========================================================
   HIGHER IDEALS FRAMEWORK
   Version 1.0
========================================================== */

const article = document.getElementById("article-content");
const toc = document.getElementById("toc");
const readtime = document.getElementById("readtime");
const progress = document.getElementById("progress");
const topButton = document.getElementById("top");

/* ==========================================================
   BUILD TABLE OF CONTENTS
========================================================== */

const headings = article.querySelectorAll("h2");

headings.forEach((heading) => {

    if (!heading.id) {

        heading.id = heading.textContent
            .toLowerCase()
            .replace(/\s+/g, "-");

    }

    const link = document.createElement("a");

    link.href = "#" + heading.id;

    link.textContent = heading.textContent;

    toc.appendChild(link);

});

/* ==========================================================
   READING TIME
========================================================== */

const words = article.innerText.trim().split(/\s+/).length;

const minutes = Math.max(1, Math.ceil(words / 225));

readtime.textContent = minutes + " minute read";

/* ==========================================================
   READING PROGRESS
========================================================== */

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent = (scrollTop / scrollHeight) * 100;

    progress.style.width = percent + "%";

});

/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ==========================================================
   ACTIVE TABLE OF CONTENTS
========================================================== */

const sections = article.querySelectorAll("section[id]");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            document
                .querySelectorAll("#toc a")
                .forEach((link)=>{

                    link.classList.remove("active");

                    if(link.getAttribute("href")==="#" + entry.target.id){

                        link.classList.add("active");

                    }

                });

        }

    });

},{
    threshold:.35
});

sections.forEach(section=>observer.observe(section));

/* ==========================================================
   IMAGE LIGHTBOX
========================================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

document.querySelectorAll(".article-image").forEach((image)=>{

    image.addEventListener("click",()=>{

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

    });

});

lightbox.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        lightbox.classList.remove("active");

    }

});
