package de.ar.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/task")
    public void createTask(@RequestBody TaskDTO taskDTO) { taskService.createTask(taskDTO);}

    @PostMapping("/task/status")
    public void updateTaskStatus(@RequestBody TaskDTO taskDTO) {
        taskService.updateTask(taskDTO);
    }

    @DeleteMapping("/task")
    public void deleteTask(@RequestParam long taskId) {
        this.taskService.deleteTask(taskId);
    }
}
