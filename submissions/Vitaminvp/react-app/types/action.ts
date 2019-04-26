export interface Action<T, D> {
    type: T;
    payload: D;
}