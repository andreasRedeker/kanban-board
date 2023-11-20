package de.ar.backend;

import de.ar.backend.board.Board;
import de.ar.backend.board.BoardRepository;
import de.ar.backend.board.BoardService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KanbanApplication {

	@Autowired
	private BoardService boardRepository;

	public static void main(String[] args) {
		SpringApplication.run(KanbanApplication.class, args);
	}

	@PostConstruct
	private void postConstruct() {
		boardRepository.createBoard(
				Board.builder()
						.title("First Board")
						.description("This is the first board")
						.build()
		);
	}
}
