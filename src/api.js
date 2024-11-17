const API_URL = "https://jsonplaceholder.typicode.com/users";

// getUsers
export const getUsers = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};
// deleteUser
export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method:"DELETE"
    });
    return response.json();
};
// editUser | addUser
export const updateUser = async (user) => {
    const url = user.id ? `${API_URL}/${id}` : API_URL;
    const _method = user.id ? "PUT" : "POST";
    const response = await fetch(url, {
        method: _method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    return await response.json();
};