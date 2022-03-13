import React, { useState } from 'react'
//import { Link } from 'gatsby'
import axios from 'axios'
import Layout from '../components/layout'
import Seo from '../components/seo'
import '../styles.scss'

const ContactPage = () => {
  const [isHidden, setisHidden] = useState(false)
  const [isDisabled, setisDisabled] = useState(false)
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  })
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    })
    if (ok) {
      form.reset()
      setisHidden(!isHidden)
      setisDisabled(!isDisabled)
    }
  }
  const handleOnSubmit = e => {
    e.preventDefault()
    const form = e.target
    setServerState({ submitting: true })
    axios({
      method: 'post',
      url: 'https://getform.io/f/ede8d538-0d23-44d3-ae26-a9a0111997fe',
      data: new FormData(form),
    })
      .then(r => {
        handleServerResponse(true, 'Thanks!', form)
      })
      .catch(r => {
        handleServerResponse(false, r.response.data, form)
      })
  }
  console.log(serverState)
  return (
    <Layout>
      <Seo description="How to get in touch with us" title="Contact" />
      <h1 className="title is-size-2">Contact</h1>
      <div className="section px-0">
        <form onSubmit={handleOnSubmit}>
          <div className={`field ${isHidden ? 'is-hidden' : ''}`}>
            <label className="label" for="email">
              Email
            </label>
            <div className="control">
              <input
                className="input"
                name="email"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className={`field ${isHidden ? 'is-hidden' : ''}`}>
            <label className="label" for="name">
              Name
            </label>
            <div className="control">
              <input
                className="input"
                name="name"
                type="text"
                placeholder="e.g Alex Smith"
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className={`field ${isHidden ? 'is-hidden' : ''}`}>
            <label className="label" for="message">
              Message
            </label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Textarea"
                type="text"
                name="message"
                disabled={isDisabled}
              ></textarea>
            </div>
          </div>
          <article className={`message is-info ${isHidden ? '' : 'is-hidden'}`}>
            <div className="message-header">
              <p>Success</p>
            </div>
            <div className="message-body">
              Thanks for getting in touch. We'll get back to you really soon!
            </div>
          </article>
          <button
            className={`button is-success ${isHidden ? 'is-hidden' : ''}`}
            type="submit"
            disable={isDisabled}
          >
            Send
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ContactPage
