import {debounce} from 'lodash';

const TASK_LIST = "TASK_LIST";
class LocalStorageService {

    constructor() {
        this._storeAvailable = null;
        this.update = debounce(::this._update, 1000);

        this._initialize();
    }

    _initialize() {
        this._storeAvailable = (typeof Storage !== "undefined");

        this._taskList = [];

        if (this._storeAvailable) {
            const userPreferencesString = localStorage.getItem(TASK_LIST);
            if (userPreferencesString) {
                this.taskList = JSON.parse(userPreferencesString).map(task => ({
                    ...task,
                    createdDate: new Date(task.createdDate),
                    completedDate: new Date(task.completedDate)
                }));
            }
        }
    }

    get taskList() {
        this._checkIfInitialized();
        return this._taskList;
    }

    set taskList(newValues) {
        this._checkIfInitialized();
        this._taskList = [...newValues];
        this.update();
    }

    _checkIfInitialized() {
        if (this._storeAvailable == null) {
            throw new Error("LocalStorageService is not initialized! Please initialize it first!");
        }
    }

    /**
     * Use 'update' method which is debounced!
     * But it's better to call it in getters / setters just to keep simplicity using this service...
     */
    _update() {
        this._checkIfInitialized();
        localStorage.setItem(TASK_LIST, JSON.stringify(this._taskList));
    }

    /**
     * Do not call clear method to avoid unexpected exceptions of using it in other parts of apps!
     * Clean all used fields manually.
     */
    clear() {
        this._checkIfInitialized();
        localStorage.removeItem(TASK_LIST);
    }
}

const instance = new LocalStorageService();

export default instance;