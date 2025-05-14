const fakeUsers = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'Diana' },
  { name: 'Eve' },
];
const createAuthSlice = (set, get) => ({
  user: null,
  login: () => {
    const currentUser = get().user;
    let newUser;
    do {
      newUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
    } while (currentUser && newUser.name === currentUser.name);
    set({ user: newUser });
  },
  logout: () => set({ user: null }),
});

export default createAuthSlice;
