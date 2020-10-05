/**
 * 防抖函数
 * @param debouncedFn
 * @param delay
 * @param immediateInvokeFns 需要立即执行的函数，这些函数不会被防抖影响。比如我们输入框的 value 需要立即更新，而ajax请求并不需要立即发送（避免频繁请求）
 * @returns {function(...[*]=)}
 */
export const debounce = (debouncedFn, delay, ...immediateInvokeFns) => {

    let timerId;
    return (...args) => {
        immediateInvokeFns.forEach(fn => {
            if (typeof fn == 'function') {
                fn.apply(this, args);
            }
        });
        clearTimeout(timerId);
        timerId = setTimeout(() => debouncedFn.apply(this, args), delay);
    }
};