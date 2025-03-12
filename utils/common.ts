/**
 * 定义节流函数，接收一个函数和延迟时间作为参数
 *
 * @param func
 * @param delay
 */
export const throttle = <T extends (...args: any[]) => any>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
    // 用于存储定时器的变量
    let timer: ReturnType<typeof setTimeout> | null = null;
    // 返回一个新的函数
    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
        // 如果定时器不存在
        if (!timer) {
            // 设置一个定时器
            timer = setTimeout(() => {
                // 调用原始函数，并绑定 this 上下文和传递参数
                func.apply(this, args);
                // 执行完后将定时器置为 null，以便下次可以再次触发
                timer = null;
            }, delay);
        }
    };
};