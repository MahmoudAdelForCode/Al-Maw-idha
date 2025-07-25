//Explore button
let exploreBtn = document.querySelector(`.title .btn`);
HadithSection = document.querySelector(`.hadith`);
exploreBtn.addEventListener(`click`, (eo) => {
  HadithSection.scrollIntoView({
    behavior: "smooth",
  });
});

//link section
let sections = document.querySelectorAll("section"),
  links = document.querySelectorAll(".header ul li");

links.forEach((li) => {
  li.addEventListener("click", (eo) => {
    document.querySelector(".header ul li.active").classList.remove("active");
    li.classList.add("active");
    let target = li.dataset.filter;
    sections.forEach((section) => {
      if (section.classList.contains(target)) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

let fixedNav = document.querySelector(".header");
let scrollBt = document.querySelector(`.scrollBtn`);
window.addEventListener("scroll", (eo) => {
  window.scrollY > 100
    ? fixedNav.classList.add(`active`)
    : fixedNav.classList.remove(`active`);
  window.scrollY > 500
    ? scrollBt.classList.add("active")
    : scrollBt.classList.remove("active");
});

scrollBt.addEventListener("click",(eo) => {
  window.scrollTo({
    top:0,
    behavior :"smooth"
  })
})

//==========================Hadith Changer==========================
{
  let HadithContainer = document.querySelector(`.hadithContainer`),
    next = document.querySelector(`.next`),
    prev = document.querySelector(`.prev`),
    number = document.querySelector(`.number`);

  let hadithIndex = 0;
  HadithChanger();
  function HadithChanger() {
    fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
      .then((response) => response.json())
      .then((data) => {
        let Hadiths = data.data.hadiths;
        changeHadith();

        //===================next buttom=================
        next.addEventListener("click", (eo) => {
          if (hadithIndex == 298) {
            hadithIndex++;
            changeHadith();
            eo.target.classList.add("disabled");
          } else {
            prev.classList.remove("disabled");
            hadithIndex++;
            changeHadith();
          }
        });

        //===================prev buttom=================
        prev.classList.add("disabled");
        prev.addEventListener("click", (eo) => {
          if (hadithIndex == 1) {
            hadithIndex--;
            changeHadith();
            eo.target.classList.add("disabled");
          } else {
            next.classList.remove("disabled");
            hadithIndex--;
            changeHadith();
          }
        });
        //================function changeHadith================
        function changeHadith() {
          HadithContainer.innerText = Hadiths[hadithIndex].arab;
          number.innerText = `${hadithIndex + 1} / 300 `;
        }
      });
  }
}

//Surah Api
let Surahscontainer = document.querySelector(".surhasContainer");
getSurahs();
function getSurahs() {
  //fetch Surahs meta data (Name of Suras)
  fetch("http://api.alquran.cloud/v1/meta")
    .then((response) => response.json())
    .then((data) => {
      Surahscontainer.innerHTML = "";
      let surahs = data.data.surahs.references;
      let numberOfSurahs = 114;
      for (let i = 0; i < numberOfSurahs; i++) {
        Surahscontainer.innerHTML += `<div class="surah">
      <p>${surahs[i].name}</p>
      <p>${surahs[i].englishName}</p>
    </div>`;
      }
      let SurahsTitle = document.querySelectorAll(".surah");
      let popup = document.querySelector(".surah-popup"),
        AyataContainer = document.querySelector(".ayat");
      SurahsTitle.forEach((title, index) => {
        title.addEventListener("click", (eo) => {
          fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              AyataContainer.innerHTML = "";
              let Ayat = data.data.ayahs;
              Ayat.forEach((aya) => {
                popup.classList.add("active");
                AyataContainer.innerHTML += `
            <p>(${aya.numberInSurah}) - ${aya.text}</p>`;
              });
            });
        });
      });

      let closePopup = document.querySelector(".close-popup");
      closePopup.addEventListener("click", (eo) => {
        popup.classList.remove("active");
      });
    });
}

//************* prayTime api*****
let cards = document.querySelector(".cards");
getPrayTimes();
function getPrayTimes() {
  fetch(
    " http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8"
  )
    .then((response) => response.json())
    .then((data) => {
      let times = data.data.timings;
      cards.innerHTML = "";
      for (let time in times) {
        cards.innerHTML += `  <div class="card">
      <div class="circle">
        <svg>
          <Circle cx="100" cy="100" r="100" ></Circle>
        </svg>
        <div class="praytime">${times[time]}</div>

      </div>
      <p>${time}</p>
    </div>`;
      }
    });
}

// Get the bubbles container
const bubblesContainer = document.querySelector(".bubbles");

// Create bubbles
for (let i = 0; i < 128; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.setProperty("--size", `${2 + Math.random() * 2}rem`);
  bubble.style.setProperty("--distance", `${6 + Math.random() * 2}rem`);
  bubble.style.setProperty("--position", `${6 + Math.random() * 110}%`);
  bubble.style.setProperty("--time", `${2 + Math.random() * 2}s`);
  bubble.style.setProperty("--delay", `${-1 * (2 + Math.random() * 2)}s`);
  bubblesContainer.appendChild(bubble);
}



//Active sidebar
let bars=document.querySelector(".bars"),
SideBar=document.querySelector(".header ul")
bars.addEventListener("click",(eo) => {
  SideBar.classList.toggle("active")
})
  
