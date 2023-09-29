const { getGrpcClient } = require("../helpers");
const CLIENT_NAME = "legacyController";
const path = require("path");
const protoPath = path.join(
  __dirname,
  "..",
  "protos",
  "legacyController.proto"
);
const client = getGrpcClient(protoPath, CLIENT_NAME);

/* const getUsers = async (sort) => {
const users = [
  { name: "John", age: 21 },
  { name: "Jane", age: 22 },
];
if (sort === "desc")
  return Promise.resolve(users.sort((a, b) => b.age - a.age));

return Promise.resolve(users.sort((a, b) => a.age - b.age));
}; */

const transformMethodParams = {
  getUsers: ["sort"],
};

const passArgsToObj = (args, method) => {
  const params = transformMethodParams[method];
  const context = {};
  if (!params) return context;
  params.forEach((param, index) => {
    context[param] = args[index];
  });
  return context;
};

async function transformCall(...args) {
  const { functionName } = this;
  const context = passArgsToObj(args, functionName);
  return new Promise((resolve, reject) => {
    client[functionName](context, {}, (err, response) => {
      if (err) return reject(err);
      if (response?.parse) return resolve(JSON.parse(response?.data));
      resolve(response.data);
    });
  });
}

const outputMethod = (method) => transformCall.bind({ functionName: method });

module.exports = {
  getUsers: outputMethod("getUsers"),
};
