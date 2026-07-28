const path = require('path');
const Tree = require('../src/Tree');
const TreeFormatter = require('../src/TreeFormatter');

const FIXTURES = path.join(__dirname, 'fixtures');

describe('Tree (интеграционные тесты)', () => {

  // ТЕСТ 1: Проверяем вывод БЕЗ флага -f (только папки)
  test('вывод без -f (только папки)', () => {
    const formatter = new TreeFormatter({ showFiles: false });
    const tree = new Tree({ formatter });
    const result = tree.build(path.join(FIXTURES, 'data'));

    const expected = [
      'data',
      '├── dist',
      '│   ├── css',
      '│   ├── html',
      '│   └── js',
      '└── my-test-folder',
      '    └── vue',
    ].join('\n');

    expect(result.trim()).toBe(expected);
  });

  // ТЕСТ 2: Проверка вывода с флагом -f (папки и файлы)
  test('вывод с -f (файлы и папки)', () => {
    const formatter = new TreeFormatter({ showFiles: true });
    const tree = new Tree({ formatter });
    const result = tree.build(path.join(FIXTURES, 'data'));

    expect(result).toContain('├── dist');
    expect(result).toContain('│   └── js');
    expect(result).toContain('app.css (13b)');
    expect(result).toContain('index.html (15b)');
    expect(result).toContain('app.js (13b)');
    expect(result).toContain('empty.txt (empty)');
    expect(result).toContain('└── my-test-folder');
    expect(result).toContain('main.js (20b)');
    expect(result).toContain('zzz.txt (21b)');
  });

  // ТЕСТ 3: Проверка, что работает с пустой папкой
  test('работает с пустой папкой', () => {
    const fs = require('fs');
    const emptyDir = path.join(FIXTURES, 'empty-test-dir');
    
    if (!fs.existsSync(emptyDir)) {
      fs.mkdirSync(emptyDir);
    }

    const tree = new Tree();
    const result = tree.build(emptyDir);

    expect(result.trim()).toBe('empty-test-dir');

    fs.rmdirSync(emptyDir);
  });
});