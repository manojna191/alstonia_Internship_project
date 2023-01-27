import styled from "styled-components"
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import ReactModal from 'react-modal';

//*styled components used to style the components on the page
const Container = styled.div`
 display: flex;
 gap: 10px;
`
const Image = styled.img`
 border-radius: 70px;
 width: 70px;
`

const Button = styled.button`
 float: right;
 padding: 10px;
 color: #FFFFFF;
 font-size: 20px;
 font-weight: 600;
 border: none;
 width: 100px;
 height: 50px;
 border-radius: 10px;
 margin: 10px;
 background-color: #6900F2;
 cursor: pointer;
`
const Form = styled.div`
 margin: 20px;
`
const FormData = styled.div`
 display: flex;
 margin: 20px 0px;
 gap: 10px;
`


const Home  = ()=>{
    const [values, setValues] = useState({})
    const [checked, setChecked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [avatar, setavatar] = useState("");
    const [email, setEmail] = useState("");
    
    //*used for styling the modal
    const modalStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          width                 : '25%',
          height                : '20%'
    }};

    //*used to get the data from the API
    const fetchValues = async ()=>{
        const res = await axios.get('https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users')
        setValues((res.data))
        console.log((res.data)[1]);
    }
    useEffect(()=>{
        fetchValues()
    },[])

    //*handles the click on the checkbox
    const handleCheckbox = (event,index)=>{
        setValues(prevValues=>{
            const data = [...prevValues]
            const c = !data[index].check
            data[index] = {...data[index],check:c};
            return data
        })
    }

    //*creates a post request to api
    const submitform = async ()=>{
        try{
            setIsOpen(false);
            const postData = {email,avatar}
            const res = await axios.post('https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users',postData);
            console.log(res);
        }catch(error){
            console.log(error);
   console.log(error.response.data);
        }
    }

    //*gets the content from values object  by using map fucntion to display on screen
    const content  = Object.values(values).map((user,index)=>{
        return(
        <tr key={user.id}>
        <td><Checkbox checked={checked?checked:user.check} onClick={(event)=>handleCheckbox(event,index)}  /></td>
          <td>
          <Image src={user.avatar}></Image>
          </td>
          <td>{user.email}</td>
        </tr>
        )
    });

    return(
        <Container>

        {/* The Table */}
        <Table fontSize="lg" highlightOnHover>
            <thead>
                <tr>
                    <th><Checkbox checked={checked} onChange={(event)=> setChecked(!checked)}/></th>
                    <th>User</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>{content}</tbody>
        </Table>

        {/* Button to post the data */}
        <Button onClick={()=> setIsOpen(true)}>Post</Button>

        {/* Modal that displays on clicking the post button */}
        <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} shouldCloseOnOverlayClick={true} style={modalStyles}>
        <Form>
        <FormData>
        <label>Avatar url</label>
        <input type="url" 
            value={avatar}
            onChange ={(e)=>setavatar(e.target.value)}
        />
        </FormData>
        <FormData>
        <label>Email ID</label>
        <input type="url" 
            value={email}
            onChange ={(e)=>setEmail(e.target.value)}
        />
        </FormData>
        <button onClick={()=> submitform()}>Post</button>
        </Form>
        </ReactModal>

        </Container>
    )
}
export default Home