export interface ITask {
    id: number,
    undo: boolean,
    title: string,
}

export type TypeTaskAction =
    | {
        type: 'added';
        payload: ITask
    }
    | {
        type: 'deleted';
        payload: {
            id: number
        }
    }
    | {
        type: 'rewrited';
        payload: {
            id: number;
            title: string
        }
    }
    | {
        type: 'undo';
        payload: { id: number }
    }

export type TypeDefaultValue = {
    tasks: ITask[]
}

export interface ITaskWithOutId extends Omit<ITask, 'id'> { }