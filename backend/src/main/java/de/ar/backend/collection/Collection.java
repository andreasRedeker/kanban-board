package de.ar.backend.collection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import de.ar.backend.board.Board;
import de.ar.backend.task.Task;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Collection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collection_id")
    private long id;

    private String title;
    private String description;

    @CreationTimestamp
    private LocalDateTime dateCreated;

    @ManyToOne
    @JoinColumn(name = "board_id")
    @JsonIgnore
    private Board board;

    @OneToMany(mappedBy = "collection", cascade =CascadeType.REMOVE)
    private List<Task> task;
}
