import { useState, useEffect } from "react";

export const isFalsy = (val:unknown) => val === 0 ? false : !val

// 在一个函数里，改变传入的对象是不好的
export const cleanObject = (obj?:object) => {
    let result = { ...obj }
    Object.keys(result).forEach(key => {
        // @ts-ignore
        const value = result[key]
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [callback])
}

export const useArray = <A>(initialArray: A[] ) => {
    const [value, setvalue] = useState(initialArray)
    const add = (obj: A) => { 
        setvalue([...value,obj])
    }
    const removeIndex = (index: number) => {
        const copy = [...value]
        copy.splice(index,1)
        setvalue(copy)
    }

    return { 
        value,
        setvalue,
        add,
        removeIndex,
        clear: () => {setvalue([])}
    }
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => { 
        let timeOut = setTimeout(() => {
            setDebounceValue(value)
        }, delay);
        return () => { clearTimeout(timeOut) }
    }, [value, delay])
    return debounceValue
}