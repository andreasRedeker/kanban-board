package de.ar.backend.task;

import com.fasterxml.jackson.annotation.JsonIgnore;
import de.ar.backend.collection.Collection;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private long id;

    private String title;
    private String description;

    @CreationTimestamp
    private LocalDateTime dateCreated;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    @JsonIgnore
    @NonNull
    private Collection collection;
}
