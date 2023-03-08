import yargs from "yargs";

const args = yargs(process.argv.slice(2))
    .alias({
        p: 'port',
        m : 'mode'
    })
    .default({
        mode : 'FORK',
        port : 8080,
    }).argv;

export default args;