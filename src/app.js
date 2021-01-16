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
const sections = [
  { title: "AOT S01 E01", image: "/images/s01_e01.png" },
  { title: "AOT S01 E02", image: "/images/s01_e02.png" },
  { title: "AOT S01 E03", image: "/images/s01_e03.png" },
  { title: "AOT S01 E04", image: "/images/s01_e04.png" },
];

// create a new fragment to hold the sections
const sectionDocumentFragment = new DocumentFragment();

// create the page sections for each image in the images list
for (const section of sections) {
  let sectionElement = createSectionWithImage(section.image, section.title);
  sectionDocumentFragment.appendChild(sectionElement);
}

// get main tag
const main = document.querySelector("main");

// append the new sections to the main tag in one batch
main.append(sectionDocumentFragment);

///////////////////////////////////////////////////////////

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
  const link = document.createElement("a");
  link.textContent = lable;
  link.setAttribute("href", url);
  navItem.appendChild(link);
  return navItem;
};

for (const section of sections) {
  const navItem = createNavbarItem("#", section.title);
  navDocumentFragment.appendChild(navItem);
}
ul.appendChild(navDocumentFragment);
nav.appendChild(ul);
header.appendChild(nav);
