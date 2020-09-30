import React,{useState, useEffect} from "react";
import './LetMeIn.css';
import face from '../../images/bear-face.png';
import face_mobile from '../../images/bearFace_mobile.png';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

const LetMeIn = (props) => {
    const [flag, setFlag] = useState(false);

    useEffect(() => {

    }, [document.documentElement.clientWidth])
    const sendRequest = () => {
        const body = new FormData()
        body.append('uuid', 'hello');
        axios.post('https://jogtracker.herokuapp.com/api/v1/auth/uuidLogin', body)
            .then(res => {
                localStorage.setItem('token', 'Bearer ' + res.data.response.access_token);
                localStorage.setItem('fullNav', '1');
                setFlag(true);
            })

    }

    if (flag) return <Redirect to={'/jogs'}/>
    return (
        <React.Fragment>
            {!props.open ?
                <div className={'wrapper'}>
                    <div className={'Rectangle-3'}>
                        {document.documentElement.clientWidth <= 960 ?
                            <img src={face_mobile} alt={face_mobile}/>
                            : <img src={face} alt={face}/>
                        }
                        <button className={'btn-let-me-in'} onClick={sendRequest}>Let me in</button>
                    </div>
                </div>
                : ''
            }

            {props.open ?
                <HamburgerMenu updateOpen={props.updateOpen} open={props.open}/>
                : ''
            }
        </React.Fragment>
    )
}

export default LetMeIn;