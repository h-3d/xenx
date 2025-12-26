import { defineCli, defineCommand, success } from "boune";
import { cpSync } from "fs";
import { $ } from "bun";
import path from "path";
import os from "os";

const templatesDirectory = path.join(os.homedir(), "xenx", "templates");

const file = Bun.file(path.join(templatesDirectory, "templates.json"));
const options = await file.json();

const init = defineCommand({
    name: "init",
    description: "Initialize a new project",
    arguments: {
        project: {
            type: "string",
            required: false,
            default: "."
        }
    },
    prompts: {
        template: {
            kind: "select",
            message: "Select a template",
            options: options.templates,
            default: options.default
        },
        git: {
            kind: "confirm",
            message: "Initialize a git repository",
            default: true
        }
    },
    async action({ args, prompts }) {
        const template = await prompts.template.run();
        cpSync(path.join(templatesDirectory, template), path.resolve(args.project), { recursive: true });

        const git = await prompts.git.run();
        if (git) {
            await $`git init`.cwd(path.resolve(args.project)).quiet();
            await Bun.write(path.join(path.resolve(args.project), ".gitignore"), ".DS_Store");
        }

        const displayName = path.basename(path.resolve(args.project));
        console.log(success(`Initialized ${displayName} using the ${template} template`));
    }
});

const serve = defineCommand({
    name: "serve",
    description: "Start a local http server",
    async action() {
        await $`bunx serve`;
    }
});

const cli = defineCli({
    name: "xenx",
    version: "1.0.0",
    commands: { init, serve },
});

cli.run();
