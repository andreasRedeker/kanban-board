package de.ar.backend;

import de.ar.backend.board.BoardDTO;
import de.ar.backend.board.BoardService;
import de.ar.backend.collection.CollectionDTO;
import de.ar.backend.collection.CollectionService;
import de.ar.backend.task.TaskDTO;
import de.ar.backend.task.TaskService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KanbanApplication {

    @Autowired
    private BoardService boardService;

    @Autowired
    private CollectionService collectionService;

    @Autowired
    private TaskService taskService;

    public static void main(String[] args) {
        SpringApplication.run(KanbanApplication.class, args);
    }

    @PostConstruct
    private void postConstruct() {
        if (boardService.getAllBoards().isEmpty()) {
            boardService.createBoard(
                    BoardDTO.builder()
                            .title("First Board")
                            .description("This is the first board")
                            .build()
            );

            collectionService.createCollection(CollectionDTO.builder()
                    .title("📋 To Do")
                    .description("First Description")
                    .boardId(1)
                    .build());

            collectionService.createCollection(CollectionDTO.builder()
                    .title("⌛️In Progress")
                    .description("2nd Description")
                    .boardId(1)
                    .build());

            collectionService.createCollection(CollectionDTO.builder()
                    .title("✅ Done")
                    .description("3rd Description")
                    .boardId(1)
                    .build());

            taskService.createTask(TaskDTO.builder()
                    .title("First Task")
                    .description("First Task Description")
                    .position(1)
                    .collectionId(1)
                    .build());

            taskService.createTask(TaskDTO.builder()
                    .title("Second Task")
                    .description("Second Task Description")
                    .position(2)
                    .collectionId(1)
                    .build());

            taskService.createTask(TaskDTO.builder()
                    .title("Third Task")
                    .description("Third Task Description")
                    .position(1)
                    .collectionId(2)
                    .build());

            taskService.createTask(TaskDTO.builder()
                    .title("4th Task")
                    .description("Fourth Task Description")
                    .position(1)
                    .collectionId(3)
                    .build());
        }
    }
}
