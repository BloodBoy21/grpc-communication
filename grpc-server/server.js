const grpc = require("@grpc/grpc-js");
const { grpc: legacyController } = require("./legacyController/infrastructure");

function main() {
  const PORT = process.env.PORT || 50051;
  const server = new grpc.Server();
  const services = [[legacyController.service, legacyController.methods]];
  services.forEach(([service, methods]) => {
    server.addService(service, methods);
  });
  const serverCredentials = grpc.ServerCredentials.createInsecure();
  server.bindAsync(`0.0.0.0:${PORT}`, serverCredentials, (error) => {
    if (error) throw error;
    console.log(`Server running at http://localhost:${PORT}`);
    server.start();
  });
}
main();
