import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";

const connect = async () => {
  // Get the connection string from the environment variable "DATABASE_URL"

  const databaseUrl = Deno.env.get("DATABASE_URL")!;

  // Create a database pool with three connections that are lazily established
  const pool = new postgres.Pool(databaseUrl, 3, true);

  // Connect to the database
  const connection = await pool.connect();
  return connection;
};

const allDinosaurs = async () => {
  const connection = await connect();
  const result = await connection.queryObject`
          SELECT name, description FROM dinosaurs
        `;
  console.log(result.rows);
  return result.rows;
};

const oneDinosaur = async (args: any) => {
  const connection = await connect();
  console.log(args.name);
  const result = await connection.queryObject`
          SELECT name, description FROM dinosaurs WHERE name = ${args.name}
        `;
  console.log(result.rows);
  return result.rows;
};

const addDinosaur = async (args: any) => {
  const connection = await connect();
  const result = await connection.queryObject`
            INSERT INTO dinosaurs(name, description) VALUES(${args.name}, ${args.description}) RETURNING name, description
        `;
  console.log(result.rows);
  return result.rows[0];
};

export const resolvers = {
  Query: {
    hello: () => `Hello World!`,
    allDinosaurs: () => allDinosaurs(),
    oneDinosaur: (_: any, args: any) => oneDinosaur(args),
  },
  Mutation: {
    addDinosaur: (_: any, args: any) => addDinosaur(args),
  },
};
