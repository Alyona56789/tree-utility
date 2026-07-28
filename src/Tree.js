const FileSystemReader = require('./FileSystemReader');
const TreeFormatter = require('./TreeFormatter');
const path = require('path');

class Tree {
  constructor({
    reader = new FileSystemReader(),
    formatter = new TreeFormatter(),
  } = {}) {
    this.reader = reader;
    this.formatter = formatter;
  }

  build(rootPath) {
    const rootName = rootPath.replace(/[/\\]$/, '').split(/[/\\]/).pop() || rootPath;
    let output = rootName + '\n';
    output += this._buildSubtree(rootPath, '');
    return output;
  }

  _buildSubtree(dirPath, prefix) {
    let output = '';
    
    const items = this.reader.readDirectory(dirPath);

    const visibleItems = this.formatter.showFiles
      ? items
      : items.filter((item) => item.isDirectory);

    visibleItems.forEach((item, index) => {
      const isLast = index === visibleItems.length - 1;
      
      output += this.formatter.formatEntry(item, prefix, isLast) + '\n';

      if (item.isDirectory) {
        const childPrefix = this.formatter.getChildPrefix(prefix, isLast);
        output += this._buildSubtree(path.join(dirPath, item.name), childPrefix);
      }
    });

    return output;
  }
}

module.exports = Tree;