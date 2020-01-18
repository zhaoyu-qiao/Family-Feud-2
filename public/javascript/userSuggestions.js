// Cited Class Activity: https://harvard.bootcampcontent.com/Harvard-Coding-Boot-Camp/hu-cam-fsf-pt-09-2019-u-c/blob/master/Week_15/01-Activities/09-Sequelize-Update-Delete/Solved/server.js
$(document).ready(function () {
    // Getting a reference to the input field where user adds a new todo
    let $newItemInput = $("input.new-item");
    // Our new todos will go inside the todoContainer
    let $todoContainer = $(".todo-container");
    let $groupList = $(".list-group");
    // Adding event listeners for deleting, editing, and adding todos
    $(document).on("click", "button.delete", deleteTodo);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".todo-item", editTodo);
    $(document).on("keyup", ".todo-item", finishEdit);
    $(document).on("blur", ".todo-item", cancelEdit);
    $(document).on("submit", "#todo-form", insertTodo);
    $(document).on("click", ".submit-new-questn-btn", clearTodoContainer);
    // Our initial todos array
    let todos = [];
    // Getting todos from database when page loads
    getTodos();
    // This function resets the todos displayed with new todos from the database
    function initializeRows() {
        $todoContainer.empty();
        let rowsToAdd = [];
        for (let i = 0; i < todos.length; i++) {
            rowsToAdd.push(createNewRow(todos[i]));
        }
        $todoContainer.prepend(rowsToAdd);
    }
    // This function grabs todos from the database and updates the view
    function getTodos() {
        $.get("/api/todos", function (data) {
            todos = data;
            initializeRows();
        });
    }
    // This function deletes a todo when the user clicks the delete button
    function deleteTodo(event) {
        event.stopPropagation();
        let id = $(this).data("id");
        $.ajax({
            method: "DELETE",
            url: "/api/todos/" + id
        }).then(getTodos);
    }
    // This function handles showing the input box for a user to edit a todo
    function editTodo() {
        let currentTodo = $(this).data("todo");
        $(this).children().hide();
        $(this).children("input.edit").val(currentTodo.userSuggestion);
        // text
        $(this).children("input.edit").show();
        $(this).children("input.edit").focus();
    }
    // Toggles complete status
    function toggleComplete(event) {
        event.stopPropagation();
        let todo = $(this).parent().data("todo");
        todo.complete = !todo.complete;
        updateTodo(todo);
    }
    // This function starts updating a todo in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
        let updatedTodo = $(this).data("todo");
        if (event.which === 13) {
            updatedTodo.userSuggestion = $(this).children("input").val().trim();
            $(this).blur();
            updateTodo(updatedTodo);
        }
    }
    // This function updates a todo in our database
    function updateTodo(todo) {
        $.ajax({
            method: "PUT",
            url: "/api/todos",
            data: todo
        }).then(getTodos);
    }
    // This function is called whenever a todo item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
        let currentTodo = $(this).data("todo");
        if (currentTodo) {
            $(this).children().hide();
            $(this).children("input.edit").val(currentTodo.userSuggestion);
            $(this).children("span").show();
            $(this).children("button").show();
        }
    }
    // This function constructs a todo-item row
    function createNewRow(todo) {
        let $newInputRow = $(
            [
                "<li class='list-group-item todo-item'>",
                "<span>",
                todo.userSuggestion,
                "</span>",
                "<input type='text' class='edit' style='display: none;'>",
                "<button class='delete btn'>x</button>",
                "<button class='complete btn btn-primary'>✓</button>",
                "</li>"
            ].join("")
        );
        $newInputRow.find("button.delete").data("id", todo.id);
        $newInputRow.find("input.edit").css("display", "none");
        $newInputRow.data("todo", todo);
        if (todo.complete) {
            // $newInputRow.find("span").css("text-decoration", "underline");
            $newInputRow.find("span").css("color", "blue");
        }
        return $newInputRow;
    }
    // This function inserts a new todo into our database and then updates the view
    function insertTodo(event) {
        event.preventDefault();
        let todo = {
            userSuggestion: $newItemInput.val().trim(),
            complete: false
        };
        $.post("/api/todos", todo, getTodos);
        $newItemInput.val("");
    }
    // $(".submit-new-questn-btn").click(function () {
    //   $todoContainer.empty();
    // });
    //This function clears the todo container when the user clicks on the final submit button
    function clearTodoContainer(event) {
        // $todoContainer.empty();
        while ($groupList.hasChildNodes()) {
            $groupList.removeChild($groupList.firstChild);
        }
    }
    /* Animated Words Cited: https://codepen.io/jackarmley/pen/WvGJPB/ */
    let
        words = ['Better!!', 'Funnier!!', 'Amazing!!', "Entertaining!!", "Relevant!!"],
        part,
        i = 0,
        offset = 0,
        len = words.length,
        forwards = true,
        skip_count = 0,
        skip_delay = 5,
        speed = 100;
    let wordflick = function () {
        setInterval(function () {
            if (forwards) {
                if (offset >= words[i].length) {
                    ++skip_count;
                    if (skip_count == skip_delay) {
                        forwards = false;
                        skip_count = 0;
                    }
                }
            } else {
                if (offset == 0) {
                    forwards = true;
                    i++;
                    offset = 0;
                    if (i >= len) {
                        i = 0;
                    }
                }
            }
            part = words[i].substr(0, offset);
            if (skip_count == 0) {
                if (forwards) {
                    offset++;
                } else {
                    offset--;
                }
            }
            $('h1 span').text(part);
        }, speed);
    };
    wordflick();
});