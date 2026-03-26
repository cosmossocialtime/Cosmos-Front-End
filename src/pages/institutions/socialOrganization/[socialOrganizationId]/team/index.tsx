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
import { toast } from 'react-toastify'
import { PermissionDropdown } from '../../../../../components/instituition/painel/teams/PermissionDropdown'
import { api } from '../../../../../services/api'

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
  const adminCount =
    users &&
    users.filter(
      (u: UserProps) =>
        permissionsLabels.get(
          (u.socialOrganizations && u.socialOrganizations[0].role?.role) || ''
        ) === 'Administrador'
    ).length

  useEffect(() => {
    if (organizationId) {
      setIsLoadingSocialOrganization(true)
      const payload = { socialOrganizationId }
      api
        .get('/social-organization', {
          params: payload,
        })
        .then((response) => {
          if (response.status === 200) {
            const parsed = response.data
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

  const toggleModalDelete = (index: number, usuario: UserProps) => {
    const currentRole =
      usuario.socialOrganizations &&
      permissionsLabels.get(usuario.socialOrganizations[0].role?.role || '')
    const isOnlyAdmin =
      currentRole === 'Administrador' &&
      adminCount === 1 &&
      usuario.id === user.id
    if (!isOnlyAdmin) {
      setIsOpenModalDelete((prev) => (prev === index ? null : index))
    }
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

  return (
    <section className="min-h-screen bg-gray-400/20">
      {openInviteForm && (
        <InviteForm
          closeModal={closeModalInvite}
          onOpenInviteForm={handleInviteForm}
          socialOrganization={socialOrganization}
          requestMemberName={user.fullName}
        />
      )}
      <DynamicHeader />
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base text-gray-600">Equipe</h2>
          <button
            onClick={handleInviteForm}
            className="rounded-md bg-violet-600 px-6 py-2 text-white"
          >
            + Convidar pessoas
          </button>
        </div>

        <div>
          <table className="min-w-full table-auto rounded-lg bg-white shadow-lg">
            <thead>
              <tr className="border border-l-0 border-r-0 border-t-0 border-solid border-gray-200 p-4">
                <th className="px-8 py-6 text-left text-sm font-semibold">
                  Nome
                </th>
                <th className="px-8 py-6 text-left text-sm font-semibold">
                  Cargo
                </th>
                <th className="px-8 py-6 text-left text-sm font-semibold">
                  Permissões
                </th>
                {permissionsLabels.get(
                  user.socialOrganizations[0].role.role
                ) === 'Administrador' && (
                  <th className="px-8 py-6 text-left text-sm font-semibold">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((usuario: UserProps, index: number) => (
                <tr
                  key={usuario.id}
                  className="border border-l-0 border-r-0 border-t-0 border-solid border-gray-200 p-4 last:border-b-0"
                >
                  <td className="px-8 py-6 text-sm">{usuario.fullName}</td>
                  <td className="px-8 py-6 text-sm">
                    {usuario.socialOrganizations &&
                      usuario.socialOrganizations[0].professionalRole}
                  </td>
                  <td className="px-8 py-6 text-sm">
                    {permissionsLabels.get(
                      user.socialOrganizations[0].role.role
                    ) === 'Administrador' ? (
                      <PermissionDropdown
                        usuario={usuario}
                        user={user}
                        isOpen={openDropdown === index}
                        toggleDropdown={() => toggleDropdown(index)}
                        index={index}
                        togglePermission={togglePermission}
                        adminCount={adminCount}
                      />
                    ) : (
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
                  ) === 'Administrador' &&
                    usuario.id !== user.id && (
                      <td className="px-8 py-6 text-sm">
                        <button
                          onClick={() => toggleModalDelete(index, usuario)}
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
