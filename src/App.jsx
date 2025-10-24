import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Bounce, ToastContainer, toast } from 'react-toastify';

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [showAllPassword, setShowAllPassword] = useState(false)
  const [form, setform] = useState({ url: '', username: '', password: '' })
  const [passwords, setPasswords] = useState({})

  const getPasswords = async () => {
    let req = await fetch('http://localhost:3000/get')
    let data = await req.json()
    if (data.success) {
      setPasswords(data.vault)
    }
  }
  useEffect(() => {
    getPasswords()
  }, [])
  const savePassword = async () => {
    const newPasswords = {
      ...passwords,
      [form.url]: {
        ...(passwords[form.url] || {}),
        [form.username]: form.password,
      },
    };
    setPasswords(newPasswords)
    let req = await fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPasswords),
    });
    let res = await req.json();
    if (res.success === true) {
      toast.success(`Password saved successfully!`, {
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
      })
    } else {
      toast.error(`Error saving password!`, {
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
    };
    setform({ url: '', username: '', password: '' })
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copy = (type, value) => {
    console.log(value)
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
  const editPassword = (url, username) => {
    setform({ url: url, username: username, password: passwords[url][username] })
  }
  const deletePassword = async (url, username) => {
    if (confirm('Are you sure you want to delete this password?')) {
      let req = await fetch('http://localhost:3000/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url, username: username }),
      });
      let res = await req.json();
      if (res.success === true) {
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
          }
        });
        const updatedPasswords = { ...passwords };
        delete updatedPasswords[url][username];
        if (Object.keys(updatedPasswords[url]).length === 0) {
          delete updatedPasswords[url];
        }
        setPasswords(updatedPasswords);
      } else {
        toast.error(`Error saving password!`, {
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
      };
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
        <main className='flex flex-col items-center w-auto min-h-screen bg-green-200 bg-opacity-50 md:mx-35 md:my-10 rounded-2xl px-2 md:px-8 py-8 gap-5'>

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
            <div className='w-fit flex justify-center items-center'>
              <input type="text" name='url' value={form.url} onChange={handleChange} placeholder='Enter website URL...' className="px-5 py-2 border-2 border-gray-700 rounded-full w-2xs sm:w-sm md:w-3xl text-black hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
            </div>
            <div className='flex flex-col md:flex-row gap-1 relative'>
              <input type="text" name='username' value={form.username} onChange={handleChange} placeholder='Enter username...' className="px-5 py-2 border-2 border-gray-700 rounded-full w-2xs sm:w-sm text-black hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
              <input type={showPassword ? "text" : "password"} name='password' value={form.password} onChange={handleChange} placeholder='Enter password...' className="pl-5 pr-10 py-2 border-2 border-gray-700 rounded-full w-2xs sm:w-sm text-black hover:ring-2 hover:ring-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all" />
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

          <div className="passwords flex flex-col items-center gap-2 py-2 w-full">
            <div className="flex justify-between w-full md:w-2/3 items-center">
              <span className='text-md md:text-2xl font-semibold'>Your Passwords</span>
              <div className='flex items-center justify-center gap-1'>
                <button id='showAllPassword' onClick={() => setShowAllPassword(!showAllPassword)} className="flex items-center justify-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/dicvhxpz.json"
                    trigger="hover"
                    stroke="bold"
                    style={{ width: "25px", height: "25px" }}>
                  </lord-icon>
                </button>
                <label htmlFor="showAllPassword" className='w-[140px]'>{showAllPassword ? "Hide All Passwords" : "Show All Passwords"}</label>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center w-full">
              {Object.keys(passwords).length === 0 && (
                <h2 className="text-xl font-semibold text-gray-600 italic">No passwords saved yet.</h2>
              )}
              {Object.keys(passwords).map((url) => (
                <div key={url} className="w-[95vw] md:w-[50vw] bg-green-100 border border-green-300 rounded-2xl p-3 shadow-sm hover:shadow-lg hover:border-green-500 transition-all duration-300">
                  <div className="flex justify-between items-center w-full">
                    <h3 className="flex items-center text-md md:text-lg font-bold text-green-800 w-full md:w-[41vw] relative">
                      <span className="font-semibold text-gray-800 w-full md:w-5/12">Website: {url}</span>
                      <button onClick={() => copy('URL', url)} className='inline-flex justify-center items-center'>
                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          style={{ width: "18px", height: "18px" }}>
                        </lord-icon>
                      </button>
                    </h3>
                  </div>

                  {Object.keys(passwords[url]).map((username) => (
                    <div className="flex justify-between gap-2" key={username}>
                      <div className="flex flex-col md:flex-row w-full justify-between">
                        <div className="text-md text-gray-700 flex justify-between items-center w-full md:w-5/12">
                          <span className="font-medium text-green-900">Username: {username}</span>
                          <button onClick={() => copy('Username', username)} className='inline-flex justify-center items-center'>
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{ width: "18px", height: "18px" }}>
                            </lord-icon>
                          </button>
                        </div>

                        <div className="w-full md:w-5/14 flex justify-between items-center">
                          <p className="text-md text-gray-700">Password:{" "}
                            <span className="font-mono text-green-900 bg-green-200 rounded px-2 py-[2px]">{showAllPassword ? passwords[url][username] : "********"}</span>
                          </p>
                          <button onClick={() => copy('Password', passwords[url][username])} className='inline-flex justify-center items-center'>
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{ width: "18px", height: "18px" }}>
                            </lord-icon>
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <button onClick={() => editPassword(url, username)} className='inline-flex justify-center items-center'>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "18px", height: "18px" }}>
                          </lord-icon>
                        </button>
                        <button onClick={() => deletePassword(url, username)} className='inline-flex justify-center items-center'>
                          <lord-icon
                            src="https://cdn.lordicon.com/oqeixref.json"
                            trigger="hover"
                            style={{ width: "18px", height: "18px" }}>
                          </lord-icon>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </>
  )
}

export default App