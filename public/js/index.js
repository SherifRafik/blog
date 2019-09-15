let navItems = document.querySelectorAll("li.nav-item");
console.log(navItems);


for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click", function () {
    navItems[0].classList.remove("active");
    navItems[1].classList.remove("active");
    this.classList.add("active");
  });
}