package de.ar.backend.task;

import de.ar.backend.collection.Collection;
import de.ar.backend.collection.CollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    public void createTask(TaskDTO taskDTO) {
        Collection collection = collectionRepository.findById(taskDTO.getCollectionId()).get();
        Task task = Task.builder().title(taskDTO.getTitle()).description(taskDTO.getDescription()).collection(collection).build();
        taskRepository.save(task);
    }

    public void updateTaskStatus(TaskDTO taskDTO) {
        Task updateTask = taskRepository.findById(taskDTO.getId()).get();
        Collection collection = collectionRepository.findById(taskDTO.getCollectionId()).get();
        updateTask.setCollection(collection);
        taskRepository.save(updateTask);
    }
}
