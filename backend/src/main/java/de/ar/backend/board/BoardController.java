package de.ar.backend.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/boards")
    public List<Board> getAllBoards() { return boardService.getAllBoards(); }

    @PostMapping("/board")
    public void createBoard(@RequestBody BoardDTO boardDTO) { boardService.createBoard(boardDTO);}
}
