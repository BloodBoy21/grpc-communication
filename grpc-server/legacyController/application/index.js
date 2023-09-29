const path = require("path");
const protoPath = path.join(__dirname, "..", "domain", "model.proto");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const methods = require("./senders");
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const service = grpc.loadPackageDefinition(packageDefinition).legacyController;

module.exports = {
  methods,
  service: service.Output.service,
};
