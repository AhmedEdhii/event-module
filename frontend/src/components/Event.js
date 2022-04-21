import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/MetaData'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../actions/eventActions'

const Event = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, events, error } = useSelector(state => state.events)

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        //alert.success('Success')
        dispatch(getEvents());
    }, [dispatch, alert, error])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'All Events'} />
                    <h1 id="heading">All Events</h1>
                    <section className="container mt-5">
                        <div className="row">
                            {events && events.map(event => (
                                    <div class="twoColumn">
                                        <img src={event.event_image_thumb} class="thumb"></img>
                                        <span className="dtl"> {event.event_title}</span>
                                        <span className="dtl"> {event.event_subtext}</span>
                                        <span className="dtl"> Fee : {event.event_fee}</span>
                                        <a className="ebutton ml-5" href={`${event.event_apply_new_url}`}>
                                            Apply here
                                        </a>
                                        <Link to={`/event/${event.event_title}`} id="details" className="ebutton ml-3" > View Details </Link>
                                    </div>
                            ))}
                        </div>
                    </section>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Event