package de.ar.backend.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/board")
    public Board getBoardById(@RequestParam long boardId) {
        return boardService.getBoardById(boardId);
    }

    @PostMapping("/board")
    public Board createBoard(@RequestBody BoardDTO boardDTO) { return boardService.createBoard(boardDTO);}

    @DeleteMapping("/board")
    public void deleteBoard(@RequestParam long boardId) {
        boardService.deleteBoardById(boardId);
    }
    
    @GetMapping("/boards")
    public List<Board> getAllBoards() { return boardService.getAllBoards(); }

    @GetMapping("/board-list")
    public List<BoardResponse> getBoardList() { return boardService.getBoardList(); }
}
