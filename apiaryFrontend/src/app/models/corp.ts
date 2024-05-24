export class Corp {
    id!: number;
    framesBlack!: number;
    framesBrown!: number;
    framesWhite!: number;
    framesEmpty!: number;
    hiveId!: number;

    constructor(id: number, framesBlack: number, framesBrown: number, framesWhite: number, framesEmpty: number, hiveId: number) {
        this.id = id;
        this.framesBlack = framesBlack;
        this.framesBrown = framesBrown;
        this.framesWhite = framesWhite;
        this.framesEmpty = framesEmpty;
        this.hiveId = hiveId;
    }
}