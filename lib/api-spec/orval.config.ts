import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./openapi.yaml",
    output: {
      mode: "single",
      workspace: "..",
      target: "api-client-react/src/generated/api.ts",
      client: "react-query",
      override: {
        query: {
          useQuery: true,
          useMutation: true,
        },
        mutator: {
          path: "api-client-react/src/mutator/custom-instance.ts",
          name: "customInstance",
        },
      },
      prettier: true,
    },
  },
  apiZod: {
    input: "./openapi.yaml",
    output: {
      mode: "single",
      workspace: "..",
      target: "api-zod/src/generated/api.ts",
      client: "zod",
      override: {
        zod: {
          generate: {
            param: true,
            body: true,
            response: true,
            header: false,
            query: true,
          },
        },
      },
      prettier: true,
    },
  },
});
