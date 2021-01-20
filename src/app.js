///////////////////////////////////////////////////////////
// data
//////////////

const sectionList = [
  { title: "S01 E01", image: "/images/s01_e01.png" },
  { title: "S01 E02", image: "/images/s01_e02.png" },
  { title: "S01 E03", image: "/images/s01_e03.png" },
  { title: "S01 E04", image: "/images/s01_e04.png" },
];

let activeIndex = 0;

///////////////////////////////////////////////////////////
// Helper Functions
//////////////////////

/**  Create a new section and append image to it
 * @param {String} imageURL relative path to the image, or web URL
 * @param {String} title alt of the image
 * @returns {HTMLElement} new section element
 */
const createSectionWithImage = (imageURL, title) => {
  const section = document.createElement("section");
  const image = document.createElement("img");
  image.setAttribute("src", imageURL);
  image.setAttribute("atl", title);
  section.appendChild(image);
  return section;
};

/**  Create a new section and append image to it
 * @param {String} imageURL relative path to the image, or web URL
 * @param {String} title alt of the image
 * @returns {HTMLElement} new section element
 */
const createNavbarItem = (url, lable) => {
  const navItem = document.createElement("li");
  navItem.classList.add("nav_item");
  const link = document.createElement("a");
  link.textContent = lable;
  link.setAttribute("href", url);
  navItem.appendChild(link);
  return navItem;
};

///////////////////////////////////////////////////////////
// Sections
//////////////

// get main tag
const main = document.querySelector("main");

// create a new fragment to hold the sections
const sectionDocumentFragment = new DocumentFragment();

// create the page sections for each image in the images list
for (let i = 0; i < sectionList.length; i++) {
  const section = sectionList[i];
  let sectionElement = createSectionWithImage(section.image, section.title);
  if (i == 0) {
    sectionElement.classList.add("active_section");
  }
  sectionDocumentFragment.appendChild(sectionElement);
}

// append the new sections to the main tag in one batch
main.append(sectionDocumentFragment);

///////////////////////////////////////////////////////////
// Nav bar
///////////

const header = document.querySelector("header");
const nav = document.createElement("nav");
const ul = document.createElement("ul");
ul.setAttribute("class", "main_nav");
nav.appendChild(ul);
const navDocumentFragment = new DocumentFragment();

const setActiveSection = (index) => {
  if (index != activeIndex) {
    // query the section with this index
    const sections = document.querySelectorAll("section");
    const navitems = document.querySelectorAll(".nav_item");

    // toggle the active class on it
    sections[index].classList.add("active_section");
    navitems[index].classList.add("active_nav_item");
    sections[activeIndex].classList.remove("active_section");
    navitems[activeIndex].classList.remove("active_nav_item");

    sections[index].scrollIntoView(true);
    activeIndex = index;
  }
};

//TODO:Refactor and use delgetion instead
for (let i = 0; i < sectionList.length; i++) {
  let section = sectionList[i];
  const navItem = createNavbarItem("#", section.title);
  if (i == 0) {
    navItem.classList.add("active_nav_item");
  }
  navItem.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveSection(i);
  });
  navDocumentFragment.appendChild(navItem);
}
ul.appendChild(navDocumentFragment);
nav.appendChild(ul);
header.appendChild(nav);

///////////////////////////////////////////////////////////
// Back to Top Button
////////////////////////

const backTopBtn = document.querySelector(".back_top");
backTopBtn.addEventListener("click", () => {
  const header = document.querySelector("header");
  header.scrollIntoView(true);
});

///////////////////////////////////////////////////////////
// Active Section on scrolling
////////////////////////////////

const sections = document.querySelectorAll("section");
const sectionsList = Array.from(sections);

var isScrolling;

main.addEventListener("scroll", (e) => {
  // detect if still scrolling
  window.clearTimeout(isScrolling);

  // run only when use done scrolling
  isScrolling = window.setTimeout(() => {
    let index = activeIndex;
    let minDistance = 0;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const dist = section.getBoundingClientRect().top;
      if (Math.abs(dist) <= 10) {
        index = i;
        console.log(`section ${i} / dist ${dist}`);
      }
    }
    setActiveSection(index);

    // if (minDistance > 0 && minDistance < 50) {
    //   setActiveSection(index);
    // }
    console.log("------------------------------------------");
  }, 100);
});
