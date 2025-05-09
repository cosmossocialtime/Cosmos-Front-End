import { useState } from 'react'
import DynamicHeader from '../../../../../components/header/DynamicHeader'
import { useRouter } from 'next/router'
import { useKeenSlider } from 'keen-slider/react'
import { CaretLeft, CaretRight, Check } from 'phosphor-react'
import { invokeLambda } from '../../../../../lib/aws/invokeLambda'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { UserSocialOrganizationProps } from '../../../../../types/userSocialOrganization'
import Link from 'next/link'
import { Loading } from '../../../../../components/Loading'

export default function ChangeOrganizationPage() {
  const router = useRouter()
  const { socialOrganizationId } = router.query
  const organizationId = Number(socialOrganizationId || '0')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [hasShownError, setHasShownError] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 4,
      spacing: 8,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 2, spacing: 8 },
      },
      '(max-width: 768px)': {
        slides: { perView: 1, spacing: 8 },
      },
    },
  })

  async function getUser() {
    const response = await invokeLambda<
      Record<string, never>,
      { statusCode: number; body: string }
    >('user-select-lambda', {})
    console.log(response)
    if (response.statusCode === 200) {
      return JSON.parse(response.body)
    } else {
      throw new Error('Erro ao buscar informações')
    }
  }

  const { data: user, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    onError: () => {
      if (!hasShownError) {
        toast.error('Erro ao buscar informações!')
        setHasShownError(true)
      }
    },
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  })

  if (!user) {
    return <Loading />
  }

  return (
    <section>
      <DynamicHeader />
      <section className="min-h-screen w-full bg-gray-200 p-10">
        <div>
          <h4 className="font-semibold text-gray-500">
            Organizações que faço parte
          </h4>
          <p className="text-gray-500">
            Selecione a organização que você quer acessar ou crie uma nova
          </p>
        </div>
        <section className="mt-10 flex flex-col items-center justify-center md:min-h-[500px]">
          <div className="relative w-full max-w-5xl overflow-hidden">
            {loaded && instanceRef.current && (
              <>
                {user && user.socialOrganizations?.length > 3 && (
                  <>
                    <CaretLeft
                      size={32}
                      onClick={() => instanceRef.current?.prev()}
                      className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-blue-400 ${
                        currentSlide === 0
                          ? 'cursor-not-allowed opacity-20'
                          : ''
                      }`}
                    />
                    <CaretRight
                      size={32}
                      onClick={() => instanceRef.current?.next()}
                      className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-blue-400 ${
                        currentSlide ===
                        instanceRef.current.track.details.slides.length - 3
                          ? 'cursor-not-allowed opacity-20'
                          : ''
                      }`}
                    />
                  </>
                )}
              </>
            )}
            <div
              ref={user?.socialOrganizations?.length > 3 ? sliderRef : null}
              className={`flex w-full ${
                user?.socialOrganizations?.length > 3
                  ? 'keen-slider gap-2'
                  : 'flex-wrap justify-center gap-12'
              }`}
            >
              {user &&
                user.socialOrganizations?.map(
                  (userSocialOrganization: UserSocialOrganizationProps) => (
                    <div
                      key={userSocialOrganization.id}
                      className={`${
                        user?.socialOrganizations?.length > 3
                          ? 'keen-slider__slide'
                          : ''
                      } flex items-center justify-center`}
                    >
                      <div className="flex h-[266px] w-[218px] flex-shrink-0 flex-col justify-between rounded-xl bg-white p-5 shadow-md">
                        <h1 className="text-m font-semibold text-gray-600">
                          {userSocialOrganization.socialOrganizationName || ''}
                        </h1>
                        <div className="mt-4">
                          <h4 className="text-sm text-gray-600">
                            Área de trabalho
                          </h4>
                          <h3 className="text-sm font-semibold text-gray-600">
                            {userSocialOrganization.professionalSector || ''}
                          </h3>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm text-gray-600">
                            Cargo na organização
                          </h4>
                          <h3 className="text-sm font-semibold text-gray-600">
                            {userSocialOrganization.professionalRole || ''}
                          </h3>
                        </div>
                        <div className="mt-auto pt-3">
                          {organizationId ===
                          userSocialOrganization.socialOrganizationId ? (
                            <span className="flex items-center gap-2 text-sm text-blue-500">
                              Organização Atual <Check />
                            </span>
                          ) : (
                            <button
                              onClick={() =>
                                router.push(
                                  `/institutions/socialOrganization/${userSocialOrganization.socialOrganizationId}/home`
                                )
                              }
                              className="text-sm text-violet-500"
                            >
                              Acessar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              <div
                key="999"
                className={`${
                  user?.socialOrganizations?.length > 3
                    ? 'keen-slider__slide'
                    : ''
                } flex items-center justify-center`}
              >
                <div className="flex h-[266px] w-[218px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-400 p-5 text-center shadow-md">
                  <Link
                    href={`/institutions/socialOrganization/${organizationId}/createOrganization`}
                    className="text-violet-600"
                  >
                    <div className="mb-2 text-4xl">+</div>
                    <h4 className="text-m font-semibold">
                      Criar nova instituição
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}
