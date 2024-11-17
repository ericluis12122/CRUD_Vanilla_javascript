import {getUsers, deleteUser, updateUser} from "./api.js";

let editUser = null;
const form = document.getElementById("form");
const userList = document.getElementById("user-list");
// render Users
const renderUsers = async () => {
    const users = await getUsers();
    users.forEach((user) => {
        const element = document.createElement("li");
        element.innerHTML = `
            <span>${user.name} (${user.email})</span>
            <button type="button" class="edit" data-id="${user.id}">Editar</button>
            <button type="button" class="delete" data-id="${user.id}">Eliminar</button>
        `;
        userList.appendChild(element);
    });
};
// Submit
const handleSubmit = async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await updateUser({name, email, id: editUser?.id});

    form.reset();
    renderUsers();
};
// Edit
const handleEdit = async (id, name, email) => {
    editUser = {id, name, email};
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
};
// Delete
const handleDelete = async (id) => {
    await deleteUser(id);
    renderUsers();
};

// Add events to html
form.addEventListener("submit", handleSubmit);
userList.addEventListener("click", (e) => {
    const target = e.target;
    const id = target.getAttribute("data-id");
    if(target.classList.contains("edit")) {
        const user = Array.from(target.parentNode.children)[0].innerText.split(" (");
        const name = user[0];
        const email = user[1].replace(")", "");
        handleEdit(id, name, email);
    }
    else if(target.classList.contains("delete"))
        handleDelete(id);
});

renderUsers();