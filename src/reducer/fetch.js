export const actions = {
    /**
     * 准备发送请求
     * @type {string}
     */
    FETCH_INIT: 'FETCH_INIT',
    /**
     * 请求成功
     * @type {string}
     */
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    /**
     * 请求失败
     * @type {string}
     */
    FETCH_FAILURE: 'FETCH_FAILURE',
};
/**
 * 处理 ajax 请求
 * @param state
 * @param action
 * @returns {{data: *, loading: boolean, error: boolean}|{error: boolean, loading: boolean}|{loading: boolean, error: boolean}}
 */
export const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case actions.FETCH_INIT:
            return {
                ...state,
                loading: true,
                error: false
            };
        case actions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            };
        case actions.FETCH_FAILURE:
            return {
                ...state,
                error: true,
                loading: false
            };
        default:
            throw new Error("unknown action type:" + action.type);

    }
};