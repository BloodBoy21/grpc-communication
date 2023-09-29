const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const LOCAL_HOST = "localhost:50051";

const loadProto = (protoPath) =>
  protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

const getGrpcClient = (protoPath, serviceName, host = LOCAL_HOST) => {
  const packageDefinition = loadProto(protoPath);
  const service = grpc.loadPackageDefinition(packageDefinition)[serviceName];
  const client = new service.Output(host, grpc.credentials.createInsecure());
  return client;
};

module.exports = getGrpcClient;
