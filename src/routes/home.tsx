
import { ChangeEvent, FormEvent, useState } from 'react'
import reactLogo from '.././assets/react.svg'
import { signInUser } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import '.././App.css'

const defaultFormFields = {
  email: '',
  password: '',
}

function Home() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const navigate = useNavigate()

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // Send the email and password to firebase
      const userCredential = await signInUser(email, password)

      if (userCredential) {
        resetFormFields()
        navigate('/profile')
      }
    } catch (error:any) {
      console.log('User Sign In Failed', error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value })
  }

  return(
    <div className="App">
      <div className="card">
        <div className='logo-react'>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
