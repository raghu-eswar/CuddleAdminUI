var usersList = [];
var User = function(name, email, status, role, lastLogin, permission) {
    this.name = name;
    this.email = email;
    this.status = status;
    this.role = role;
    this.lastLogin = lastLogin;
    this.permission = permission;
}

var user1 = new User("Raghu Eswar", "raghueswar55@gmail.com", 1, "Administrator", "Not at", 1);
var user2 = new User("Raghu Eswar", "raghueswar55@gmail.com", 0, "Administrator", "Not at", 0);
var user3 = new User("Raghu Eswar", "raghueswar55@gmail.com", 1, "Administrator", "Not at", 1);

usersList.push(user1, user2, user3, user1, user2, user3);

function showUserList() {
    let data = document.getElementById("data");
    while (data.firstChild) {
        data.firstChild.remove();
    }
    data.appendChild(createAdminOptions());
    data.appendChild(createSearchBar());
    data.appendChild(createUsersData());
}

function createAdminOptions() {
    let adminOptions = document.createElement("div");
    let innerDiv = document.createElement("div");
    let userCount = document.createElement("div");
    let count = document.createElement("span");
    count.setAttribute("id", "users-count");
    count.innerHTML = usersList.length + ")";
    userCount.innerHTML = "Users(";
    userCount.appendChild(count);
    let addNewUserButton = document.createElement("button");
    addNewUserButton.innerHTML = "&#10010; ADD NEW";
    innerDiv.appendChild(userCount);
    innerDiv.appendChild(addNewUserButton);
    adminOptions.setAttribute("id", "admin-options");
    adminOptions.appendChild(innerDiv);
    return adminOptions;
}

function createSearchBar() {
    let searchBar = document.createElement("div");
    searchBar.setAttribute("id", "search");
    let innerDiv = document.createElement("div");
    let searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search by Name, Email, Status, Role";
    let submitButton = document.createElement("button");
    innerDiv.appendChild(searchInput);
    innerDiv.appendChild(submitButton);
    searchBar.appendChild(innerDiv);
    return searchBar;
}

function createUsersData() {
    let usersData = document.createElement("div");
    usersData.setAttribute("id", "users-data");
    let header = createTableHeader();
    header.setAttribute("class", "table-row")
    header.setAttribute("id", "table-header")
    usersData.appendChild(header);
    usersList.forEach(function(user) {
        usersData.appendChild(createTableData(user));
    })
    return usersData;
}

function createTableData(user) {
    let tableData = document.createElement("div");
    tableData.setAttribute("id", "table-data");
    tableData.setAttribute("class", "table-row");
    let name = document.createElement("div");
    name.setAttribute("id", "user-name");
    let imageContainer = document.createElement("span");
    let profileImage = document.createElement("img");
    profileImage.src = "../images/dummy-person-icon.jpg";
    imageContainer.appendChild(profileImage);
    let nameContainer = document.createElement("span");
    nameContainer.innerHTML = user.name;
    name.appendChild(imageContainer);
    name.appendChild(nameContainer);
    let email = document.createElement("div");
    email.innerHTML = user.email;
    email.setAttribute("id", "email");
    let status = document.createElement("div");
    status.setAttribute("id", "status");
    let statusButton = document.createElement("button");
    statusButton.setAttribute("id", "user-status-button");
    if (user.status) {
        statusButton.setAttribute("class", "status-active");
        statusButton.innerHTML = "Active";
    } else {
        statusButton.setAttribute("class", "status-inactive");
        statusButton.innerHTML = "Inactive";
    }
    status.appendChild(statusButton);
    let role = document.createElement("div");
    role.innerHTML = user.role;
    role.setAttribute("id", "role");
    let lastLogin = document.createElement("div");
    lastLogin.innerHTML = user.lastLogin;
    lastLogin.setAttribute("id", "last-login");
    let permission = document.createElement("div");
    permission.innerHTML = (user.permission) ? "Valid" : "Invalid";
    permission.setAttribute("id", "permission");
    let options = document.createElement("div");
    options.setAttribute("id", "more-option");
    let moreOptionsButton = document.createElement("button");
    moreOptionsButton.setAttribute("id", "more-options-button")
    moreOptionsButton.innerHTML = "...";
    options.appendChild(moreOptionsButton);
    tableData.appendChild(name);
    tableData.appendChild(email);
    tableData.appendChild(status);
    tableData.appendChild(role);
    tableData.appendChild(lastLogin);
    tableData.appendChild(permission);
    tableData.appendChild(options);
    return tableData;
}


function createTableHeader() {
    let header = document.createElement("div");
    let name = document.createElement("div");
    name.innerHTML = "Name"
    name.setAttribute("id", "user-name");
    let email = document.createElement("div");
    email.innerHTML = "Email";
    email.setAttribute("id", "email");
    let status = document.createElement("div");
    status.innerHTML = "Status";
    status.setAttribute("id", "status");
    let role = document.createElement("div");
    role.innerHTML = "Roll";
    role.setAttribute("id", "role");
    let lastLogin = document.createElement("div");
    lastLogin.innerHTML = "Last Login";
    lastLogin.setAttribute("id", "last-login");
    let permission = document.createElement("div");
    permission.innerHTML = "Permission";
    permission.setAttribute("id", "permission");
    let options = document.createElement("div");
    options.innerHTML = "Options";
    options.setAttribute("id", "more-option");
    header.appendChild(name);
    header.appendChild(email);
    header.appendChild(status);
    header.appendChild(role);
    header.appendChild(lastLogin);
    header.appendChild(permission);
    header.appendChild(options);
    return header;
}

function showSubMenu(event) {
    let target = (event.target === undefined) ? event : event.target;
    let hiddenLinks = target.parentElement.querySelector(".hidden-div");
    hiddenLinks.style.display = (hiddenLinks.style.display == "block") ? "none" : "block"
}

function triggerParent(event) {
    event.stopPropagation();
    event.target.parentElement.onclick(event.target.parentElement);
}