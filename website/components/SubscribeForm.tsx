import axios from 'axios'
import { useState } from 'react'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import Spinner from './Spinner'

export default function SubscribeForm() {
  const [isDone, setDone] = useState(false)
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: ''
      },
      validationSchema: object({
        email: string()
          .email('Invalid email address')
          .required('Email is required')
      }),
      validateOnChange: false,
      onSubmit: (values, { setSubmitting }) => {
        apiSubscribe(values.email).then(() => {
          setDone(true)
          setSubmitting(false)
        })
      }
    })

  const classNames = [
    'relative flex justify-between px-1 pr-3 py-4 bg-white rounded',
    errors.email ? 'border-2 border-red-500' : 'border border-black'
  ].join(' ')

  if (isDone) {
    return (
      <p className="text-xl font-bold text-center p-5 bg-white bg-opacity-50 rounded">
        Thanks, you've been added to our mailing list
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-center md:text-left font-bold mb-2">
        Subscribe to our mailing list
      </h3>
      <div className={classNames}>
        <input
          disabled={isSubmitting}
          type="text"
          name="email"
          className={'p-2 rounded outline-none bg-transparent'}
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
        />
        <button
          type="submit"
          className={`px-3 rounded ${
            errors.email ? 'bg-red-500' : 'bg-black'
          } text-white`}
        >
          {isSubmitting ? <Spinner /> : 'Subscribe'}
        </button>
      </div>
      {errors.email && <p className="text-red-500 p-2">{errors.email}</p>}
    </form>
  )
}

async function apiSubscribe(email: string) {
  return axios.post('/api/subscribe', {
    email
  })
}
