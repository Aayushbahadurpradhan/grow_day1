  export function getAllUsers() {
    const data = sessionStorage.getItem("users");
    return data ? JSON.parse(data) : [];
  }
  export function saveUser(user) {
    const users = getAllUsers();
    users.push(user);
    sessionStorage.setItem("users", JSON.stringify(users));
  }
  export function getUserById(id) {
    const users = getAllUsers();
    return users.find(u => u.id === id);
  }
  