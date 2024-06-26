import Button from '@/components/Button'
import GoogleSignInButton from '@/components/GoogleSignInButton'
import TextField from '@/components/TextField'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const SignInPage = () => {
  const session = useSession()
  const router = useRouter()

  // Set up state variable for email input
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [session]);

  // Handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signIn("email", { email: email, redirect: false, callbackUrl: "/dashboard"});
      setEmailSent(true);
    } catch (error) {
      console.error('Error signing in', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className='flex flex-col md:flex-row min-h-screen overflow-hidden py-4 md:py-28 bg-white relative'>
      <Link href="/">
        <button 
          disabled={isLoading}
          className='absolute top-4 left-4 sm:top-12 sm:left-12 flex gap-2 items-center'><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M9.253 6.061a.766.766 0 0 0-.544.225L3 11.925 8.705 17.7c.145.15.342.234.553.234a.78.78 0 0 0 .788-.773v-2.888s1.003-.502 2.691-.502c1.973 0 4.894.68 8.264 3.633 0 0-1.566-7.823-10.955-7.823V6.848a.78.78 0 0 0-.778-.783c-.005-.005-.009-.005-.014-.005m0-1.406c.558 0 1.097.211 1.505.595.445.413.694.989.689 1.598V8.23c1.805.15 3.445.591 4.898 1.313a11.28 11.28 0 0 1 3.797 3.07c1.758 2.198 2.217 4.425 2.236 4.519a1.405 1.405 0 0 1-1.102 1.655 1.425 1.425 0 0 1-1.205-.319c-3.098-2.714-5.7-3.281-7.336-3.281-.431 0-.862.042-1.289.127v1.842a2.161 2.161 0 0 1-.689 1.594 2.191 2.191 0 0 1-3.057-.061l-5.704-5.775a1.405 1.405 0 0 1 .014-1.987L7.72 5.288a2.189 2.189 0 0 1 1.533-.633z"/></svg> Back
        </button>
      </Link>
      <div className='mx-auto flex w-full max-w-md flex-col px-4 sm:px-6 mt-4 md:mt-11'>
        <h1 className='text-center text-2xl font-medium tracking-tight text-black'>
          Welcome Back
        </h1>
        <p className='text-center text-base font-normal tracking-tight text-gray-500'>Enter your email to sign in to your account</p>
        {/* Display a message if email has been sent */}
        {emailSent && <p className='text-center text-green-500'>Email sent! Please check your inbox.</p>}
        <div className='sm:rounded-5xl -mx-4 flex-auto bg-white px-4 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none py-5'>
          <form>
            <div className='space-y-2'>
              <TextField
                disabled={isLoading}
                id='email'
                name='email'
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                type='email'
                placeholder='hello@me.com'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              disabled={isLoading}
              type='submit'
              variant='outline'
              color='gray'
              className={`mt-3 w-full focus:outline-none ${isLoading ? 'bg-slate-400 border-slate-400':''}`}
              onClick={handleFormSubmit}
            >
              Continue with Email
            </Button>
          </form>
          <div className='mx-auto my-5 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-400'>
            or 
          </div>
          <GoogleSignInButton isLoading={isLoading}
                setIsLoading={setIsLoading} disabled={isLoading} />
        </div>
      </div>
    </section>
  )
}

export default SignInPage
