async function getUsers({ sort }) {
  const users = [
    { name: "John", age: 21 },
    { name: "Jane", age: 22 },
  ];
  let data = [];
  if (sort === "desc") data = users.sort((a, b) => b.age - a.age);
  else data = users.sort((a, b) => a.age - b.age);
  return {
    parse: true,
    data: JSON.stringify(data),
  };
}
module.exports = {
  getUsers,
};
