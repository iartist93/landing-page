///////////////////////////////////////////////////////////
// Sections
//////////////

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

// database
const sectionList = [
  { title: "S01 E01", image: "/images/s01_e01.png" },
  { title: "S01 E02", image: "/images/s01_e02.png" },
  { title: "S01 E03", image: "/images/s01_e03.png" },
  { title: "S01 E04", image: "/images/s01_e04.png" },
];

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

// get main tag
const main = document.querySelector("main");

// append the new sections to the main tag in one batch
main.append(sectionDocumentFragment);

///////////////////////////////////////////////////////////
// Nav bar
///////////

const header = document.querySelector("header");
const nav = document.createElement("nav");
const ul = document.createElement("ul");
ul.setAttribute("class", "main_nav");
const navDocumentFragment = new DocumentFragment();

nav.appendChild(ul);

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

const navItemClicked = (index) => {
  // query the section with this index
  const sections = document.querySelectorAll("section");
  const navitems = document.querySelectorAll(".nav_item");

  // toggle the active class on it
  for (let i = 0; i < sections.length; i++) {
    if (i == index) {
      sections[i].classList.add("active_section");
      navitems[i].classList.add("active_nav_item");
    } else {
      sections[i].classList.remove("active_section");
      navitems[i].classList.remove("active_nav_item");
    }
    sections[index].scrollIntoView();
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
    navItemClicked(i);
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
