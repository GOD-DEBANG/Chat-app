import React, { useState } from 'react'
import assets from '../assets/assets'

const Loginpage = () => {
  const [currState, setCurrState] = useState("Sign Up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true)   // ✅ FIXED
      return
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img src={assets.logo_big} alt="App Logo" className="w-[min(30vw,250px)]" />

      <form 
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/10 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[90%] max-w-md"
      >
        {/* Title */}
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt="Back"
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {/* Full Name (only in Sign Up before bio step) */}
        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
            required
          />
        )}

        {/* Email & Password */}
        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="p-2 border border-gray-500 rounded-md bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email Address"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="p-2 border border-gray-500 rounded-md bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Password"
              required
            />
          </>
        )}

        {/* Bio (only after sign-up step 2) */}
        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md bg-transparent placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a short bio..."
          ></textarea>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="py-3 w-full bg-gradient-to-r from-purple-400 via-violet-500 to-purple-700 text-white rounded-xl font-medium tracking-wide shadow-lg shadow-purple-900/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-purple-500 hover:via-violet-600 hover:to-purple-800"
        >
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        {/* Terms Checkbox */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <input type="checkbox" className="accent-violet-500" />
          <p>
            By logging in, you agree to our <span className="text-violet-400 cursor-pointer">Terms & Conditions</span> and <span className="text-violet-400 cursor-pointer">Privacy Policy</span>.
          </p>
        </div>

        {/* Toggle Login / Sign Up */}
        <div className="flex flex-col gap-2">
          {currState === "Sign Up" ? (
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <span
                onClick={() => { setCurrState("LogIn"); setIsDataSubmitted(false) }}
                className="font-medium text-violet-400 cursor-pointer hover:underline"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Create an account{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="font-medium text-violet-400 cursor-pointer hover:underline"
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Loginpage
