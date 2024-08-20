class MyPromise {
    #state: State = 'pending'
    #result: any = undefined
    #handler: Handler[] = []
    constructor(executor: (resolve: CallBack, reject: CallBack) => void) {
        const resolve = (data: any) => {
            this.#changeState('fulfilled', data)
        }
        const reject = (reson: any) => {
            this.#changeState('rejected', reson)
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    #changeState(state: State, result: any) {
        if (this.#state !== 'pending') return
        this.#state = state
        this.#result = result
        this.#run()
    }

    #isPromiseLike(value: any): value is MyPromise {
        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
            return typeof value.then === 'function'
        }
        return false
    }

    #runMicroTask(callback: CallBack) {
        if (typeof process === 'object' && typeof process.nextTick === 'function') {
            process.nextTick(callback)
        } else if (typeof MutationObserver === 'function') {
            const ob = new MutationObserver(callback)
            const textNode = document.createTextNode('1')
            ob.observe(textNode, {
                characterData: true,
            })
            textNode.data = '2'
        } else {
            setTimeout(callback, 0)
        }
    }

    #runOne(callback: any, resolve: any, reject: any) {
        this.#runMicroTask(() => {
            if (typeof callback !== 'function') {
                const settled = this.#state === 'fulfilled' ? resolve : reject
                settled(this.#result)
                return
            }
            try {
                const data = callback(this.#result)
                if (this.#isPromiseLike(data)) {
                    this.#runMicroTask(() => {
                        data.then(resolve, reject)
                    })
                } else {
                    resolve(data)
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    #run() {
        if (this.#state === 'pending') return
        while (this.#handler.length > 0) {
            const { onFulfilled, onRejected, resolve, reject } = this.#handler.shift()!
            if (this.#state === 'fulfilled') {
                this.#runOne(onFulfilled, resolve, reject)
            } else {
                this.#runOne(onRejected, resolve, reject)
            }
        }
    }

    then(onFulfilled?: CallBack, onRejected?: CallBack) {
        return new MyPromise((resolve, reject) => {
            this.#handler.push({
                onFulfilled,
                onRejected,
                resolve,
                reject,
            })
            this.#run()
        })
    }

    static resolve(value?: any) {
        if (value instanceof MyPromise) return value
        let _resolve: any, _reject: any
        const p = new MyPromise((resolve, reject) => {
            _resolve = resolve
            _reject = reject
        })

        if (p.#isPromiseLike(value)) {
            value.then(_resolve, _reject)
        } else {
            _resolve(value)
        }
        return p
    }
}

type State = 'pending' | 'fulfilled' | 'rejected'
type CallBack = (data?: any) => void
type Handler = {
    onFulfilled?: CallBack
    onRejected?: CallBack
    resolve?: CallBack
    reject?: CallBack
}

MyPromise.resolve()
    .then(() => {
        console.log(0)
        return MyPromise.resolve(4)
    })
    .then((res) => {
        console.log(res)
    })

MyPromise.resolve()
    .then(() => {
        console.log(1)
    })
    .then(() => {
        console.log(2)
    })
    .then(() => {
        console.log(3)
    })
    .then(() => {
        console.log(5)
    })

    .then(() => {
        console.log(6)
    })
