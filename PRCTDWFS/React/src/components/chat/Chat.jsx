import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useGetMessagesQuery } from '../features/api/apiMessageSlice'
import { useSelector } from "react-redux";
import ChatWindow from './ChatWindow';

export default  function Chat(){

    const {data, isLoading, isError, error } = useGetMessagesQuery()
    const user = useSelector((state) => state.auth.user);
    const [messages, setMessage] = useState([])

    useEffect(() => {       
        if(data){
            setMessage(data)
        }
    }, [data])

    if (isLoading) return <div role="status" className='flex justify-center'>
        {/* Spinner UI */}
    </div>;
    else if(isError) return (<div>Error: {error.message} </div>)    

    return (
        <ChatWindow />
    )
}