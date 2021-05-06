import { useArray, useMount } from "utils"

export const TsReactTest = () => {
    const persons: {name: string,age:number}[] = [
        {
            name: 'liuyu',age: 22
        },
        {
            name: 'lml',age: 22
        },
    ]
    const { value,add,removeIndex, clear} = useArray(persons)
    useMount(()=>{

    })
    return (
        <div>
            <button onClick={()=>add({name: 'liuyu',age: 22})}>add liuyu</button>
            <button onClick={()=>removeIndex(0)}>remove 0</button>
            <button onClick={()=>clear()}>clear</button>
            {
                value.map((item,index)=> (
                    <div style={{marginBottom: '30px'}} key={index}>
                        <span style={{color: 'red'}}>{index}</span>
                        <span>{item.name}</span>
                        <span>{item.age}</span>
                    </div>
                ) )
            }
        </div>
    )
}