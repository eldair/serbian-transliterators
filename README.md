# Serbian Transliterator

Convert Serbian text between Cyrillic and Latin in Visual Studio Code.

## Features

- Converts the full document when the editor has one or more cursors and no selection.
- Converts only the selected text when a non-empty selection is active.
- Preserves punctuation, whitespace, and characters outside the Serbian alphabet.
- Handles Serbian Latin digraphs (`Lj`, `Nj`, and `Dž`) as single Cyrillic letters.

## Usage

Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and choose:

- **Serbian: Convert to Cyrillic (Ćirilica)**
- **Serbian: Convert to Latin (Latinica)**

You can also access both commands from the editor context menu.

## Development

Install dependencies with `pnpm install`, then run `pnpm test` to compile and run the VS Code integration tests.

## Requirements

Visual Studio Code 1.140.0 or later.

## About this extension

This extension was written by AI and reviewed by a human.

## License

[MIT](LICENSE)
