export type TypeStatus = "to-do" | "progress" | "completed"


export interface ITask {
    id: string,
    favor: boolean,
    title: string,
    status: TypeStatus
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
    } | {
        type: 'change_status';
        payload: {
            id: string;
            status: TypeStatus
        }
    } | {
        type: 'change_filter';
        payload: {
            filter: TypeStatus | "all"
        }
    } | {
        type: 'clear_completed';
    } | {
        type: 'clear_favor';
    } | {
        type: 'change_favor';
        payload: { id: string }
    }

export type TypeDefaultValue = {
    tasks: ITask[],
    filter: TypeStatus | "all",
}

export interface ITaskWithOutId extends Omit<ITask, 'id'> { }