package de.ar.backend.collection;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CollectionDTO {
    private String title;
    private String description;
    private long boardId;
}
