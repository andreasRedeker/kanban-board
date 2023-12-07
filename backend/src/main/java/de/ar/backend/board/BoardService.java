package de.ar.backend.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Board getBoardById(long boardId) {
        Optional<Board> board = boardRepository.findById(boardId);
        return board.orElse(null);
    }

    public List<Board> getAllBoards() {
        List<Board> boardCollection = new ArrayList<>();
        boardRepository.findAll().forEach(boardCollection::add);
        return boardCollection;
    }
    public void createBoard(BoardDTO boardDTO) {
        Board board = Board.builder().title(boardDTO.getTitle()).description(boardDTO.getDescription()).build();
        boardRepository.save(board);
    }
}
