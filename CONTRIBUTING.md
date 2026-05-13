# Руководство по разработке

## Перед коммитом

Всегда запускай:

```bash
npm run lint:fix && npm run lint && npm run build
```

Это:
1. Исправит автоматические ошибки (форматирование, пробелы).
2. Выведет оставшиеся проблемы, которые нужно исправить вручную.
3. Убедится, что проект собирается.

## Типовые сценарии

### Я добавил новый компонент

```bash
# Создай файл src/components/MyComponent.jsx
# Затем проверь:
npm run lint:fix
npm run lint
```

Исправь вручную оставшиеся ошибки (например, неиспользуемые импорты).

### Я вижу ошибку линтера

1. Прочитай сообщение:
   ```
   src/App.jsx
     10:5  error  Missing dependency in dependency array of useEffect  react-hooks/exhaustive-deps
   ```

2. **Автоматическое исправление:** Запусти `npm run lint:fix`.

3. **Ручное исправление:** Если `lint:fix` не помогла, отредактируй код вручную:
   - Добавь пропущенное значение в dependency array.
   - Удали неиспользуемые переменные.
   - Добавь точки с запятой (если требует конфиг).

### Сборка падает, а линтер зелёный

Это ошибка Vite, не ESLint:
- Неверный импорт файла (он удалён или путь неправильный).
- Синтаксическая ошибка в коде (например, `const foo = {` без закрытия).
- Циклический импорт.

Проверь вывод `npm run build` и исправь файл.

## Интеграция с CI/CD

В пайплайне добавь шаг:

```yaml
- name: Lint and Build
  run: npm run lint && npm run build
```

Если нужно автоисправление в PR, используй отдельный шаг:

```yaml
- name: Auto-fix and push
  if: always()
  run: |
    npm run lint:fix
    git diff --exit-code || (git add -A && git commit -m "chore: lint:fix" && git push)
```

## Отключение правил (осторожно!)

Только в исключительных случаях:

```javascript
// eslint-disable-next-line no-console
console.log('Debug info');
```

Или для целого файла (в начале):

```javascript
/* eslint-disable no-unused-vars */
```

Всегда добавляй комментарий с объяснением, почему нужно отключить правило.

## IDE Setup

### VS Code

Установи расширение [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

В `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": false
}
```

Так ошибки будут автоисправляться при сохранении.

### WebStorm / PhpStorm / IntelliJ IDEA

- Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint.
- Включи «Run ESLint --fix on Save».
