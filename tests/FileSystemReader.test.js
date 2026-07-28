const path = require('path');
const FileSystemReader = require('../src/FileSystemReader');

const FIXTURES = path.join(__dirname, 'fixtures');

describe('FileSystemReader', () => {
  let reader;

  // Создаём экземпляр перед каждым тестом
  beforeEach(() => {
    reader = new FileSystemReader();
  });

  // ТЕСТ 1: Проверка, что метод читает папку и сортирует результаты по алфавиту
  test('читает содержимое директории и сортирует по алфавиту', () => {
    const items = reader.readDirectory(path.join(FIXTURES, 'data'));
    const names = items.map((item) => item.name);
    
    expect(names).toEqual(['dist', 'empty.txt', 'my-test-folder']);
  });

  // ТЕСТ 2: проверка, что метод правильно различает папки и файлы
  test('корректно определяет, является ли элемент папкой', () => {
    const items = reader.readDirectory(path.join(FIXTURES, 'data'));
    
    const dist = items.find((item) => item.name === 'dist');
    const emptyTxt = items.find((item) => item.name === 'empty.txt');

    expect(dist.isDirectory).toBe(true);
    expect(emptyTxt.isDirectory).toBe(false);
  });

  // ТЕСТ 3: Проверка, что метод находит пустые файлы и определяет их размер
  test('корректно определяет пустые файлы', () => {
    const items = reader.readDirectory(path.join(FIXTURES, 'data'));
    const emptyTxt = items.find((item) => item.name === 'empty.txt');

    expect(emptyTxt.isEmpty).toBe(true);
    expect(emptyTxt.size).toBe(0);
  });

  // ТЕСТ 4: Проверка защиты: ошибка при несуществующем пути
  test('бросает ошибку, если путь не существует', () => {
    const invalidPath = '/this/path/does/not/exist';
    expect(() => reader.readDirectory(invalidPath)).toThrow(`Пути не существует: ${invalidPath}`);
  });

  // ТЕСТ 5: Проверка защиты: ошибка при передаче файла вместо папки
  test('бросает ошибку, если передан путь к файлу, а не к папке', () => {
    const filePath = path.join(FIXTURES, 'data', 'empty.txt');
    expect(() => reader.readDirectory(filePath)).toThrow(`Путь не является папкой: ${filePath}`);
  });
});