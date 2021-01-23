///////////////////////////////////////////////////////////
// data
//////////////

const sectionList = [
  { title: "Soul", image: "/images2/soul.jpg" },
  { title: "Onward", image: "/images2/Onward.png" },
  { title: "Toy Stoy 4", image: "/images2/toystory4.jpg" },
  { title: "Cars 3", image: "/images2/cars3.jpg" },
  { title: "Coco", image: "/images2/coco.jpg" },
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
  // console.log(`A : ${index} ${activeIndex}`);
  if (index != activeIndex) {
    setActiveSection(index);
    sections[index].scrollIntoView(true);
  }
};

const setActiveSection = (index) => {
  console.log(`B : ${index} ${activeIndex}`);
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
/// Create a nav bar item for each section item
for (let i = 0; i < sectionList.length; i++) {
  let section = sectionList[i];
  const navItem = createNavbarItem("#", section.title);
  if (i == 0) {
    navItem.classList.add("active_nav_item");
  }
  // setup the nav item click function
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
  // clar the callback function while still scrolling
  window.clearTimeout(isScrolling);

  // Set the navbar hiddent while scrolling
  document.querySelector("nav").classList.add("nav_hidden");

  isScrolling = window.setTimeout(() => {
    document.querySelector("nav").classList.remove("nav_hidden");
    const offset = main.scrollLeft;
    if (offset > currentOffset) {
      scrollDirection = ScrollDirections.right;
    } else {
      scrollDirection = ScrollDirections.left;
    }
    currentOffset = offset;

    const sectionWidth = sections[0].offsetWidth;
    const threshold = sectionWidth / 3.5;

    // Show the back button if we scroll after distance
    if (offset > sectionWidth / 6) {
      document.querySelector(".back_top").classList.remove("btn_hidden");
    } else {
      document.querySelector(".back_top").classList.add("btn_hidden");
    }

    // let index = activeIndex;

    // // for (let i = 0; i < sections.length; i++) {
    // //   const offsetLeft = sections[i].offsetLeft;
    // //   const offsetWidth = sections[i].offsetWidth;

    // //   if (
    // //     offset > offsetLeft - threshold &&
    // //     offset < offsetLeft + offsetWidth - threshold
    // //   ) {
    // //     index = i;
    // //   }
    // // }
    // // setActiveSection(index);
  }, 200);
});

const title = document.querySelector(".text_container_title");
title.addEventListener("click", () => {
  const content = document.querySelector(".test_container_content");
  content.classList.toggle("test_container_toggle");
});

//////////////////////////////////////////////////////////
/// Sections Collpasing
////////////////////////

/// Close all sections
sections.forEach((section, index) => {
  section.classList.add("section_collapse");
  section.addEventListener("click", () => {
    setActiveSection(index);
  });
});

/// Open the first section when the page inital load
sections[0].classList.remove("section_collapse");

//////////////////////////////////////////////////////////
