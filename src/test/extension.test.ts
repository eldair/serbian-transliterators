import * as assert from 'node:assert';
import * as vscode from 'vscode';

import {toCyrillic, toLatin} from '../transliterators';

suite('Serbian transliteration extension', () => {
    suiteSetup(async () => {
        const extension = vscode.extensions.all.find((candidate) => {
            const packageJSON: unknown = candidate.packageJSON;
            return (
                typeof packageJSON === 'object' &&
                packageJSON !== null &&
                'name' in packageJSON &&
                packageJSON.name === 'serbian-transliterators'
            );
        });

        assert.ok(extension, 'The Serbian transliteration extension should be available');
        await extension.activate();
    });

    test('transliterates the Serbian Latin alphabet, including digraphs', () => {
        const latin = [
            'A a B b V v G g D d Đ đ E e Ž ž Z z I i J j K k',
            'L l LJ Lj lj M m N n NJ Nj nj O o P p R r S s T t',
            'Ć ć U u F f H h C c Č č Š š DŽ Dž dž',
        ].join(' ');
        const cyrillic = [
            'А а Б б В в Г г Д д Ђ ђ Е е Ж ж З з И и Ј ј К к',
            'Л л Љ Љ љ М м Н н Њ Њ њ О о П п Р р С с Т т',
            'Ћ ћ У у Ф ф Х х Ц ц Ч ч Ш ш Џ Џ џ',
        ].join(' ');
        const canonicalLatin = latin.replaceAll('LJ', 'Lj').replaceAll('NJ', 'Nj').replaceAll('DŽ', 'Dž');

        assert.strictEqual(toCyrillic(latin), cyrillic);
        assert.strictEqual(toLatin(cyrillic), canonicalLatin);
    });

    test('preserves punctuation and text outside the Serbian alphabet', () => {
        const text = 'Zdravo, @#! 123 🙂\nСачувај нови ред';
        const converted = 'Здраво, @#! 123 🙂\nСачувај нови ред';

        assert.strictEqual(toCyrillic(text), converted);
        assert.strictEqual(toLatin(converted), 'Zdravo, @#! 123 🙂\nSačuvaj novi red');
    });

    test('converts the entire active document with the Cyrillic command', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content: 'Zdravo, svete!',
        });
        const editor = await vscode.window.showTextDocument(document);
        editor.selection = new vscode.Selection(0, 0, 0, 0);

        await vscode.commands.executeCommand('serbian.toCyrillic');

        assert.strictEqual(document.getText(), 'Здраво, свете!');
    });

    test('converts the document once when the editor has multiple cursors', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content: 'Zdravo, svete!',
        });
        const editor = await vscode.window.showTextDocument(document);
        editor.selections = [
            new vscode.Selection(0, 0, 0, 0),
            new vscode.Selection(0, document.lineAt(0).text.length, 0, document.lineAt(0).text.length),
        ];

        await vscode.commands.executeCommand('serbian.toCyrillic');

        assert.strictEqual(document.getText(), 'Здраво, свете!');
    });

    test('converts only the selection with the Latin command', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'plaintext',
            content: 'Пиши ћирилицом',
        });
        const editor = await vscode.window.showTextDocument(document);
        editor.selection = new vscode.Selection(0, 5, 0, document.lineAt(0).text.length);

        await vscode.commands.executeCommand('serbian.toLatin');

        assert.strictEqual(document.getText(), 'Пиши ćirilicom');
    });
});
