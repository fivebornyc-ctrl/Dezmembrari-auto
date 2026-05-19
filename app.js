const STORAGE_KEY = "demo-tasks-v1";
const THEME_KEY = "demo-tasks-theme";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let filter = "all";

const listEl = document.getElementById("list");
const emptyEl = document.getElementById("empty");
const formEl = document.getElementById("form-add");
const inputEl = document.getElementById("input-task");
const themeBtn = document.getElementById("toggle-theme");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function visibleTasks() {
  if (filter === "active") return tasks.filter((t) => !t.done);
  if (filter === "done") return tasks.filter((t) => t.done);
  return tasks;
}

function render() {
  const visible = visibleTasks();
  listEl.innerHTML = "";
  emptyEl.classList.toggle("hidden", visible.length > 0);

  visible.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.done;
    check.addEventListener("change", () => {
      task.done = check.checked;
      save();
      render();
    });

    const label = document.createElement("span");
    label.textContent = task.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Șterge";
    remove.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      save();
      render();
    });

    li.append(check, label, remove);
    listEl.appendChild(li);
  });
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, done: false });
  inputEl.value = "";
  save();
  render();
});

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    render();
  });
});

if (localStorage.getItem(THEME_KEY) === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "Mod luminos";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  themeBtn.textContent = dark ? "Mod luminos" : "Mod întunecat";
});

render();
