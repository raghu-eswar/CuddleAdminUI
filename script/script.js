function showSubMenu(event) {
    let target = (event.target === undefined) ? event : event.target;
    let hiddenLinks = target.parentElement.querySelector(".hidden-div");
    hiddenLinks.style.display = (hiddenLinks.style.display == "block") ? "none" : "block"
}

function triggerParent(event) {
    event.stopPropagation();
    event.target.parentElement.onclick(event.target.parentElement);
}