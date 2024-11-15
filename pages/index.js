import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const id = uuidv4();
    const todoData = { ...inputValues, id };
    renderTodo(todoData);
    addTodoPopup.close();
    handleTotal(false);

    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

const addTodoForm = addTodoPopup.getForm();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDeleted(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function handleTotal(deleted) {
  if (deleted) {
    todoCounter.updateTotal(false);
  } else {
    todoCounter.updateTotal(true);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleCheck,
    handleDeleted,
    handleTotal
  );
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.appendItem(todo);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});
section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
