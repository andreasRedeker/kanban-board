package de.ar.backend.task;

import de.ar.backend.collection.Collection;
import de.ar.backend.collection.CollectionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CollectionRepository collectionRepository;

    public void createTask(TaskDTO taskDTO) {
        Collection collection = collectionRepository.findById(taskDTO.getCollectionId()).get();
        Task task = Task.builder().title(taskDTO.getTitle()).description(taskDTO.getDescription()).position(getIndexForNewTask(taskDTO.getCollectionId())).collection(collection).build();
        taskRepository.save(task);
    }

    @Transactional
    public void deleteTask(long taskId) {
        taskRepository.deleteById(taskId);
    }

    public int getIndexForNewTask(long collectionId) {
        List<Task> tasks = taskRepository.findAllByCollectionId(collectionId);
        return tasks.isEmpty() ? 1 : tasks.size() + 1;
    }

    @Transactional
    public void updateTask(TaskDTO taskDTO) {

        Task taskToUpdate = taskRepository.findById(taskDTO.getId()).orElseThrow(() -> new IllegalArgumentException("Task not found"));

        int newPosition = taskDTO.getPosition();
        long previousCollectionId = taskToUpdate.getCollection().getId();
        long newCollectionId = taskDTO.getCollectionId();

        boolean collectionChanged = previousCollectionId != newCollectionId;

        taskToUpdate.setPosition(newPosition);

        if (collectionChanged) {

            Collection newCollection = collectionRepository.findById(newCollectionId).orElseThrow(() -> new IllegalArgumentException("Collection not found"));
            taskToUpdate.setCollection(newCollection);

            List<Task> previousCollection = taskRepository.findAllByCollectionIdOrderByPosition(previousCollectionId);
            previousCollection.remove(taskToUpdate);

            for (int i = 0; i < previousCollection.size(); i++) {
                Task previousTask = previousCollection.get(i);
                previousTask.setPosition(i + 1);
            }

            taskRepository.saveAll(previousCollection);
        }

        List<Task> tasksInCollection = taskRepository.findAllByCollectionIdOrderByPosition(newCollectionId);
        tasksInCollection.remove(taskToUpdate);

        int positionIndex = newPosition - 1;

        if (positionIndex < 0) {
            tasksInCollection.add(0, taskToUpdate);
        } else if (positionIndex >= tasksInCollection.size()) {
            tasksInCollection.add(taskToUpdate);
        } else {
            tasksInCollection.add(positionIndex, taskToUpdate);
        }

        for (int i = 0; i < tasksInCollection.size(); i++) {
            tasksInCollection.get(i).setPosition(i + 1);
        }

        taskRepository.saveAll(tasksInCollection);
    }
}
