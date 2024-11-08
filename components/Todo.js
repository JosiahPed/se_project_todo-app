class Todo {
  constructor(data, selector) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListener() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  _addDueDate() {
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateCheckbox() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._completed;
    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._name;

    this._generateCheckbox();
    this._setEventListener();
    this._addDueDate();

    return this._todoElement;
  }
}

export default Todo;
