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
					.title("First Collection")
					.description("First Description")
					.build());

			collectionService.createCollection(CollectionDTO.builder()
					.title("2nd Collection")
					.description("2nd Description")
					.build());

			taskService.createTask(TaskDTO.builder()
					.title("First Task")
					.description("First Description")
					.collectionId(1)
					.build());
		}
	}
}
