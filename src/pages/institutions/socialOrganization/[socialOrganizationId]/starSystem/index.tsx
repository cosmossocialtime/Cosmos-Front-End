import DynamicHeader from '../../../../../components/header/DynamicHeader'
import { useRouter } from 'next/router'
import { invokeLambda } from '../../../../../lib/aws/invokeLambda'
import { useQuery } from '@tanstack/react-query'
import { Loading } from '../../../../../components/Loading'
import { CentralStar } from '../../../../../components/instituition/painel/solarSystem/centralStar'
import { PlanetGrid } from '../../../../../components/instituition/painel/solarSystem/planetGrid'
import { useCombinedPlanetsData } from '../../../../../hooks/useCombinedPlanetsData'

export default function StarSystem() {
  const router = useRouter()
  const { socialOrganizationId } = router.query
  const organizationId = Number(socialOrganizationId || '0')

  async function getSectors() {
    try {
      const response = await invokeLambda<
        Record<string, never>,
        { statusCode: number; body: string }
      >('sector-select-lambda', {})
      return JSON.parse(response.body)
    } catch (error) {
      console.error('Erro ao buscar setores!')
      throw error
    }
  }

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: getSectors,
  })

  const fetchSocialOrganization = async (organizationId: number) => {
    try {
      const payload = { socialOrganizationId: organizationId }

      const response = await invokeLambda<
        typeof payload,
        { statusCode: number; body: string }
      >('social-organization-select-lambda', payload)

      const parsed = JSON.parse(response.body)
      return parsed.socialOrganization
    } catch (error) {
      console.error('Erro ao buscar Organização Social!')
    }
  }

  const {
    data: socialOrganization,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['socialOrganization', organizationId],
    queryFn: () => fetchSocialOrganization(organizationId),
    enabled: !!organizationId,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  })

  const { leftPlanets, rightPlanets } = useCombinedPlanetsData(
    sectors,
    socialOrganization
  )

  if (
    isLoading ||
    !socialOrganization ||
    !sectors ||
    !leftPlanets.length ||
    !rightPlanets.length
  ) {
    return <Loading />
  }

  const filledCount =
    (socialOrganization.sectors?.filter(
      (s: { id: number }) => s.id && s.id !== 0
    ).length || 0) + (socialOrganization.cnpj !== undefined ? 1 : 0)
  const totalCount = 11

  return (
    <section className="min-h-screen bg-gray-400/20">
      <DynamicHeader />
      <div className="h-[calc(100vh-68px)] p-6">
        <h2 className="text-gray-500">Sistema Estelar</h2>
        <p className="my-3 max-w-[640px] text-gray-500">
          O sistema estelar é um resumo de toda a organização{' '}
          {socialOrganization.name}.<br />
          <span className="font-semibold text-gray-600">Preencha</span> as
          informações solicitadas em cada área abaixo. Preenchidos:{' '}
          {filledCount} de {totalCount}.
        </p>

        <div
          className="relative mt-8 h-[30vw] w-full rounded-3xl border border-violet-400 bg-black"
          style={{
            backgroundImage: "url('/images/Planetas/bgLogin.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-10 p-10">
            <PlanetGrid items={leftPlanets} />
            <CentralStar
              socialOrganization={socialOrganization}
              isFilled={socialOrganization.cnpj !== undefined}
            />
            <PlanetGrid items={rightPlanets} />
          </div>
        </div>
      </div>
    </section>
  )
}
