import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('coffeeCleanup');

    let disposable = vscode.workspace.onWillSaveTextDocument((event) => {
        if (event.document.languageId === 'coffeescript') {
            const edits: vscode.TextEdit[] = [];
            const doc = event.document;

            // Get configuration values
            const removeSemicolons = config.get<boolean>('removeSemicolons', true);
            const removeTrailingWhitespace = config.get<boolean>('removeTrailingWhitespace', true);

            // Remove trailing whitespaces
            if (removeTrailingWhitespace) {
                for (let i = 0; i < doc.lineCount; i++) {
                    const line = doc.lineAt(i);
                    if (line.text.trimRight() !== line.text) {
                        const whitespaceRange = new vscode.Range(
                            line.range.end.translate(0, -line.text.length + line.text.trimRight().length),
                            line.range.end
                        );
                        edits.push(vscode.TextEdit.delete(whitespaceRange));
                    }
                }
            }

            // Remove semicolons
            if (removeSemicolons) {
                const fullText = doc.getText();
                const semicolonRegex = /;\s*$/gm;
                const matches = fullText.matchAll(semicolonRegex);

                for (const match of matches) {
                    if (match.index !== undefined) {
                        const position = doc.positionAt(match.index);
                        const range = new vscode.Range(position, position.translate(0, match[0].length));
                        edits.push(vscode.TextEdit.delete(range));
                    }
                }
            }

            const workspaceEdit = new vscode.WorkspaceEdit();
            workspaceEdit.set(doc.uri, edits);
            vscode.workspace.applyEdit(workspaceEdit);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
