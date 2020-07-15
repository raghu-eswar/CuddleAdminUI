var usersList = [];
var User = function(name, email, status, role, lastLogin, permission) {
    this.name = name;
    this.email = email;
    this.status = status;
    this.role = role;
    this.lastLogin = lastLogin;
    this.permission = permission;
}

var user1 = new User("Raghu", "raghu55@gmail.com", "Active", "Administrator", "Not at", 1);
var user2 = new User("Eswar", "eswar55@gmail.com", "Inactive", "Administrator", "Not at", 0);
var user3 = new User("Raghu Eswar", "raghueswar55@gmail.com", "Active", "User", "Not at", 1);
var user4 = new User("Raghu", "raghu@gmail.com", "Active", "Administrator", "Not at", 1);
var user5 = new User("Eswar", "eswar@gmail.com", "Inactive", "Administrator", "Not at", 0);
var user6 = new User("Raghu Eswar", "raghueswar@gmail.com", "Active", "User", "Not at", 1);

usersList.push(user1, user2, user3, user4, user5, user6, user1, user2, user3, user4, user5, user6, user1, user2, user3, user4, user5, user6);

function showUserList() {
    event.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
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
    let dataList = document.createElement("datalist");
    dataList.setAttribute("id", "users-suggestions");
    searchInput.setAttribute("list", "users-suggestions");
    searchInput.addEventListener("input", showSuggestions);
    let submitButton = document.createElement("button");
    submitButton.addEventListener("click", filterUsers);
    innerDiv.appendChild(searchInput);
    innerDiv.appendChild(dataList);
    innerDiv.appendChild(submitButton);
    searchBar.appendChild(innerDiv);
    return searchBar;
}

function filterUsers(event) {
    debugger;
    let tableData = document.getElementById("table-data");
    let searchWord = event.target.parentElement.querySelector("input").value.toLowerCase();
    while (tableData.firstChild) {
        tableData.firstChild.remove();
    }
    let filteredArray = usersList.filter(function(user) {
        for (let key in user) {
            if ((user[key] + "").toLowerCase() === searchWord)
                return user;
        }
    });
    filteredArray.forEach(function(user) {
        tableData.appendChild(createTableRow(user));
    });
}

function showSuggestions(event) {
    let dataList = event.target.parentElement.querySelector("datalist");
    dataList.innerHTML = "";
    let searchWord = event.target.value.toLowerCase();
    let suggestions = new Set();
    usersList.forEach(function(user) {
        for (let key in user) {
            if ((user[key] + "").toLowerCase().includes(searchWord))
                suggestions.add(user[key]);
        }
    });
    suggestions.forEach(function(value) {
        let option = document.createElement("option");
        option.value = value;
        dataList.appendChild(option);
    });
}

function createUsersData() {
    let usersData = document.createElement("div");
    usersData.setAttribute("id", "users-data");
    let tableData = document.createElement("div");
    tableData.setAttribute("id", "table-data");
    usersData.appendChild(createTableHeader());
    usersList.forEach(function(user) {
        tableData.appendChild(createTableRow(user));
    });
    usersData.appendChild(tableData);
    return usersData;
}

