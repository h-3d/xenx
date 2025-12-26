# xenx

A basic project scaffolder made using [Bun](https://bun.sh) and [boune](https://boune.dev/).

## Features

- Initialize projects from customizable templates
- Interactive template selection with configurable defaults
- Built-in local http server using the [serve npm package](https://www.npmjs.com/package/serve)
- Optional git initialization
- Template management through a simple JSON configuration
- Lightning-fast execution powered by [Bun](https://bun.sh)

## Prerequisites

- [Bun](https://bun.sh)
- [Git](https://git-scm.com/)

## Installation

The instructions below are for unix based systems (Linux, macOS, BSD) but can be adapted for other operating systems.

Navigate to the home directory

```bash
cd ~
```

Clone the git repository

```bash
git clone https://github.com/h-3d/xenx.git
```

Navigate to the cloned directory

```bash
cd xenx
```

Install dependencies

```bash
bun install
```

Add the xenx alias to your shell configuration file (`~/.bashrc`, `~/.zshrc`, etc)

```bash
echo "alias xenx='bun run ~/xenx/index.js'" >> ~/.bashrc # For Bash
```

```zsh
echo "alias xenx='bun run ~/xenx/index.js'" >> ~/.zshrc # For Zsh
```

Source your shell configuration file to apply the changes

```bash
source ~/.bashrc # For Bash
```

```zsh
source ~/.zshrc # For Zsh
```

## Quick Start

Initialize a new project

```bash
xenx init my-project
```

Navigate to the project directory

```bash
cd my-project
```

Start the http server

```bash
xenx serve
```

## Template Configuration

By default, templates are stored in `~/xenx/templates/`. Each template has its own subdirectory, for example:

```
templates
├── picocss
├── tailwind
├── vanilla
└── templates.json
```

You can customize the location of the templates folder by modifying the `templatesDirectory` variable in `index.js`:

```js
const templatesDirectory = path.join(os.homedir(), "xenx", "templates");
```

The `templates.json` file controls which templates appear in the interactive prompt and which one is selected by default. This file is located in the templates directory and has two main fields:

- `templates`: An array of template objects that define what appears in the prompt.
- `default`: The directory name of the template that is selected by default.

Each template object has two main fields:

- `label`: The text that appears in the interactive prompt.
- `value`: The directory name of the template.

```json
{
  "templates": [
    {
      "label": "Vanilla",
      "value": "vanilla"
    },
    {
      "label": "Tailwind CSS",
      "value": "tailwind"
    },
    {
      "label": "Pico CSS",
      "value": "picocss"
    }
  ],
  "default": "vanilla"
}
```
