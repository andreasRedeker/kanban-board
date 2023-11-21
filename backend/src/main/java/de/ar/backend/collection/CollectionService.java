package de.ar.backend.collection;

import de.ar.backend.board.Board;
import de.ar.backend.board.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private BoardRepository boardRepository;

    public List<Collection> getCollectionsByBoardId(long boardId) {
        return collectionRepository.findByBoardId(boardId);
    }
    public List<Collection> getAllCollections() {
        List<Collection> collections = new ArrayList<>();
        collectionRepository.findAll().forEach(collections::add);
        return collections;
    }
    public void createCollection(CollectionDTO collectionDTO) {
        Board board = boardRepository.findById(collectionDTO.getBoardId()).get();
        Collection collection = Collection.builder().title(collectionDTO.getTitle()).description(collectionDTO.getDescription()).board(board).build();
        collectionRepository.save(collection);
    }
}
