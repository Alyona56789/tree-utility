const fs = require('fs');
const path = require('path');

class FileSystemReader {
  readDirectory(dirPath) {
    // Проверка на существование пути
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Пути не существует: ${dirPath}`);
    }
    
    // Проверка, что это именно папка, а не файл
    const stat = fs.statSync(dirPath);
    if (!stat.isDirectory()) {
      throw new Error(`Путь не является папкой: ${dirPath}`);
    }

    // Чтение содержимого папки
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    // Превращаем данные в удобный формат
    const items = entries.map((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      const entryStat = fs.statSync(fullPath);
      return {
        name: entry.name,
        isDirectory: entry.isDirectory(),
        size: entryStat.size,
        isEmpty: entry.isDirectory() ? false : entryStat.size === 0,
      };
    });

    // Сортировка по алфавиту без учёта регистра
    items.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

    return items;
  }
}

module.exports = FileSystemReader;