const Tree = require('./src/Tree');
const TreeFormatter = require('./src/TreeFormatter');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Использование: node cli.js <путь_к_каталогу> [-f]');
  console.error('  <путь_к_каталогу> - путь к директории');
  console.error('  -f               - показывать файлы (по умолчанию только папки)');
  process.exit(1);
}

const targetPath = args[0];
const showFiles = args.includes('-f');

try {
  const formatter = new TreeFormatter({ showFiles });
  
  const tree = new Tree({ formatter });
  
  const result = tree.build(targetPath);
  process.stdout.write(result);
} catch (err) {
  console.error(`Ошибка: ${err.message}`);
  process.exit(1);
}