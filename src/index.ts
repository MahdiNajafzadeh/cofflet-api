// import process from "node:process"
import { execSync as exec } from "node:child_process"

console.log(
    exec(
        `./xray -config=config.json -format=json > log.log`,
        { cwd: `${process.cwd()}/src/bin` }
    )
);
