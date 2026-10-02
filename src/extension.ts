import * as vscode from 'vscode';

import {toCyrillic, toLatin} from './transliterators';

export function activate(context: vscode.ExtensionContext) {
    const cyrillicCmd = vscode.commands.registerCommand('serbian.toCyrillic', () => transformText(toCyrillic));

    const latinCmd = vscode.commands.registerCommand('serbian.toLatin', () => transformText(toLatin));

    context.subscriptions.push(cyrillicCmd, latinCmd);
}

function transformText(transformFn: (text: string) => string) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const document = editor.document;
    const selections = editor.selections;
    const text = document.getText();

    return editor.edit((editBuilder) => {
        if (selections.every((selection) => selection.isEmpty)) {
            const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
            editBuilder.replace(fullRange, transformFn(text));
            return;
        }

        for (const selection of selections) {
            if (!selection.isEmpty) {
                editBuilder.replace(selection, transformFn(document.getText(selection)));
            }
        }
    });
}
