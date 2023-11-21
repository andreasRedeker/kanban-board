package de.ar.backend.collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

//    @GetMapping("/collection/{boardId}")
//    public List<Collection> getCollectionsByBoardId(@PathVariable long boardId) {
//        return collectionService.getCollectionsByBoardId(boardId);
//    }
//
//    @GetMapping("/collections")
//    public List<Collection> getAllCollections() { return collectionService.getAllCollections(); }

    @PostMapping("/collection")
    public void createCollection(@RequestBody CollectionDTO collectionDTO) { collectionService.createCollection(collectionDTO);}
}
