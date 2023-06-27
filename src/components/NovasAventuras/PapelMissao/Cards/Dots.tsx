import styled from 'styled-components'

export function Dots() {
  return (
    <Container>
      <Dot color="#FFD743" />
      <Dot color="#AEDF55" />
      <Dot color="#FD6062" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 0.8rem;
  width: fit-content;
  margin: 2rem auto 0 auto;
`

interface DotProps {
  color: string
}

const Dot = styled.span<DotProps>`
  height: 0.6rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  padding: 5px;
  background: ${(props) => props.color};
`
