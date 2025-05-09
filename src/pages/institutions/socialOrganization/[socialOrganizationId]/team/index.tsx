import { CaretDown, CaretUp, Check } from 'phosphor-react'
import DynamicHeader from '../../../../../components/header/DynamicHeader'
import { useEffect, useState } from 'react'
import { InviteForm } from '../../../../../components/instituition/painel/teams/InviteForm'
import { DeleteMember } from '../../../../../components/instituition/painel/teams/DeleteMember'
import { useRouter } from 'next/router'
import { Loading } from '../../../../../components/Loading'
import { useTeam } from '../../../../../hooks/useTeam'
import { permissionsLabels } from '../../../../../utils/roleId'
import { UserProps } from '../../../../../types/user'
import { SocialOrganizationProps } from '../../../../../types/socialOrganization'
import { invokeLambda } from '../../../../../lib/aws/invokeLambda'
import { toast } from 'react-toastify'

export default function Teams() {
  const router = useRouter()
  const { socialOrganizationId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const [socialOrganization, setSocialOrganization] =
    useState<SocialOrganizationProps | null>(null)
  const [isLoadingSocialOrganization, setIsLoadingSocialOrganization] =
    useState(true)

  const { user, users, isLoadingUser, isLoadingUsers, changePermission } =
    useTeam(organizationId)

  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [openInviteForm, setOpenInviteForm] = useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<number | null>(
    null
  )

  useEffect(() => {
    if (organizationId) {
      setIsLoadingSocialOrganization(true)
      const payload = { socialOrganizationId }
      invokeLambda<typeof payload, { statusCode: number; body: string }>(
        'social-organization-select-lambda',
        payload
      )
        .then((response) => {
          if (response.statusCode === 200) {
            const parsed = JSON.parse(response.body)
            setSocialOrganization(parsed.socialOrganization)
            setIsLoadingSocialOrganization(false)
          } else {
            toast.error('Erro ao buscar Organização Social!')
            setIsLoadingSocialOrganization(false)
          }
        })
        .catch((err) => {
          toast.error('Erro ao buscar Organização Social!')
          setIsLoadingSocialOrganization(false)
        })
    }
  }, [organizationId])

  const toggleModalDelete = (index: number) => {
    setIsOpenModalDelete((prev) => (prev === index ? null : index))
  }

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index))
  }

  const closeModalRemover = () => {
    setIsOpenModalDelete(null)
  }

  const handleInviteForm = () => {
    setOpenInviteForm((prev) => !prev)
  }

  const closeModalInvite = () => {
    setOpenInviteForm(false)
  }

  const togglePermission = (usuario: UserProps, newPermission: string) => {
    if (
      usuario.socialOrganizations &&
      usuario.socialOrganizations[0].role?.role !== newPermission
    ) {
      changePermission({ userId: usuario.id || 0, newPermission })
    }
    setOpenDropdown(null)
  }

  if (
    isLoadingUser ||
    isLoadingUsers ||
    isLoadingSocialOrganization ||
    !socialOrganization ||
    !user
  ) {
    return <Loading />
  }

  console.log(user)
  return (
    <section className="min-h-screen bg-gray-400/20">
      {openInviteForm && (
        <InviteForm
          closeModal={closeModalInvite}
          onOpenInviteForm={handleInviteForm}
          socialOrganization={socialOrganization}
        />
      )}
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
                {permissionsLabels.get(
                  user.socialOrganizations[0].role.role
                ) === 'Administrador' && (
                  <th className="px-4 py-2 text-left text-sm font-semibold">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((usuario: UserProps, index: number) => (
                <tr key={usuario.id} className="border-b border-gray-200">
                  <td className="px-4 py-3 text-sm">{usuario.fullName}</td>
                  <td className="px-4 py-3 text-sm">
                    {usuario.socialOrganizations &&
                      usuario.socialOrganizations[0].professionalRole}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {permissionsLabels.get(
                      user.socialOrganizations[0].role.role
                    ) === 'Administrador' && (
                      <div className="relative">
                        <button
                          className="flex items-center gap-2 text-sm"
                          onClick={() => toggleDropdown(index)}
                        >
                          {permissionsLabels.get(
                            (usuario.socialOrganizations &&
                              usuario.socialOrganizations[0].role?.role) ||
                              ''
                          )}{' '}
                          {openDropdown === index ? <CaretUp /> : <CaretDown />}
                        </button>
                        {openDropdown === index && (
                          <div className="absolute left-0 z-50 mt-2 w-[400px] rounded-md border bg-white shadow-lg">
                            <button
                              className={`${
                                permissionsLabels.get(
                                  (usuario.socialOrganizations &&
                                    usuario.socialOrganizations[0].role
                                      ?.role) ||
                                    ''
                                ) === 'Administrador' && 'bg-blue-400/5'
                              } flex w-full items-center justify-between p-4 text-left`}
                              onClick={() =>
                                togglePermission(
                                  usuario,
                                  'social_organization_manager'
                                )
                              }
                            >
                              <div>
                                <h1 className="font-semibold">Administrador</h1>
                                <p className="text-sm">
                                  Pode visualizar e editar informações, mudar
                                  permissões e adicionar e remover membros
                                </p>
                              </div>
                              {permissionsLabels.get(
                                (usuario.socialOrganizations &&
                                  usuario.socialOrganizations[0].role?.role) ||
                                  ''
                              ) === 'Administrador' && (
                                <Check className="text-green-500" size={24} />
                              )}
                            </button>
                            <button
                              className={`${
                                permissionsLabels.get(
                                  (usuario.socialOrganizations &&
                                    usuario.socialOrganizations[0].role
                                      ?.role) ||
                                    ''
                                ) === 'Membro' && 'bg-blue-400/5'
                              } flex w-full items-center justify-between p-4 text-left`}
                              onClick={() =>
                                togglePermission(
                                  usuario,
                                  'social_organization_member'
                                )
                              }
                            >
                              <div>
                                <h1 className="font-semibold">Membro</h1>
                                <p className="text-sm">
                                  Pode visualizar e editar informações
                                </p>
                              </div>
                              {permissionsLabels.get(
                                (usuario.socialOrganizations &&
                                  usuario.socialOrganizations[0].role?.role) ||
                                  ''
                              ) === 'Membro' && (
                                <Check className="text-green-500" size={20} />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {permissionsLabels.get(
                      user.socialOrganizations[0].role.role
                    ) === 'Membro' && (
                      <span className="text-gray-500">
                        {permissionsLabels.get(
                          (usuario.socialOrganizations &&
                            usuario.socialOrganizations[0].role?.role) ||
                            ''
                        )}
                      </span>
                    )}
                  </td>
                  {permissionsLabels.get(
                    user.socialOrganizations[0].role.role
                  ) === 'Administrador' && (
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => toggleModalDelete(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remover
                      </button>

                      {isOpenModalDelete === index && (
                        <DeleteMember
                          closeModal={closeModalRemover}
                          memberName={usuario.fullName || ''}
                          userId={usuario.id || 0}
                          socialOrganizationId={organizationId}
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
