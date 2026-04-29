# GHI Agent Pipeline Playground Site

Minimal website for testing coding agents on small frontend tasks.

## What is inside

- `index.html` - one-page task board UI
- `styles.css` - styling and light/dark theme
- `app.js` - localStorage task CRUD, filters, search, seed demo

## Run locally

No build needed. Open directly:

- Windows: double click `index.html`
- Or run a tiny server from this folder:

```powershell
python -m http.server 8080
```

Then open <http://localhost:8080>.

## Example tasks for agents

1. Add due date field and sorting.
2. Add drag and drop between statuses.
3. Add edit mode for existing task.
4. Add keyboard shortcuts and accessibility labels.
5. Add export/import JSON backup.

## Notes

This app stores data in browser `localStorage` only.
