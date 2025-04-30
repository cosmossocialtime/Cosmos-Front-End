export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      name: 'Mentoria Social',
      startDate: '01/04/2025',
      endDate: '30/06/2025',
      hoursPerWeek: '5 horas',
      description: `No Programa Mentoria 1, você atuará como mentor(a) voluntário(a) de uma organização social que atua na causa da educação ou da saúde.

Você trabalhará em equipe com outros voluntários da Empresa X para apoiar o desenvolvimento da instituição e contribuir para aumentar o seu impacto social.

Serão realizados encontros semanais de mentoria, em que a equipe de mentores aconselhará os líderes da organização mentorada em temas relacionados à gestão, como finanças, marketing, recursos humanos, estratégia, entre outros.`,
      companyLogo:
        'https://thumbs.dreamstime.com/b/s%C3%ADmbolo-de-perfil-masculino-inteligente-retrato-estilo-desenho-animado-m%C3%ADnimo-166146853.jpg',
    })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
