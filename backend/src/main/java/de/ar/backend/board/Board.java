package de.ar.backend.board;

import de.ar.backend.collection.Collection;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private long id;

    private String title;
    private String description;

    @CreationTimestamp
    private LocalDateTime dateCreated;

    @OneToMany(mappedBy = "board")
    private List<Collection> collectionList;
}
