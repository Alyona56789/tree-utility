class TreeFormatter {
  constructor({ showFiles = false } = {}) {
    this.showFiles = showFiles;
  }

  formatEntry(item, prefix, isLast) {
    // Выбираем соединитель: уголок для последнего, тройник для остальных
    const connector = isLast ? '└── ' : '├── ';
    
    let line = prefix + connector + item.name;

    if (!item.isDirectory && this.showFiles) {
      const sizeLabel = item.isEmpty ? 'empty' : `${item.size}b`;
      line += ` (${sizeLabel})`;
    }

    return line;
  }

  getChildPrefix(prefix, isLast) {
    // Если родитель был последним — под ним больше ничего не будет, добавляем 4 пробела
    // Если родитель был не последним — под ним будут ещё элементы, добавляем вертикальную черту
    return prefix + (isLast ? '    ' : '│   ');
  }
}

module.exports = TreeFormatter;