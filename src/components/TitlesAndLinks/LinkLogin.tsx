import Link from 'next/link'

export function LoginLink() {
  return (
    <h3 className="mt-[60px] text-gray-500">
      Já tem conta?{' '}
      <strong className="font-bold text-purple-700 transition-all duration-200 hover:text-purple-600">
        <Link href="/user/login">Fazer login</Link>
      </strong>
    </h3>
  )
}
