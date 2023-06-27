import styled from 'styled-components'
import * as Checkbox from '@radix-ui/react-checkbox'

export const Container = styled.section`
  padding: 0 1rem;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    max-width: 990px;

    :nth-child(3) {
      max-width: 1100px;
    }

    a {
      color: #0890f7;
    }
  }

  p + p {
    margin-top: 1rem;

    :last-child {
      margin-top: 2rem;
    }
  }
`

interface CheckboxProps {
  ischecked: boolean
}

export const Checkboxdiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const CheckboxRoot = styled(Checkbox.Root)<CheckboxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  width: 1.5rem;

  background: ${(props) =>
    props.ischecked
      ? 'linear-gradient(270deg, #9D37F2 7.35%, #65BAFA 99.98%)'
      : '#D0D5E5'};
  border-radius: 4px;
`

export const CheckboxIndicator = styled(Checkbox.Indicator)`
  font-size: 1.2rem;
  color: #fff;
`
