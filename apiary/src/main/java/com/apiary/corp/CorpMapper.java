package com.apiary.corp;

import com.apiary.hive.HiveRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CorpMapper {

    private final HiveRepository hiveRepository;

    public Corp toEntity(CorpDTO dto) {
        Corp corp = new Corp();
        corp.setId(dto.getId());
        corp.setFramesBlack(dto.getFramesBlack());
        corp.setFramesWhite(dto.getFramesWhite());
        corp.setFramesBrown(dto.getFramesBrown());
        corp.setFramesEmpty(dto.getFramesEmpty());
        return corp;
    }

    public CorpDTO toDto(Corp entity) {
        return CorpDTO.builder()
                .id(entity.getId())
                .hiveId(entity.getHive().getId())
                .framesWhite(entity.getFramesWhite())
                .framesEmpty(entity.getFramesEmpty())
                .framesBrown(entity.getFramesBrown())
                .framesBlack(entity.getFramesBlack())
                .build();
    }

}
