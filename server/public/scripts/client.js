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
      success: function(res)
      {
        $("#tasksDiv").empty();
        $("#completedTasks").empty();

        for(var i = 0; i < res.length; i++)
        {
          var task = res[i];
          if(task.status)
          {
            $("#tasksDiv").append("<tr class=" + task.status + " data-task=" + task.id + ">");
            var $el1 = $("#tasksDiv").children().last();
            $el1.append("<td class='nameBox'>" + task.name + "</td>");
            $el1.append("<td><button class='done' data-task='" +
                        task.id +
                      "'>Done</button></td>");
            $el1.append("<td><button class='delete' data-task='" +
                        task.id +
                      "'>Delete</button></td>");

          }
          else if (task.status === false)
          {
            $("#completedTasks").append("<tr class=" + task.status + " data-task=" + task.id + ">");
            var $el2 = $("#completedTasks").children().last();
            $el2.append("<td class='nameBox'>" + task.name + "</td>");
            $el2.append("<td><button class='done' data-task='" +
                        task.id +
                      "'>Done</button></td>");
            $el2.append("<td><button class='delete' data-task='" +
                        task.id +
                      "'>Delete</button></td>");

          }
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
