const config = {
  mongodb: "dbmsNoSQL",
  mongodburi: "entermongouri",
  port: parseInt(process.env.PORT ?? "4000"),
  host: process.env.HOST as string,
  logger:
    process.env.ENV === "DEV"
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          },
        }
      : true,
  mysqlhost: "localhost",
  mysqldatabase: "dbms",
  mysqlusername: "root",
  mysqlpassword: "password",
};

export default config;
