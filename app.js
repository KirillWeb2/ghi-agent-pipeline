const STORAGE_KEY = "agent-playground-tasks";
const THEME_KEY = "agent-playground-theme";

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const statusFilters = document.getElementById("statusFilters");
const searchInput = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");
const seedBtn = document.getElementById("seedBtn");
const helpBtn = document.getElementById("helpBtn");
const helpDialog = document.getElementById("helpDialog");
const helpCloseBtn = document.getElementById("helpCloseBtn");

let tasks = loadTasks();
let activeStatus = "all";
let searchQuery = "";

initTheme();
render();

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark") {
    document.body.classList.add("dark");
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(THEME_KEY, document.body.classList.contains("dark") ? "dark" : "light");
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priority = String(formData.get("priority") || "medium");

  if (!title || !description) {
    return;
  }

  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    description,
    priority,
    status: "todo",
    createdAt: Date.now(),
  });

  saveTasks();
  taskForm.reset();
  render();
});

statusFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-status]");
  if (!button) {
    return;
  }

  activeStatus = button.dataset.status;
  for (const el of statusFilters.querySelectorAll("button")) {
    el.classList.toggle("active", el === button);
  }
  render();
});

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  render();
});

function setHelpExpanded(isOpen) {
  helpBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function openHelp() {
  helpDialog.showModal();
  setHelpExpanded(true);
}

function closeHelp() {
  helpDialog.close();
}

helpBtn.addEventListener("click", () => {
  openHelp();
});

helpCloseBtn.addEventListener("click", () => {
  closeHelp();
});

helpDialog.addEventListener("close", () => {
  setHelpExpanded(false);
});

helpDialog.addEventListener("click", (event) => {
  if (event.target === helpDialog) {
    closeHelp();
  }
});

seedBtn.addEventListener("click", () => {
  if (tasks.length > 0) {
    return;
  }

  tasks = [
    {
      id: crypto.randomUUID(),
      title: "Improve empty state message",
      description: "Show helpful CTA when there are no filtered tasks.",
      priority: "low",
      status: "todo",
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "Add keyboard shortcut for task submit",
      description: "Press Ctrl+Enter in description to submit form.",
      priority: "medium",
      status: "in_progress",
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      title: "Add due date support",
      description: "Support due date field and sorting by nearest date.",
      priority: "high",
      status: "done",
      createdAt: Date.now(),
    },
  ];

  saveTasks();
  render();
});

taskList.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button[data-action]");
  if (!actionButton) {
    return;
  }

  const item = actionButton.closest("li[data-id]");
  if (!item) {
    return;
  }

  const id = item.dataset.id;
  const task = tasks.find((entry) => entry.id === id);
  if (!task) {
    return;
  }

  const action = actionButton.dataset.action;
  if (action === "cycle") {
    task.status = nextStatus(task.status);
  }

  if (action === "delete") {
    tasks = tasks.filter((entry) => entry.id !== id);
  }

  saveTasks();
  render();
});

function nextStatus(status) {
  if (status === "todo") return "in_progress";
  if (status === "in_progress") return "done";
  return "todo";
}

function render() {
  const filtered = tasks
    .filter((task) => activeStatus === "all" || task.status === activeStatus)
    .filter((task) => {
      if (!searchQuery) return true;
      return task.title.toLowerCase().includes(searchQuery) || task.description.toLowerCase().includes(searchQuery);
    });

  taskList.innerHTML = "";

  for (const task of filtered) {
    const item = document.createElement("li");
    item.className = "task-item";
    item.dataset.id = task.id;

    item.innerHTML = `
      <div class="task-head">
        <strong>${escapeHtml(task.title)}</strong>
        <div class="badges">
          <span class="badge">${task.priority}</span>
          <span class="badge">${task.status.replace("_", " ")}</span>
        </div>
      </div>
      <div>${escapeHtml(task.description)}</div>
      <div class="actions">
        <button class="small-btn" data-action="cycle">Move to next status</button>
        <button class="small-btn danger" data-action="delete">Delete</button>
      </div>
    `;

    taskList.append(item);
  }

  emptyState.style.display = filtered.length ? "none" : "block";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
