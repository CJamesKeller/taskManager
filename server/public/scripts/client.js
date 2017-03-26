var editing = false;
var whichTask;

$(document).ready(function()
{
  getTasks();

  $("#newForm").on("submit", function(event)
  {
    event.preventDefault();
    var newTask = $("#newTask").val();
    if(editing)
    {
      editing = false;
      $("#header").text("Add new entry");
      $.ajax(
        {
          type: "PUT",
          url: "tasks/edit/",
          data: {newTask: newTask},
          success: function(res)
          {
            getBooks();
            $("#newTask").val("");
          }
        });
      }
      else
      {
        $.ajax(
          {
            type: "POST",
            url: "tasks/add",
            data: {newTask: newTask},
            success: function(res)
            {
              getBooks();
              $("#newTask").val("");
            }
          });
      }
    });

  $("#tasksDiv").on("click", ".delete", function()
  {
    whichTask = $(this).data("name");
    deleteTask();
  });

  $("#tasksDiv").on("click", ".edit", function()
  {
    whichTask = $(this).data("name");
    editing = true;
    $("#header").text("Make your edits to:" + whichTask);
  });

//end of DocReady
});


function getTasks()
{
  $.ajax(
    {
      type: "GET",
      url: "/tasks",
      data: whichTask,
      success: function(res)
      {
        console.log(res);
        $("#tasksDiv").empty();
        for(var i = 0; i < res.length; i++)
        {
          var task = res[i];
          $("#tasksDiv").append("<tr>");
          var $el = $("#tasksDiv").children().last();
          $el.append("<td>" + task.id + "</td>");
          $el.append("<td><button class='delete' data-task='" +
                      task.id +
                    "'>Delete</button></td>");
          $el.append("<td><button class='edit' data-task='" +
                      task.id +
                    "'>Edit</button></td>");

        }
      }
    });
}

function deleteTask()
{
  $.ajax(
    {
      type: "DELETE",
      url: "tasks/delete/" + whichTask,
      data: whichTask,
      success: function(res)
      {
        getTasks();
      }
    });
}
