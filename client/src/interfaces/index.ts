export interface ITask {
    id: string,
    favor: boolean,
    title: string,
    status: 'to-do' | 'progress' | 'completed'
}

export type TypeTaskAction =
    | {
        type: 'added';
        payload: ITask
    }
    | {
        type: 'deleted';
        payload: {
            id: string
        }
    }
    | {
        type: 'rewrited';
        payload: {
            id: string;
            title: string
        }
    }
    | {
        type: 'favor';
        payload: { id: string }
    } | {
        type: 'initial_tasks';
        payload: ITask[]
    }

export type TypeDefaultValue = {
    tasks: ITask[]
}

export interface ITaskWithOutId extends Omit<ITask, 'id'> { }