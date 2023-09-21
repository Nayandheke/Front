import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, fromStorage } from "../lib"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import http from "../http"
import { setUser } from "../store"
import { Loading } from "../components"

export const PrivateRoutes = ({element}) => {

    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()


    useEffect(() => {
        if (Object.keys(user).length == 0 ) {
            const token = fromStorage('130fronttoken')

            if(token){
                http.get('profile/details')
                    .then(({data})=> dispatch(setUser(data)))
                    .catch(err => {})
            }else{
                toast.error('Please login to continue.')
                navigate('/login')
            }
        }
    }, [user])
    return loading ? < Loading /> : element

}