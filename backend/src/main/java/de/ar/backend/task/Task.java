package de.ar.backend.task;

import com.fasterxml.jackson.annotation.JsonIgnore;
import de.ar.backend.collection.Collection;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

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
    private Instant createdOn;

    @UpdateTimestamp
    private Instant lastUpdatedOn;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    @JsonIgnore
    @NonNull
    private Collection collection;
}
