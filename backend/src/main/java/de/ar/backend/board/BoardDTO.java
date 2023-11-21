package de.ar.backend.board;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardDTO {
    private String title;
    private String description;
}
