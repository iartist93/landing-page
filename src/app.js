///////////////////////////////////////////////////////////
// data
//////////////

const sectionList = [
  { title: "Epsoid 01", image: "/images/s01_e01.png" },
  { title: "Epsoid 02", image: "/images/s01_e02.png" },
  { title: "Epsoid 03", image: "/images/s01_e03.png" },
  { title: "Epsoid 04", image: "/images/s01_e04.png" },
  { title: "Epsoid 05", image: "/images/s01_e01.png" },
  { title: "Epsoid 06", image: "/images/s01_e02.png" },
  { title: "Epsoid 07", image: "/images/s01_e03.png" },
  { title: "Epsoid 08", image: "/images/s01_e04.png" },
  { title: "Epsoid 09", image: "/images/s01_e01.png" },
  { title: "Epsoid 10", image: "/images/s01_e02.png" },
  { title: "Epsoid 11", image: "/images/s01_e03.png" },
  { title: "Epsoid 12", image: "/images/s01_e04.png" },
];

///////////////////////////////////////////////////////////
// initalizations
//////////////

document.querySelector(".back_top").classList.add("btn_hidden");

// Queries
const main = document.querySelector("main");
const header = document.querySelector("header");
const nav = document.querySelector("nav");
const nav_ul = document.querySelector("nav ul");

let activeIndex = 0;
let sections = [];
let navitems = [];

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
  section.classList.add("img_section_item");
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

const getElements = () => {
  if (sections.length == 0) {
    // query the section with this index
    sections = document.querySelectorAll(".img_section_item");
    navitems = document.querySelectorAll(".nav_item");
  }
};

const setActiveSectionAndScroll = (index) => {
  if (index != activeIndex) {
    setActiveSection(index);
    sections[index].scrollIntoView(true);
  }
};

const setActiveSection = (index) => {
  if (index != activeIndex) {
    // toggle the active class on it
    sections[activeIndex].classList.remove("active_section");
    navitems[activeIndex].classList.remove("active_nav_item");

    sections[index].classList.add("active_section");
    navitems[index].classList.add("active_nav_item");

    openSection(index);
    activeIndex = index;
  }
};

const openSection = (index) => {
  for (const section of sections) {
    section.classList.add("section_collapse");
    // section.firstChild.classList.add("section_collapse");
  }
  sections[index].classList.remove("section_collapse");
};

///////////////////////////////////////////////////////////
// Sections
//////////////

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

const navDocumentFragment = new DocumentFragment();

//TODO:Refactor and use delgetion instead
for (let i = 0; i < sectionList.length; i++) {
  let section = sectionList[i];
  const navItem = createNavbarItem("#", section.title);
  if (i == 0) {
    navItem.classList.add("active_nav_item");
  }
  navItem.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveSectionAndScroll(i);
  });
  navDocumentFragment.appendChild(navItem);
}

nav_ul.appendChild(navDocumentFragment);

getElements();

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

const ScrollDirections = {
  right: 1,
  left: 0,
};

let currentOffset = main.scrollLeft;
let scrollDirection = ScrollDirections.right;

let isScrolling;

main.addEventListener("scroll", (e) => {
  window.clearTimeout(isScrolling);
  document.querySelector("nav").classList.add("nav_hidden");

  isScrolling = window.setTimeout(() => {
    document.querySelector("nav").classList.remove("nav_hidden");
  }, 200);

  const offset = main.scrollLeft;
  if (offset > currentOffset) {
    scrollDirection = ScrollDirections.right;
  } else {
    scrollDirection = ScrollDirections.left;
  }
  currentOffset = offset;

  const sectionWidth = sections[0].offsetWidth / 2;
  const threshold = sectionWidth / 3.5;

  if (offset > sectionWidth) {
    document.querySelector(".back_top").classList.remove("btn_hidden");
  } else {
    document.querySelector(".back_top").classList.add("btn_hidden");
  }

  let index = activeIndex;

  for (let i = 0; i < sections.length; i++) {
    const offsetLeft = sections[i].offsetLeft;
    const offsetWidth = sections[i].offsetWidth;

    if (
      offset > offsetLeft - threshold &&
      offset < offsetLeft + offsetWidth - threshold
    ) {
      index = i;
    }
  }
  setActiveSection(index);
});

const title = document.querySelector(".text_container_title");
title.addEventListener("click", () => {
  const content = document.querySelector(".test_container_content");
  content.classList.toggle("test_container_toggle");
});

//////////////////////////////////////////////////////////

sections.forEach((section, index) => {
  section.classList.add("section_collapse");
  section.addEventListener("click", () => {
    openSection(index);
  });
});
sections[0].classList.remove("section_collapse");
