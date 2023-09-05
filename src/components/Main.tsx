/* eslint-disable @next/next/no-img-element */

export default function Main() {
  return (
    <div className="relative h-screen w-full">
      <img
        className="relative h-full w-full bg-cover bg-no-repeat"
        src="/images/background-login.png"
        alt=""
      />
      <img
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  rounded-2xl bg-black/20 p-14 backdrop-blur-md"
        src="/images/logo.png"
        alt="Logo"
      />
    </div>
  )
}
