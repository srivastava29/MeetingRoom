import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS , USER_REGISTER_FAIL,USER_REGISTER_SUCCESS,USER_REGISTER_REQUEST,USER_LOGOUT,
USER_DETAILS_SUCCESS,
USER_DETAILS_REQUEST,
USER_DETAILS_FAIL,
USER_DETAILS_RESET} from '../constants/userConstant';



//action creators
 const login = (email,password)=>
async(dispatch)=>{
    try{
        dispatch({type:USER_LOGIN_REQUEST})
        const config= {
            headers:{
                'Content-type' : 'application/json'
            },
        }
           
        const {data} = await axios.post('/api/users/login' , {email,password},config )

        dispatch({type:USER_LOGIN_SUCCESS,
        payload: data})

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error)
    {
        dispatch({type:USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message})
            
    }

}

const logout = ()=>(dispatch)=>
{
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    
}

const register = (team_name,email,password)=>
async(dispatch)=>{
    try{
        dispatch({type:USER_REGISTER_REQUEST})
        const config= {
            headers:{
                'Content-type' : 'application/json'
            },
        }
          console.log(team_name) 
        const {data} = await axios.post('/api/users/' , {team_name,email,password},config )

        dispatch({type:USER_REGISTER_SUCCESS,
        payload: data})

        dispatch({type:USER_LOGIN_SUCCESS,
            payload: data})
    

        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error)
    {
        dispatch({type:USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message})
            
    }

}

const details = (room,name,description,dateState,slot)=>
async(dispatch,getState)=>{
    try{
        dispatch({type:USER_DETAILS_REQUEST})

        const config= {
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
            }
        } 
        const {data} = await axios.post(`/api/users/details` , {room,name,description,dateState,slot},config )

        console.log("Data"+data)

        dispatch({type:USER_DETAILS_SUCCESS,
        payload: data})

        }
    catch(error)
    {
        dispatch({type:USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message})
            
    }

}


export{
    login,
    logout,
    register,
    details,
    }