const mysql = require('promise-mysql');

const tcpConnection = async (config) => {
  const dbSocketAddress = process.env.DB_HOST.split(':');
  return await mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: dbSocketAddress[0],
    port: dbSocketAddress[1],

    ...config,
  });
};

const unixSocketConnection = async (config) => {
  const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

  return await mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,

    ...config,
  });
};

const createPool = async () => {
  const config = {
    connectionLimit: 10,
    connectionTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queue: 0,
  };

  if (process.env.DB_HOST) {
    return await tcpConnection(config);
  } else {
    return await unixSocketConnection(config);
  }
};

const ensureSchema = async (pool) => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS resources
    (resource_id SERIAL NOT NULL, 
     name VARCHAR(255) NOT NULL,
     PRIMARY KEY (resource_id))`
  );

  console.log('Table resources exists');
};


module.exports.createPool = createPool;
module.exports.ensureSchema = ensureSchema;