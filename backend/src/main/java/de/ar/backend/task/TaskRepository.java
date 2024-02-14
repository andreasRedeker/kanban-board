package de.ar.backend.task;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> findAllByCollectionId(long collectionId);

    List<Task> findAllByCollectionIdOrderByPosition(long id);
}
