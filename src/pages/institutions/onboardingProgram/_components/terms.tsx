import { useEffect, useState } from 'react'
import { Button } from '../../../../components/Button/ButtonSubmit'
import { CustomCheckbox } from '../../../../components/Button/CustomCheckbox'
import { saveFormData } from '../../../../utils/localStroge'
import { TermsText } from '../../../../components/TitlesAndLinks/TermsText'

interface TermsPageProps {
  nextPage: () => void
}

export function TermsPage({ nextPage }: TermsPageProps) {
  const [acceptTerms, setAcceptTerms] = useState(false)

  useEffect(() => {
    setAcceptTerms(false)
  }, [])

  const handleAcceptTerms = (value: boolean) => {
    setAcceptTerms(value)
    console.log(value)
    saveFormData('termsAccepted', value)
  }

  return (
    <div className="mb-4 w-[980px]">
      <form className="mt-6 flex flex-col items-start gap-6">
        <TermsText
          title="Coloque seu capacete, ajuste seu traje e prepare-se para uma aventura!"
          paragraphs={[
            'Precisamos de mais algumas informações para te inscrever nessa aventura.',
            'É importante que você esteja ciente de que suas respostas poderão ser compartilhadas com a organização do programa e empresa parceira.',
          ]}
          linkText="Termo de Consentimento ao Tratamento de Dados"
          linkHref="#"
        />
        <div className="flex items-center pt-12">
          <div className="mr-4">
            <CustomCheckbox
              checked={acceptTerms}
              setChecked={handleAcceptTerms}
              labelText="Aceito que a Cosmos, a empresa parceira e seus colaboradores tenham acesso às minhas respostas"
            />
          </div>
        </div>

        <div className="w-[248px] pt-[12px]">
          <Button
            onClick={nextPage}
            text="Embarcar nesta jornada"
            disabled={!acceptTerms}
            type="submit"
          />
        </div>
      </form>
    </div>
  )
}
