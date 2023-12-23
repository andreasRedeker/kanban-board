package de.ar.backend.task;

import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
//    @Transactional
//    void deleteByCollection_Id(long collectionId);
//    List<Task> findByCollection_Id(long collectionId);
}
