import { Layout } from "components/layout"
import Spinner from "components/spinner"
import { Input } from "components/ui/input"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { Label } from "../../components/ui/label"

type FormInput = {
  fullName: string
  email: string
}

const RegistrationPage = () => {
  const router = useRouter()
  const pathname = router.pathname
  const { data: sessionData } = useSession()

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (sessionData && sessionData.expires) {
      router.push("/").catch((err) => {
        console.log(err)
      })
    }
    if (sessionData && pathname === "/register") {
      router.push("/").catch((err) => {
        console.log(err)
      })
    }
    if (success) {
      router.push("/tickets/new").catch((err) => {
        console.log(err)
      })
    }
  }, [pathname, router, sessionData, success])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>()

  const handleFormSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data, " || form submitted")
    setSuccess(true)
  }

  const handleAuth = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (sessionData) {
      await signOut()
    } else {
      await signIn()
    }
  }

  return (
    <Layout>
      {success ? (
        <section className="min-w-3xl my-4 mx-auto rounded bg-transparent p-3 text-center">
          <h1 className="text-slate-800 dark:text-white">Success!</h1>
          <Spinner />
        </section>
      ) : (
        <section className="my-4 mx-auto max-w-3xl rounded p-3">
          <h1 className="text-red-800">Register Account</h1>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <section className="my-4 mx-auto max-w-3xl rounded p-3 shadow sm:rounded-md">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                type="text"
                placeholder="Name"
                {...register("fullName", { required: true })}
              />
              <span className="mb-4 flex h-6">
                {errors.fullName && (
                  <p className="m-0 text-red-500">Full name is required</p>
                )}
              </span>

              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <span className="mb-4 flex h-6">
                {errors.email && (
                  <p className="m-0 text-red-500">Email Address is required</p>
                )}
              </span>

              <div className="my-3 rounded p-5 lg:my-8">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-300 dark:text-slate-900 dark:hover:bg-[hsl(272,82%,45%)]/20 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
                  Sign Up
                </button>
              </div>
            </section>
          </form>

          <div className="my-3 rounded p-5 lg:my-8">
            <button
              onClick={handleAuth}
              className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-transparent px-8 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-[hsl(272,82%,45%)]/20 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800">
              Sign In
            </button>
          </div>
        </section>
      )}
    </Layout>
  )
}
export default RegistrationPage
