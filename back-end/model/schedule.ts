export class Schedule{

    private id?: number;
    private date: Date;
    private calorieBurn: number;
    private totalTime: number;


    constructor(schedule: {date: Date; calorieBurn: number; totalTime: number; id?: number}) {
        this.date = schedule.date ;
        this.calorieBurn = schedule.calorieBurn;
        this.totalTime = schedule.totalTime;
        this.id = schedule.id;
    }

    getId(): number | undefined {
        return this.id;
    }


    getDate(): Date {
        return this.date;
    }

    getCalorieBurn(): number {
        return this.calorieBurn;
    }


    getTotalTime(): number {
        return this.totalTime;
    }

    equals(schedule: Schedule): boolean {
        return (
            this.id === schedule.getId() &&
            this.date.getTime() === schedule.getDate().getTime() &&  
            this.calorieBurn === schedule.getCalorieBurn() &&
            this.totalTime === schedule.getTotalTime()
        );
    }
}