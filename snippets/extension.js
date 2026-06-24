const vscode = require('vscode');

function activate(context) {

    const provideEdits = (document, range) => {
        const edits = [];
        const indentSize = 4;
        let indentLevel = 0;

        for (let i = 0; i < range.start.line; i++) {
            const lineText = document.lineAt(i).text.trim();

            if (/^\s*\b(if|for|repeat|forever|while|func.func_start)\b/.test(lineText)) {
                indentLevel++;
            }
            if (/^\s*\b(endif|endfor|endrepeat|endforever|endwhile|func.func_end)\b/.test(lineText)) {
                indentLevel = Math.max(indentLevel - 1, 0);
            }
        }

        for (let i = range.start.line; i <= range.end.line; i++) {
            const line = document.lineAt(i);
            const trimmed = line.text.trim();

            if (trimmed.length === 0) {
                continue;
            }

            if (/^\s*\b(endif|endfor|endrepeat|endforever|endwhile|func.func_end)\b/.test(trimmed)) {
                indentLevel = Math.max(indentLevel - 1, 0);
            }

            const newText = ' '.repeat(indentLevel * indentSize) + trimmed;

            if (line.text !== newText) {
                edits.push(vscode.TextEdit.replace(line.range, newText));
            }

            if (/^\s*\b(if|for|repeat|forever|while|func.func_start)\b/.test(trimmed)) {
                indentLevel++;
            }
        }

        return edits;
    };

    const docFormatter = vscode.languages.registerDocumentFormattingEditProvider('glue3d', {
        provideDocumentFormattingEdits(document) {
            const lastLine = document.lineAt(document.lineCount - 1);
            const fullRange = new vscode.Range(new vscode.Position(0, 0), lastLine.range.end);
            return provideEdits(document, fullRange);
        }
    });

    const rangeFormatter = vscode.languages.registerDocumentRangeFormattingEditProvider('glue3d', {
        provideDocumentRangeFormattingEdits(document, range) {
            const fullLineRange = new vscode.Range(range.start.line, 0, range.end.line, 10000);
            return provideEdits(document, fullLineRange);
        }
    });

    context.subscriptions.push(docFormatter, rangeFormatter);
}

function deactivate() { }

function extendMarkdownIt(md) {
    md.options.highlight = (code, lang) => {
        if (lang && (lang.toLowerCase() === 'glue3d')) {
            return `<pre class="hljs"><code>${code}</code></pre>`;
        }
        return '';
    };
    return md;
}

module.exports = {
    activate,
    deactivate,
    extendMarkdownIt
};
