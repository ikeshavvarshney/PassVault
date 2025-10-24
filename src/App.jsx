import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Bounce, ToastContainer, toast } from 'react-toastify';

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [showAllPassword, setShowAllPassword] = useState(false)
  const [form, setform] = useState({url: '', username: '', password: ''})
  const [passwords, setPasswords] = useState({})

  useEffect(() => {
    let pass = localStorage.getItem('passwords')
    if (pass) {
      setPasswords(JSON.parse(pass))
    }
  }, [])
  const savePassword = () => {
    console.log(form)
    setPasswords({ ...passwords, [form.url]: form })
    localStorage.setItem('passwords', JSON.stringify({ ...passwords, [form.url]: form }))
    alert('Password saved!')
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copy = (type, value) => {
    navigator.clipboard.writeText(value);
    toast.success(`${type} copied to clipboard!`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Bounce,
      style: {
        background: "#10B981",
        color: "#fff",
        fontWeight: "500",
        borderRadius: "10px",
      },
    });
  }
  const editPassword = (url) => {
    setform(passwords[url])
  }
  const deletePassword = (url) => {
    if (confirm('Are you sure you want to delete this password?')) {
      const newPasswords = { ...passwords }
      delete newPasswords[url]
      setPasswords(newPasswords)
      localStorage.setItem('passwords', JSON.stringify(newPasswords))
      toast.success(`Password deleted!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
        style: {
          background: "#EF4444",
          color: "#fff",
          fontWeight: "500",
          borderRadius: "10px",
        },
      });
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
              <input type={showPassword ? "text" : "password"} name='password' value={form.password} onChange={handleChange} placeholder='Enter password...' className="pl-5 pr-10 py-2 border-2 border-gray-700 rounded-full w-sm text-black hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5">
                <lord-icon
                  src="https://cdn.lordicon.com/dicvhxpz.json"
                  trigger="hover"
                  stroke="bold"
                  style={{ width: "25px", height: "25px" }}>
                </lord-icon>
              </button>
            </div>
            <button onClick={() => {
              (form.url && form.username && form.password) ? savePassword() :
                toast.error(`Can't save empty fields!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Bounce,
                });
            }} className="flex gap-1 items-center border border-b-emerald-900 px-5 py-2 bg-green-500 rounded-full w-fit text-black hover:ring-2 hover:ring-green-400 active:bg-green-600 transition-all">
              <lord-icon
                src="https://cdn.lordicon.com/gzqofmcx.json"
                trigger="hover"
                style={{ width: "25px", height: "25px" }}>
              </lord-icon>
              Save Password
            </button>
          </div>

          <div className="passwords flex flex-col items-center gap-2 py-2">
            <div className="flex justify-between w-full items-center">
              <span className='text-2xl font-semibold'>Your Passwords</span>
              <div className='flex items-center justify-center gap-1'>
                <button id='showAllPassword' onClick={() => setShowAllPassword(!showAllPassword)} className="flex items-center justify-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/dicvhxpz.json"
                    trigger="hover"
                    stroke="bold"
                    style={{ width: "25px", height: "25px" }}>
                  </lord-icon>
                </button>
                <label htmlFor="showAllPassword" className='w-[170px]'>{showAllPassword ? "Hide All Passwords" : "Show All Passwords"}</label>
              </div>
            </div>
            {Object.keys(passwords).length === 0 && (
              <h2 className="text-xl font-semibold text-gray-600 italic">No passwords saved yet.</h2>
            )}
            {Object.keys(passwords).map((key) => (
              <div key={key} className="w-[50vw] bg-green-100 border border-green-300 rounded-2xl p-3 shadow-sm hover:shadow-lg hover:border-green-500 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <h3 className="flex items-center text-lg font-bold text-green-800 w-[45vw] relative">
                    <span className="font-semibold text-gray-800 w-1/2">Website: {passwords[key].url}</span>
                    <button onClick={() => copy('URL', passwords[key].url)} className='inline-flex justify-center items-center'>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: "18px", height: "18px" }}>
                      </lord-icon>
                    </button>
                  </h3>

                  <div className="flex gap-1">
                    <button onClick={() => editPassword(passwords[key].url)} className='inline-flex justify-center items-center'>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ width: "18px", height: "18px" }}>
                      </lord-icon>
                    </button>
                    <button onClick={() => deletePassword(passwords[key].url)} className='inline-flex justify-center items-center'>
                      <lord-icon
                        src="https://cdn.lordicon.com/oqeixref.json"
                        trigger="hover"
                        style={{ width: "18px", height: "18px" }}>
                      </lord-icon>
                    </button>
                  </div>

                </div>
                <div className="flex justify-between">
                  <p className="text-md text-gray-700 flex justify-between items-center w-1/2">
                    <span className="font-medium text-green-900">Username: {passwords[key].username}</span>
                    <button onClick={() => copy('Username', passwords[key].username)} className='inline-flex justify-center items-center'>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: "18px", height: "18px" }}>
                      </lord-icon>
                    </button>
                  </p>
                  <div className=" w-5/12 flex justify-between items-center">
                    <p className="text-md text-gray-700">Password:{" "}
                      <span className="font-mono text-green-900 bg-green-200 rounded px-2 py-[2px]">{showAllPassword ? passwords[key].password : "********"}</span>
                    </p>
                    <button onClick={() => copy('Password', passwords[key].password)} className='inline-flex justify-center items-center'>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: "18px", height: "18px" }}>
                      </lord-icon>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
