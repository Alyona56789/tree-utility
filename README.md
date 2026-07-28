# Tree Utility

Консольная утилита на Node.js, выводит дерево каталогов (аналог `tree` из Linux).
Сделано как тестовое задание.

## Что умеет

- Рекурсивно обходит папку и рисует её структуру в терминале
- Работает с любым путём — можно передать любую папку на диске
- Показывает только директории по умолчанию
- С флагом `-f` добавляет файлы с указанием размера
- Сортирует содержимое по алфавиту (без учёта регистра)
- Корректно обрабатывает пустые файлы и ошибки (несуществующий путь, файл вместо папки)

## Как запустить

git clone https://github.com/Alyona56789/tree-utility.git
cd tree-utility
npm install


Путь может быть любым. Несколько примеров:

# папка с тестовыми данными
node cli.js ./tests/fixtures/data

# папка с тестами целиком (покажет fixtures/data внутри)
node cli.js ./tests

# корень проекта
node cli.js .


# с флагом -f — показать файлы с размером
node cli.js ./tests/fixtures/data -f

## Как устроено

Разделила код на три класса, чтобы не делать всё в одном файле:

- `FileSystemReader` — ходит по файловой системе, собирает информацию об элементах и сортирует
- `TreeFormatter` — превращает данные в строки с символами `├──`, `└──`, `│`
- `Tree` — склеивает их вместе через композицию



## Структура

tree-utility/
├── cli.js                
├── src/
│   ├── FileSystemReader.js
│   ├── TreeFormatter.js
│   └── Tree.js
├── tests/
│   ├── FileSystemReader.test.js
│   ├── TreeFormatter.test.js
│   ├── Tree.test.js
│   └── fixtures/         
└── package.json

## Тесты

npm test

Использую Jest, других зависимостей в проекте нет. Тестов 17 штук: unit-тесты на каждый компонент + интеграционные на всю систему. Для тестов лежит готовая файловая структура в `tests/fixtures/data/`.

## Примеры вывода

Без `-f` (только папки):

data
├── dist
│   ├── css
│   ├── html
│   └── js
└── my-test-folder
    └── vue


С `-f` (папки и файлы):
data
├── dist
│   ├── css
│   │   └── app.css (13b)
│   ├── html
│   │   └── index.html (15b)
│   └── js
│       └── app.js (13b)
├── empty.txt (empty)
└── my-test-folder
    ├── vue
    │   └── main.js (20b)
    └── zzz.txt (21b)


Если запустить на корне проекта (`node cli.js .`), вывод будет таким:

tree-utility
├── src
│   ├── FileSystemReader.js
│   ├── Tree.js
│   └── TreeFormatter.js
└── tests
    ├── FileSystemReader.test.js
    ├── Tree.test.js
    ├── TreeFormatter.test.js
    └── fixtures
