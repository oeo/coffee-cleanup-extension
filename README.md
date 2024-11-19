# CoffeeScript Cleanup

Also known as "Adam's Little Helper".

A VSCode extension that automatically cleans up CoffeeScript files on save.

## Features

- Remove trailing semicolons
- Remove trailing whitespace
- Configurable cleanup options

## Configuration

You can configure the extension in your VSCode settings:

```json
{
    "coffeeCleanup.removeSemicolons": true,
    "coffeeCleanup.removeTrailingWhitespace": true
}
```

## Development

Build

```bash
npm run compile
npm run package
```

Install

```bash
code --install-extension coffee-cleanup-1.0.0.vsix
```

Publish

```bash
npm install -g @vscode/vsce
vsce create-publisher <your-publisher-name>
vsce publish
```
