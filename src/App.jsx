import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setform] = useState({})
  const [passwords, setPasswords] = useState({})

  useEffect(() => {
    let pass = localStorage.getItem('passwords')
    if (pass) {
      setPasswords(JSON.parse(pass))
    }
  }, [])
  const savePassword = () => {
    setPasswords({ ...passwords, [form.url]: form })
    localStorage.setItem('passwords', JSON.stringify({ ...passwords, [form.url]: form }))
    alert('Password saved!')
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="App">
      <Navbar></Navbar>
      <main className='flex flex-col items-center w-auto min-h-screen bg-green-200 bg-opacity-50 mx-35 my-10 rounded-2xl p-8 gap-5'>

        <div className='flex flex-col items-center'>
          <div className='flex justify-center'>
            <lord-icon
              src="https://cdn.lordicon.com/fgxwhgfp.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "35px", height: "35px" }}>
            </lord-icon>
            <h1 className="text-3xl font-bold text-green-900">Pass</h1>
            <h1 className="text-3xl font-bold text-gray-800">Vault </h1>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Your passwords manager</h3>
        </div>

        <div className='flex flex-col gap-2 items-center'>
          <div className='w-full'>
            <input type="text" name='url' value={form.url} onChange={handleChange} placeholder='Enter website URL...' className="px-5 py-2 border-2 border-gray-700 rounded-full w-3xl text-black hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
          </div>
          <div className='flex gap-1 relative'>
            <input type="text" name='username' value={form.username} onChange={handleChange} placeholder='Enter username...' className="px-5 py-2 border-2 border-gray-700 rounded-full w-sm text-black hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
            <input type="text" name='password' value={form.password} onChange={handleChange} placeholder='Enter password...' className="pl-5 pr-10 py-2 border-2 border-gray-700 rounded-full w-sm text-black hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5">
              <lord-icon
                src="https://cdn.lordicon.com/dicvhxpz.json"
                trigger="hover"
                stroke="bold"
                style={{ width: "25px", height: "25px" }}>
              </lord-icon>
            </button>
          </div>
          <button onClick={savePassword} className="flex items-center border border-b-emerald-900 px-5 py-2 bg-green-500 rounded-full w-fit text-black hover:ring-2 hover:ring-green-400 active:bg-green-600 transition-all">
            <lord-icon
              src="https://cdn.lordicon.com/gzqofmcx.json"
              trigger="hover"
              style={{ width: "25px", height: "25px" }}>
            </lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords flex flex-col items-center gap-2 py-2">
          {Object.keys(passwords).length === 0 && (
            <h2 className="text-xl font-semibold text-gray-600 italic">No passwords saved yet.</h2>
          )}
          {Object.keys(passwords).map((key) => (
            <div key={key} className="w-xl bg-green-100 border border-green-300 rounded-2xl p-3 shadow-sm hover:shadow-lg hover:border-green-500 transition-all duration-300">
              <h3 className="text-lg font-bold text-green-800">Website:{" "}
                <span className="font-semibold text-gray-800">{passwords[key].url}</span>
              </h3>
              <div className="flex relative">
              <p className="text-md text-gray-700">Username:{" "}
                <span className="font-medium text-green-900">{passwords[key].username}</span>
              </p>
              <p className="text-md text-gray-700 absolute left-85">Password:{" "}
                <span className="font-mono text-green-900 bg-green-200 rounded px-2 py-[2px]">{showPassword ? passwords[key].password : "********"}</span>
              </p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}

export default App
