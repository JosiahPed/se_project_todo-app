import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-form");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    // dueDate.setMinutes(dueDate.getMinutes() + dueDate.getTimezoneOffset());
    const id = uuidv4();
    const todoData = { ...inputValues, id };
    renderTodo(todoData);
    addTodoPopup.close();

    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (items) => {
    const todo = generateTodo(items);
    section.appendItem(todo);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.appendItem(todo);
};

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
