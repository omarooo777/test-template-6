// Toggle Switch Sidbar
let sidbarContainer = document.querySelector(".sidbar"),
  contentAreaContainer = document.querySelector(".content-area"),
  sidbarSwitchBTN = document.querySelector("header .sidbar-switch");

sidbarSwitchBTN.addEventListener("click", () => {
  sidbarContainer.classList.toggle("close-sidbar");
  contentAreaContainer.classList.toggle("full-screen");
});

// Toggle Submenu In Sidbar
let mainLinkUl = document.querySelectorAll(".main-link > li.has-submenu");
let toggleSubmenuIcon = document.querySelectorAll(".link .toggle-submenu");
let submenuUl = document.querySelectorAll(".main-link .submenu");

mainLinkUl.forEach((link, i) => {
  link.addEventListener("click", () => {
    toggleSubmenuIcon[i].classList.toggle("rotate");
    submenuUl[i].classList.toggle("close-submenu");
  });
});

// The Height Of The Submenu
submenuUl.forEach((ul) => {
  ul.style.cssText = `height: ${ul.children.length * 27.5}px`;
});
