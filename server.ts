import { Server } from "https://deno.land/std@0.148.0/http/server.ts";
import { GraphQLHTTP } from "./mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { resolvers } from "./resolvers.ts";
import { typeDefs } from "./typedefs.ts";

const schema = makeExecutableSchema({ resolvers, typeDefs });

const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);
    console.log(req);

    return pathname === "/graphql"
      ? await GraphQLHTTP<Request>({
          schema,
          graphiql: true,
        })(req)
      : new Response("Not here, <a href='/graphql'>there</a>", { status: 404 });
  },
  port: 3000,
});

server.listenAndServe();
