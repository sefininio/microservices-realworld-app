# data-access

This Library is responsible for generating React hooks specific to queries and mutations.

This is done using [GraphQL CodeGen](https://www.graphql-code-generator.com/).

* `realworld-example-app` generates the `schema.graphql`.
* `graphql` directory includes the graphql `fragments`, `queries` and `mutations` respected by the `realworld-example-app` gateway app and defined in the `schema`.
* The file `codegen.yml` defines how to take the above and generate the `autogenerate` folder contents.
