const TreeFormatter = require('../src/TreeFormatter');

describe('TreeFormatter', () => {
  // ТЕСТ 1: Проверка, что последний элемент использует символ └──
  test('последний элемент использует └──', () => {
    const formatter = new TreeFormatter();
    const item = { name: 'folder', isDirectory: true };
    const line = formatter.formatEntry(item, '', true);
    expect(line).toBe('└── folder');
  });

  // ТЕСТ 2: Проверка, что не последний элемент использует символ ├──
  test('не последний элемент использует ├──', () => {
    const formatter = new TreeFormatter();
    const item = { name: 'folder', isDirectory: true };
    const line = formatter.formatEntry(item, '', false);
    expect(line).toBe('├── folder');
  });

  // ТЕСТ 3: Проверка, что при showFiles=true добавляется размер файла
  test('добавляет размер файла при showFiles=true', () => {
    const formatter = new TreeFormatter({ showFiles: true });
    const item = { name: 'file.js', isDirectory: false, size: 42, isEmpty: false };
    const line = formatter.formatEntry(item, '', true);
    expect(line).toBe('└── file.js (42b)');
  });

  // ТЕСТ 4: Проверка, что пустые файлы помечаются как "empty"
  test('пустой файл помечается как empty', () => {
    const formatter = new TreeFormatter({ showFiles: true });
    const item = { name: 'empty.txt', isDirectory: false, size: 0, isEmpty: true };
    const line = formatter.formatEntry(item, '', true);
    expect(line).toBe('└── empty.txt (empty)');
  });

  // ТЕСТ 5: Проверка, что при showFiles=false размер не добавляется
  test('не добавляет размер файла при showFiles=false', () => {
    const formatter = new TreeFormatter({ showFiles: false });
    const item = { name: 'file.js', isDirectory: false, size: 42, isEmpty: false };
    const line = formatter.formatEntry(item, '', true);
    expect(line).toBe('└── file.js');
  });

  // ТЕСТ 6: Проверка, что для папок размер никогда не добавляется
  test('для папок размер не добавляется даже при showFiles=true', () => {
    const formatter = new TreeFormatter({ showFiles: true });
    const item = { name: 'folder', isDirectory: true };
    const line = formatter.formatEntry(item, '', true);
    expect(line).toBe('└── folder');
  });

  // ТЕСТ 7: Проверяем префиксы для вложенных элементов
  test('getChildPrefix добавляет │ для не последнего родителя', () => {
    const formatter = new TreeFormatter();
    expect(formatter.getChildPrefix('', false)).toBe('│   ');
  });

  // ТЕСТ 8: Проверяем префиксы для последнего элемента
  test('getChildPrefix добавляет пробелы для последнего родителя', () => {
    const formatter = new TreeFormatter();
    expect(formatter.getChildPrefix('', true)).toBe('    ');
  });

  // ТЕСТ 9: Проверяем, что префиксы накапливаются
  test('префиксы накапливаются при вложенности', () => {
    const formatter = new TreeFormatter();
    const level1 = formatter.getChildPrefix('', false); // "│   "
    const level2 = formatter.getChildPrefix(level1, false); // "│   │   "
    expect(level2).toBe('│   │   ');
  });
});