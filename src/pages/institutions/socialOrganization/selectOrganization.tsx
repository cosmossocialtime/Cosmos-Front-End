import { useEffect, useState } from 'react'
import DynamicHeader from '../../../components/header/DynamicHeader'
import { useRouter } from 'next/router'
import { useKeenSlider } from 'keen-slider/react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { UserSocialOrganizationProps } from '../../../types/userSocialOrganization'
import { Loading } from '../../../components/Loading'
import { useHeader } from '../../../context/HeaderContext'
import { api } from '../../../services/api'

export default function SelectOrganizationPage() {
  const router = useRouter()
  const { setSocialOrganizationId } = useHeader()
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
    const response = await api.get('/user')
    if (response.status === 200) {
      return response.data
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

  useEffect(() => {
    if (!user?.socialOrganizations?.length) return

    const sorted = [...user.socialOrganizations].sort(
      (a, b) => a.socialOrganizationId - b.socialOrganizationId
    )

    setSocialOrganizationId(sorted[0].socialOrganizationId)
  }, [user])

  if (!user) {
    return <Loading />
  }

  return (
    <section>
      <DynamicHeader />
      <section className="min-h-screen w-full bg-gray-200 p-10">
        <div>
          <p className="mb-4 text-base text-gray-600">
            Organizações que faço parte
          </p>
          <p className="text-sm text-gray-500">
            Selecione a organização que você quer acessar
          </p>
        </div>
        <section className="mt-10 flex flex-col items-center justify-center md:min-h-[500px]">
          <div className="relative w-full max-w-6xl overflow-hidden px-[40px]">
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
                          <button
                            onClick={() =>
                              router.push(
                                `/institutions/socialOrganization/${userSocialOrganization.socialOrganizationId}/home`
                              )
                            }
                            className="text-sm font-semibold text-purple-500"
                          >
                            Acessar
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              <div className="keen-slider__slide pointer-events-none w-[20px] opacity-0" />
            </div>
          </div>
        </section>
      </section>
    </section>
  )
}