function createTableRow(user) {
    let row = document.createElement("div");
    row.setAttribute("class", "table-row");
    let nameData = document.createElement("div");
    let nameHeader = document.createElement("div");
    nameHeader.setAttribute("class", "table-header-cell");
    nameHeader.innerHTML = "Name";
    let name = document.createElement("div");
    name.setAttribute("id", "user-name");
    name.setAttribute("class", "table-cell");
    let imageContainer = document.createElement("span");
    let profileImage = document.createElement("img");
    profileImage.src = "../images/dumpy-profile-icon.svg";
    imageContainer.appendChild(profileImage);
    let nameContainer = document.createElement("span");
    nameContainer.innerHTML = user.name;
    name.appendChild(imageContainer);
    name.appendChild(nameContainer);
    nameData.appendChild(nameHeader);
    nameData.appendChild(name);
    row.appendChild(nameData);
    let emailData = document.createElement("div");
    let emailHeader = document.createElement("div");
    emailHeader.setAttribute("class", "table-header-cell");
    emailHeader.innerHTML = "Email";
    let email = document.createElement("div");
    email.innerHTML = user.email;
    email.setAttribute("id", "email");
    email.setAttribute("class", "table-cell");
    emailData.appendChild(emailHeader);
    emailData.appendChild(email);
    row.appendChild(emailData);
    let statusData = document.createElement("div");
    let statusHeader = document.createElement("div");
    statusHeader.setAttribute("class", "table-header-cell");
    statusHeader.innerHTML = "Status";
    let status = document.createElement("div");
    status.setAttribute("id", "status");
    status.setAttribute("class", "table-cell");
    let statusButton = document.createElement("button");
    statusButton.setAttribute("id", "user-status-button");
    if (user.status == "Active") {
        statusButton.setAttribute("class", "status-active");
        statusButton.value = 1;
    } else {
        statusButton.setAttribute("class", "status-inactive");
        statusButton.value = 0;
    }
    statusButton.innerHTML = user.status;
    statusButton.addEventListener("click", changeUserStatus);
    status.appendChild(statusButton);
    statusData.appendChild(statusHeader);
    statusData.appendChild(status);
    row.appendChild(statusData);
    let roleData = document.createElement("div");
    let roleHeader = document.createElement("div");
    roleHeader.setAttribute("class", "table-header-cell");
    roleHeader.innerHTML = "Role";
    let role = document.createElement("div");
    role.innerHTML = user.role;
    role.setAttribute("id", "role");
    role.setAttribute("class", "table-cell");
    roleData.appendChild(roleHeader);
    roleData.appendChild(role);
    row.appendChild(roleData);
    let lastLoginData = document.createElement("div");
    let lastLoginHeader = document.createElement("div");
    lastLoginHeader.setAttribute("class", "table-header-cell");
    lastLoginHeader.innerHTML = "Last Login";
    let lastLogin = document.createElement("div");
    lastLogin.innerHTML = user.lastLogin;
    lastLogin.setAttribute("id", "last-login");
    lastLogin.setAttribute("class", "table-cell");
    lastLoginData.appendChild(lastLoginHeader);
    lastLoginData.appendChild(lastLogin);
    row.appendChild(lastLoginData);
    let permissionData = document.createElement("div");
    let permissionHeader = document.createElement("div");
    permissionHeader.setAttribute("class", "table-header-cell");
    permissionHeader.innerHTML = "Permission";
    let permission = document.createElement("div");
    permission.innerHTML = (user.permission) ? "Valid" : "Invalid";
    permission.setAttribute("id", "permission");
    permission.setAttribute("class", "table-cell");
    permissionData.appendChild(permissionHeader);
    permissionData.appendChild(permission);
    row.appendChild(permissionData);
    let optionsData = document.createElement("div");
    let optionsHeader = document.createElement("div");
    optionsHeader.setAttribute("class", "table-header-cell");
    optionsHeader.innerHTML = "More";
    let options = document.createElement("div");
    options.setAttribute("id", "more-option");
    options.setAttribute("class", "table-cell");
    let moreOptionsButton = document.createElement("button");
    moreOptionsButton.setAttribute("id", "more-options-button")
    moreOptionsButton.innerHTML = "...";
    options.appendChild(moreOptionsButton);
    optionsData.appendChild(optionsHeader);
    optionsData.appendChild(options);
    row.appendChild(optionsData);
    return row;
}

function changeUserStatus(event) {
    let userMail = event.target.parentElement.parentElement.parentElement.querySelector("#email").innerHTML;
    let user = usersList.filter(function(user) {
        if (user.email === userMail)
            return user;
    })[0];
    if (event.target.value - 0) {
        user.status = "Inactive";
        event.target.innerHTML = "Inactive";
        event.target.setAttribute("class", "status-inactive");
        event.target.value = 0;
    } else {
        user.status = "Active";
        event.target.innerHTML = "Active";
        event.target.setAttribute("class", "status-active");
        event.target.value = 1;
    }
}

function createTableHeader() {
    let header = document.createElement("div");
    header.setAttribute("id", "table-header");
    let row = document.createElement("div");
    row.setAttribute("class", "table-row");
    let name = document.createElement("div");
    name.innerHTML = "Name"
    name.setAttribute("class", "table-header-cell");
    let email = document.createElement("div");
    email.innerHTML = "Email";
    email.setAttribute("class", "table-header-cell");
    let status = document.createElement("div");
    status.innerHTML = "Status";
    status.setAttribute("class", "table-header-cell");
    let role = document.createElement("div");
    role.innerHTML = "Roll";
    role.setAttribute("class", "table-header-cell");
    let lastLogin = document.createElement("div");
    lastLogin.innerHTML = "Last Login";
    lastLogin.setAttribute("class", "table-header-cell");
    let permission = document.createElement("div");
    permission.innerHTML = "Permission";
    permission.setAttribute("class", "table-header-cell");
    let options = document.createElement("div");
    options.innerHTML = "Options";
    options.setAttribute("class", "table-header-cell");
    row.appendChild(name);
    row.appendChild(email);
    row.appendChild(status);
    row.appendChild(role);
    row.appendChild(lastLogin);
    row.appendChild(permission);
    row.appendChild(options);
    header.appendChild(row);
    return header;
}

function showSubMenu(event) {
    let target = (event.target === undefined) ? event : event.target;
    let hiddenLinks = target.parentElement.querySelector(".hidden-div");
    if (hiddenLinks.style.display == "block") {
        hiddenLinks.style.display = "none";
        target.parentElement.classList.remove("active-nav-link");
    } else {
        let activeButtons = target.parentElement.parentElement.querySelectorAll(".active-nav-link");
        activeButtons.forEach(function(button) {
            button.querySelector(".hidden-div").style.display = "none";
            button.classList.remove("active-nav-link");
        });
        hiddenLinks.style.display = "block";
        target.parentElement.setAttribute("class", "active-nav-link");
    }
}

function triggerParent(event) {
    event.stopPropagation();
    event.target.parentElement.onclick(event.target.parentElement);
}