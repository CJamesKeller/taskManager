var whichTask;

$(document).ready(function()
{
  getTasks();

  $("#newForm").on("submit", function(event)
  {
    event.preventDefault();
    var newTask = $("#newTask").val();
        $.ajax(
          {
            type: "POST",
            url: "tasks/add",
            data: {name: newTask, status: true},
            success: function(res)
            {
              getTasks();
              $("#newTask").val("");
            }
          });
    });

  $("#tasksDiv").on("click", ".delete", function()
  {
    whichTask = $(this).parent().parent().data("task");
    feelingSure = confirm("Are you sure?");
    if(feelingSure)
    {
      deleteTask();
    }
  });

  $("#tasksDiv").on("click", ".done", function()
  {
    whichTask = $(this).parent().parent().data("task");
    taskStatus = false;
    $.ajax(
      {
        type: "PUT",
        url: "tasks/done/",
        data: {id: whichTask, status: taskStatus},
        success: function(res)
        {
          getTasks();
          $("#newTask").val("");
        }
      });
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
        $("#tasksDiv").empty();
        for(var i = 0; i < res.length; i++)
        {
          var task = res[i];
          $("#tasksDiv").append("<tr class=" + task.status + " data-task=" + task.id + ">");
          var $el = $("#tasksDiv").children().last();
          $el.append("<td>" + task.id + "</td>");
          $el.append("<td>" + task.name + "</td>");
          $el.append("<td><button class='delete' data-task='" +
                      task.id +
                    "'>Delete</button></td>");
          $el.append("<td><button class='done' data-task='" +
                      task.id +
                    "'>Done</button></td>");

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
      success: function(res)
      {
        getTasks();
      }
    });
}
