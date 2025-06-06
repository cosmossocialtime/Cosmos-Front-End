import { CaretDown, CaretUp, Check } from 'phosphor-react'
import { UserProps } from '../../../../types/user'
import { permissionsLabels } from '../../../../utils/roleId'

type PermissionDropdownProps = {
  usuario: UserProps
  user: UserProps
  isOpen: boolean
  index: number
  adminCount: number
  toggleDropdown: () => void
  togglePermission: (usuario: UserProps, roleValue: string) => void
}
export function PermissionDropdown({
  usuario,
  user,
  isOpen,
  toggleDropdown,
  index,
  togglePermission,
  adminCount,
}: PermissionDropdownProps) {
  const currentRole =
    usuario.socialOrganizations &&
    permissionsLabels.get(usuario.socialOrganizations[0].role?.role || '')

  const isOnlyAdmin =
    currentRole === 'Administrador' &&
    adminCount === 1 &&
    usuario.id === user.id

  if (isOnlyAdmin) {
    return <span className="text-gray-500">{currentRole}</span>
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 text-sm"
        onClick={toggleDropdown}
      >
        {currentRole} {isOpen ? <CaretUp /> : <CaretDown />}
      </button>
      {isOpen && (
        <div className="absolute left-0 z-50 mt-2 w-[400px] rounded-md border bg-white shadow-lg">
          {['Administrador', 'Membro'].map((roleLabel) => {
            const roleValue =
              roleLabel === 'Administrador'
                ? 'social_organization_manager'
                : 'social_organization_member'

            return (
              <button
                key={roleValue}
                onClick={() => togglePermission(usuario, roleValue)}
                className={`${
                  currentRole === roleLabel ? 'bg-blue-400/5' : ''
                } flex w-full items-center justify-between p-4 text-left`}
              >
                <div>
                  <h1 className="font-semibold">{roleLabel}</h1>
                  <p className="text-sm">
                    {roleLabel === 'Administrador'
                      ? 'Pode visualizar e editar informações, mudar permissões e adicionar e remover membros'
                      : 'Pode visualizar e editar informações, e adicionar membros'}
                  </p>
                </div>
                {currentRole === roleLabel && (
                  <Check className="text-green-500" size={24} />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
