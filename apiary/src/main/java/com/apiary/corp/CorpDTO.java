package com.apiary.corp;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CorpDTO {
    private Long id;
    private int framesBlack;
    private int framesBrown;
    private int framesWhite;
    private int framesEmpty;
    private Long hiveId;

    // Getters and Setters
}

