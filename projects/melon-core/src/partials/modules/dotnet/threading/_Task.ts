import { _nextTick } from "../../std/async/_nextTick";
import { _createTask } from "./_createTask";

class _Task<T> {
    #__interop_task: any;

    constructor(action: (...args: any[]) => T) {
        this.#__interop_task = _createTask(action);
    }

    get isCanceled(): boolean {
        return this.#__interop_task.isCanceled;
    }

    get isCompleted(): boolean {
        return this.#__interop_task.isCompleted;
    }

    get isCompletedSuccessfully(): boolean {
        return this.#__interop_task.isCompletedSuccessfully;
    }

    get isFaulted(): boolean {
        return this.#__interop_task.isFaulted;
    }

    get result(): T {
        if(this.isCompleted)
            return this.#__interop_task.result;

        throw new Error("The task needs to be completed before getting it's result");
    }

    start() {
        this.#__interop_task.start();
    }

    wait() {
        this.#__interop_task.wait();
    }

    //Warning: unstable 
    async resolve(cancellationFunction: () => boolean = () => false) {
        const task = this.#__interop_task;
        this.start();
        
        while(task.status <= 4 || !this.isCompleted) {
            await _nextTick(1);

            if(cancellationFunction())
                return null;
        }

        this.wait();

        return task.result;
    }

    unsafeGetInteropTask() {
        return this.#__interop_task;
    }
}

export { _Task }