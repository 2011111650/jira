import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState,useEffect } from "react";
import { cleanObject,useDebounce, useMount } from "utils";
import * as qs from "qs";
export const ProjectListScreen = ()=>{
    const [list, setlist] = useState([])
    const [users, setUsers] = useState([])
    const [param,  setParam] = useState({
        name: '',
        personId: ''
    })
    const debounceParam = useDebounce(param,1000)
 
    useEffect(() => {
        fetch(`http://localhost:3001/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
            if(res.ok){
                setlist(await res.json())
            }
        })
    }, [debounceParam])
    useMount(() => {
        fetch('http://localhost:3001/users').then(async res => {
            if(res.ok){
                setUsers(await res.json())
            }
        })
    })
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List list={list} users={users}/>
    </div>
}