module.exports = {
    client: {
        includes: ["./src/**/*.tsx"],
        tagname: "gql",
        service: {
            name: "uber-eats-backend",
            url: "http://localhost:4000/graphql"
        }
    }
};