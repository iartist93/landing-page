///////////////////////////////////////////////////////////
// data
//////////////

const sectionList = [
  { title: "Soul", image: "src/images2/soul.jpg" },
  { title: "Onward", image: "src/images2/Onward.png" },
  { title: "Toy Stoy 4", image: "src/images2/toystory4.jpg" },
  { title: "Cars 3", image: "src/images2/cars3.jpg" },
  { title: "Coco", image: "src/images2/coco.jpg" },
];

///////////////////////////////////////////////////////////
// initalizations
//////////////

document.querySelector(".back_top").classList.add("btn_hidden");

// Queries
const main = document.querySelector("main");
const posters = document.querySelector(".posters");
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
  if (length == 0) {
    // query the section with this index
    sections = document.querySelectorAll(".img_section_item");
    navitems = document.querySelectorAll(".nav_item");
  }
};

/// NOTE: Can't slide more than the max width
/// so all elements > 1 won't slide as there's no space to slide into
/// only the switching between the first section
// and any other section will have noticable sliding effect
const setActiveSectionAndScroll = (index) => {
  if (index != activeIndex) {
    openSection(index);
    setActiveSection(index);

    // wait a moment before sliding to give the open sections function its time
    setTimeout(() => {
      // check weither we're at mobile or at desktop
      const mediaQuery1 = window.matchMedia("(max-width: 580px)");
      const mediaQuery2 = window.matchMedia(
        "(min-width: 580px) and (max-width: 1100px)"
      );

      if (mediaQuery1.matches || mediaQuery2.matches) {
        // get the css min-width of the collapsed sections
        const collapsedSection = document.querySelector(".section_collapse");
        const collapsedSectionStyle = window.getComputedStyle(collapsedSection);
        let minWidth = parseInt(
          collapsedSectionStyle.getPropertyValue("min-width")
        );
        // check for NaN
        if (minWidth !== minWidth) {
          if (mediaQuery2.matches) minWidth = 40;
          else minWidth = 30;
        }
        let x = 0;
        if (index >= 1) x = index * minWidth;
        posters.scrollTo({
          left: x,
          top: 0,
          behavior: "smooth",
        });
      } else {
        let x = 0;
        if (index >= 1) {
          // or just slide to max aviable width
          x = sections[index].offsetLeft;
        }
        main.scrollTo({
          left: x,
          top: 0,
          behavior: "smooth",
        });
      }
    }, 300);
  }
};

const setActiveSection = (index) => {
  if (index != activeIndex) {
    // toggle the active class on it
    sections[activeIndex].classList.remove("active_section");
    navitems[activeIndex].classList.remove("active_nav_item");

    sections[index].classList.add("active_section");
    navitems[index].classList.add("active_nav_item");

    activeIndex = index;
  }
};

const openSection = (index) => {
  for (let i = 0; i < sections.length; i++) {
    if (i === index) {
      sections[i].classList.remove("section_collapse");
    } else {
      sections[i].classList.add("section_collapse");
    }
  }

  // section.firstChild.classList.add("section_collapse");
  // const allSections = document.querySelectorAll("section");
  // const lastSection = allSections[allSections.length - 1];
  // lastSection.scrollIntoView(true);
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
posters.append(sectionDocumentFragment);

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
  // header.scrollIntoView(true);
  setActiveSectionAndScroll(0);
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

// const title = document.querySelector(".text_container_title");
// title.addEventListener("click", () => {
//   const content = document.querySelector(".test_container_content");
//   content.classList.toggle("test_container_toggle");
// });

//////////////////////////////////////////////////////////
/// Sections Collpasing
////////////////////////

// Close all sections
sections.forEach((section, index) => {
  section.classList.add("section_collapse");
  section.addEventListener("click", () => {
    setActiveSectionAndScroll(index);
  });
});

// Open the first section when the page inital load
sections[0].classList.remove("section_collapse");

//////////////////////////////////////////////////////////
