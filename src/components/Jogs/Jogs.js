import React, {useEffect, useState} from "react";
import axios from 'axios';
import './Jogs.css';
import icon from '../../images/icon.png';
import add from '../../images/add.png';
import {Modal, Form} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import sad from '../../images/sad.png';

const Jogs = (props) => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('')
    const [refresh, setRefrash] = useState(false);
    const [dateFrom, setDateFrom] = useState(null)
    const [dateTo, setDateTo] = useState(null);

    useEffect(() => {
        axios.get('https://jogtracker.herokuapp.com/api/v1/data/sync',
            {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
                setData(res.data.response.jogs)
            })
    }, [refresh])
    const sendData = () => {
        const body = new FormData();
        body.append('date', date);
        body.append('time', time);
        body.append('distance', distance);
        axios.post('https://jogtracker.herokuapp.com/api/v1/data/jog', body, {headers: {Authorization: localStorage.getItem('token')}})
            .then(() => {
                setRefrash(!refresh)
                setDistance('');
                setDate('');
                setTime('')
            })
    }

    const deleteJog = (item) => {
        const body = new FormData();
        body.append('jog_id', item.id)
        body.append('user_id', item.user_id);
        /*axios.delete('https://jogtracker.herokuapp.com/api/v1/data/jog', {headers: {Authorization: localStorage.getItem('token')}} , body)*/
        fetch('https://jogtracker.herokuapp.com/api/v1/data/jog', {
            method: 'DELETE',
            headers: {Authorization: localStorage.getItem('token')},
            body: body
        })
            .then(() => {
                setRefrash(!refresh)
            })
        console.log(item)
    }

    const jogItem = (item,index, date) => {
        let month =  date.getMonth() + 1
        month = month < 10 ? '0' + month : month;

        return (
            <div key={index} className={'jogs-content__item'}>
                <img src={icon} alt={icon} className={'jogs-img'}/>
                <div className={'jogs-content__item_data'}>
                    <p className={'date'}>{date.getDate()}.{month}.{date.getFullYear()}
                    <span style={{paddingLeft: '20px', cursor: 'pointer'}} onClick={() => {deleteJog(item)}}>X</span></p>
                    <p className={'jogs-p-data'}>Speed: 15</p>
                    <p className={'jogs-p-data'}>Distance: {item.distance} km</p>
                    <p className={'jogs-p-data'}>Time: {item.time} min</p>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            {props.filter ?
                <div className={'jogs-navigation'}>
                    <label htmlFor="date-from">Date from</label>
                    <DatePicker selected={dateFrom} onChange={date => setDateFrom(date)} isClearable />
                    <label htmlFor="date-to">Date to</label>
                    <DatePicker selected={dateTo} onChange={date => setDateTo(date)} isClearable />
                </div>
                : ''
            }

            <div className={'jogs-content'}>
                {data.map((item, index) => {
                    const date = new Date(item.date * 1000);
                    let fromFilter = dateFrom !== null;
                    let toFilter = dateTo !== null;
                    let fullFilter = dateFrom !== null && dateTo !== null
                    if (fullFilter && date >= dateFrom && date <= dateTo ) return jogItem(item,index, date);
                    else if (fromFilter && !toFilter && date >= dateFrom) return jogItem(item,index, date);
                    else if (toFilter && !fromFilter && date <= dateTo) return jogItem(item,index, date)
                    else if (!toFilter && !fromFilter && !fullFilter) return jogItem(item,index, date)
                })}
                {data.length === 0 ?
                    <div className={'empty-jogs'}>
                        <img src={sad} alt={sad} />
                        <h3 style={{marginTop: '47px'}}>Nothing is there</h3>
                    </div>
                    :
                    ''}
            </div>
            {data.length > 0 ? <img className={'add-btn'} onClick={() => {setShowModal(true)}} src={add} alt={add}/> :
            <button className={'add-first-jog'} onClick={() => {setShowModal(true)}}>Create your jog first</button>
            }
            <Modal
                centered
                show={showModal}
                className={'add-modal'}
                onHide={() => setShowModal(false)}>
                <Modal.Header closeButton={true}> </Modal.Header>
                    <Modal.Body id="example-modal-sizes-title-sm">
                        <Form className="select-form">
                            <div style={{marginBottom: '20px'}}>
                                <label htmlFor="distance">Distance</label>
                                <input value={distance}
                                       onChange={(event) => {setDistance(event.target.value)}}
                                       className={'modal-input'} id="distance"/>
                            </div>
                            <div style={{marginBottom: '20px'}}>
                                <label htmlFor="time">Time</label>
                                <input value={time} onChange={(event) => {setTime(event.target.value)}}
                                    className={'modal-input'} id="time"/>
                            </div>
                            <div style={{marginBottom: '20px'}}>
                                <label htmlFor="date">Date</label>
                                <input value={date} onChange={(event) => {setDate(event.target.value)}}
                                    className={'modal-input'} id="date"/>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer style={{margin: 'auto'}}>
                        <button className={'save-btn'} onClick={()=>{
                            setShowModal(false)
                            sendData()
                        }}>Save</button>
                    </Modal.Footer>

            </Modal>
            {props.open ?
                <HamburgerMenu updateOpen={props.updateOpen} open={props.open}/>
                : ''
            }
        </React.Fragment>
    )
}

export default Jogs;