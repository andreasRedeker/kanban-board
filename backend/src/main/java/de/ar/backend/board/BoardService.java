package de.ar.backend.board;

import de.ar.backend.exception.BoardNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Board getBoardById(long boardId) {
        Optional<Board> board = boardRepository.findById(boardId);
        return board.orElseThrow(() -> new BoardNotFoundException(boardId));
    }

    public List<Board> getAllBoards() {
        List<Board> boardCollection = new ArrayList<>();
        boardRepository.findAll().forEach(boardCollection::add);
        return boardCollection;
    }

    public List<BoardResponse> getBoardList() {
        List<Board> boardCollection = new ArrayList<>();
        boardRepository.findAll().forEach(boardCollection::add);
        return boardCollection.stream()
                .map(board -> new BoardResponse(board.getId(), board.getTitle(), board.getDescription()))
                .collect(Collectors.toList());
    }

    public Board createBoard(BoardDTO boardDTO) {
        Board board = Board.builder().title(boardDTO.getTitle()).description(boardDTO.getDescription()).build();
        return boardRepository.save(board);
    }

    public void deleteBoardById(Long boardId) {
        boardRepository.deleteById(boardId);
    }
}
