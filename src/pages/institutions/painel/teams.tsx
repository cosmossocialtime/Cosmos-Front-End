import { CaretDown, CaretUp, Check } from 'phosphor-react'
import DynamicHeader from '../../../components/main-painel/DynamicHeader'
import { useState } from 'react'
import { InviteForm } from '../../../components/instituition/painel/teams/InviteForm'
import { DeleteMember } from '../../../components/instituition/painel/teams/DeleteMember'

export default function Teams() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [openInviteForm, setOpenInviteForm] = useState<boolean>(false)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Rafael Francisco',
      role: 'Desenvolvedor',
      permission: 'Administrador',
    },
    { id: 2, name: 'Maria Gomes', role: 'Designer', permission: 'Membro' },
    { id: 3, name: 'Hannah Montana', role: 'Cantora', permission: 'Membro' },
    {
      id: 4,
      name: 'Juliana Tartarini',
      role: 'Desenvolvedora',
      permission: 'Membro',
    },
  ])

  const [isOpenModalDelete, setisOpenModalDelete] = useState<number | null>(
    null,
  )

  const toggleModalDelete = (index: number) => {
    setisOpenModalDelete((prev) => (prev === index ? null : index))
  }

  // Substituir pela lógica de session
  const logado = {
    id: 4,
    name: 'Juliana Tartarini',
    role: 'Desenvolvedora',
    permission: 'Administrador',
  }

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index))
  }

  const togglePermission = (index: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index
          ? {
              ...user,
              permission:
                user.permission === 'Administrador'
                  ? 'Membro'
                  : 'Administrador',
            }
          : user,
      ),
    )
    setOpenDropdown(null) // Fechar o dropdown após a troca de permissão
  }

  const handleInviteForm = () => {
    setOpenInviteForm((prev) => !prev)
  }

  const handleRemoveMember = () => {
    setisOpenModalDelete(null)
  }

  return (
    <section className="min-h-screen bg-gray-400/20">
      {openInviteForm && <InviteForm onOpenInviteForm={handleInviteForm} />}
      <DynamicHeader />
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-500">Equipe</h2>
          <button
            onClick={handleInviteForm}
            className="rounded-md bg-violet-600 px-6 py-2 text-white"
          >
            + Convidar pessoas
          </button>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Nome
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Cargo
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Permissões
                </th>
                {logado.permission === 'Administrador' && (
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="px-4 py-3 text-sm">{user.name}</td>
                  <td className="px-4 py-3 text-sm">{user.role}</td>
                  <td className="px-4 py-3 text-sm">
                    {/* Verifica se o usuário logado não é o mesmo que o da linha */}
                    {logado.permission === 'Administrador' && (
                      <div className="relative">
                        <button
                          className="flex items-center gap-2 text-sm"
                          onClick={() => toggleDropdown(index)}
                        >
                          {user.permission}{' '}
                          {openDropdown === index ? <CaretUp /> : <CaretDown />}
                        </button>
                        {openDropdown === index && (
                          <div className="absolute left-0 z-50 mt-2 w-[400px] rounded-md border bg-white shadow-lg">
                            <button
                              className={`${
                                user.permission === 'Administrador' &&
                                'bg-blue-400/5'
                              } flex w-full items-center justify-between p-4 text-left`}
                              onClick={() => togglePermission(index)}
                            >
                              <div>
                                <h1 className="font-semibold">Administrador</h1>
                                <p className="text-sm">
                                  Pode visualizar e editar informações, mudar
                                  permissões e adicionar e remover membros
                                </p>
                              </div>
                              {user.permission === 'Administrador' && (
                                <Check className="text-green-500" size={24} />
                              )}
                            </button>
                            <button
                              className={`${
                                user.permission === 'Membro' && 'bg-blue-400/5'
                              } flex w-full items-center justify-between p-4 text-left`}
                              onClick={() => togglePermission(index)}
                            >
                              <div>
                                <h1 className="font-semibold">Membro</h1>
                                <p className="text-sm">
                                  Pode visualizar e editar informações
                                </p>
                              </div>
                              {user.permission === 'Membro' && (
                                <Check className="text-green-500" size={20} />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {logado.permission === 'Membro' && (
                      <span className="text-gray-500">{user.permission}</span>
                    )}
                  </td>
                  {logado.permission === 'Administrador' && (
                    <td className="px-4 py-3 text-sm">
                      {/* Verifica se o usuário logado é ele mesmo ou se é administrador */}
                      <button
                        onClick={() => toggleModalDelete(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remover
                      </button>

                      {isOpenModalDelete === index && (
                        <DeleteMember
                          closeModal={handleRemoveMember}
                          memberName={user.name}
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
