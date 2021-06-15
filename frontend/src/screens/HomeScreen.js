import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import FormContainer from '../components/FormContainer'
import {Form, Button,Row,Col} from 'react-bootstrap'
import {details} from '../actions/userActions' 


function HomeScreen() {
  
    
    const [name,setName] = useState('')
    const [room,setRoom] = useState('Atlanta Room')
    const [description,setDescription] = useState('')
    const [message,setMessage] = useState(null)
    const [dateState, setDateState] = useState(new Date())
    const [slot,setSlot]=useState('')
    {moment(dateState).format('MMMM Do YYYY')}
    const dispatch = useDispatch()
    const date= moment(dateState).format('MMMM Do YYYY')
    
    const timeslots=["10:00AM","10:30AM","11:00AM","11:30AM","12:00PM","12:30PM","1:00PM","1:30PM","2:00PM","2:30PM","3:00PM","3:30PM","4:00PM",
                        "4:30PM","5:00PM","5:30PM","6:00PM","6:30PM","7:00PM"]
     
    useEffect(()=>{
        
    
       },[dispatch])

      
       
       const submitHandler = (e)=>
       {
           e.preventDefault();
       
               
                   dispatch(details(room,name,description,dateState,slot))
               
       }
       const changeDate = (e) => {
        setDateState(e)
      }
      const selectSlot =(e)=>
      {

        setSlot(e.target.value)
      }
       return (
        <FormContainer>
            <h3>Meeting room</h3>
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId="room">
                    <Form.Label>
                        Meeting Room
                    </Form.Label>
            <Form.Control as="select" value={room} onChange={(e)=>setRoom(e.target.value)}>
                <option selected>Atlanta Room</option>
                <option>MiddleBurg room</option>
                <option>Japan Room</option>
                <option>Korea Room</option>
            </Form.Control>
            </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>
                        Team Name
                    </Form.Label>
                    <Form.Control type="name" placeholder="Enter team name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>
                        Meeting Description
                    </Form.Label>
                    <Form.Control as="textarea" row={10} type="description" value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <p><b>{moment(dateState).format('MMMM Do YYYY')}</b></p>         
                <Calendar value={dateState} onChange={changeDate}/>
                <br/>
               <p><b>Please select your preferred time slot:</b></p>
             
                {timeslots.map((timeslot)=>
                    {
                        
                        return(<Button key={timeslot} value={timeslot} variant="secondary"
                        onClick={selectSlot}>
                            {timeslot}</Button>)
                    })
                    
                    }
                 <br/>
                <Button type="submit" variant="primary">Book Room</Button>
                </Form>
               
                
                </FormContainer>
                
       
    )
}

export default HomeScreen;