package com.apiary.seazon;

import org.springframework.stereotype.Component;

@Component
public class SeasonMapper {

    public Season toEntity(SeasonDTO dto) {
        Season season = new Season();
        season.setId(dto.getId());
        season.setName(dto.getName());
        season.setSyrup(dto.getSyrup());
        season.setHoney(dto.getHoney());
        season.setStartDate(dto.getStartDate());
        season.setEndDate(dto.getEndDate());
        return season;
    }

    public SeasonDTO toDto(Season entity) {
        return SeasonDTO.builder()
                .id(entity.getId())
                .honey(entity.getHoney())
                .endDate(entity.getEndDate())
                .syrup(entity.getSyrup())
                .name(entity.getName())
                .startDate(entity.getStartDate())
                .build();
    }

}
