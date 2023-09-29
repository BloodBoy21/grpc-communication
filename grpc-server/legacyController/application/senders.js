const methods = require("./methods");

// Function to be used as grpc method pass first to main function and then return data to callback response
async function functionParser({ request }, callback) {
  const { mainFunction } = this;
  mainFunction(request).then((data) => callback(null, data));
}

// Create object with all functions from methods and bind them to functionParser to be used as grpc methods
const senders = Object.entries(methods).reduce(
  (acc, [functionName, functionVal]) => {
    acc[functionName] = functionParser.bind({
      mainFunction: functionVal,
    });
    return acc;
  },
  {}
);

module.exports = { ...senders };
