import { Button } from './Button'

export function InternalServerError() {
  return (
    <div className="h-screen w-screen bg-bgError500 bg-cover">
      <span>ERRO 500</span>
      <h1>Dificuldades técnicas</h1>
      <p>
        Desculpe, estamos com problemas para carregar a página que está
        procurando.{' '}
      </p>
      <p>Por favor, tente novamente mais tarde.</p>
      <Button.Primary className="px-6 py-3">
        Voltar para painel principal
      </Button.Primary>
    </div>
  )
}
