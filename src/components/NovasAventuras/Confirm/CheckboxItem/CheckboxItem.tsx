import styled from 'styled-components'

import * as Checkbox from '@radix-ui/react-checkbox'
import { useState } from 'react'
import { Check } from 'phosphor-react'

interface CheckboxItemProps {
  valueName: string
  label: string
  functionClick?: () => void
}

export function CheckboxItem({
  valueName,
  label,
  functionClick,
}: CheckboxItemProps) {
  const [checked, setChecked] = useState(false)

  return (
    <CheckboxContainer ischecked={+checked}>
      <CheckboxRoot
        onClick={functionClick}
        name={valueName}
        value={label}
        ischecked={+checked}
        id={valueName}
        onCheckedChange={() => setChecked(!checked)}
      >
        <CheckboxIndicator>
          <Check />
        </CheckboxIndicator>
      </CheckboxRoot>
      <label htmlFor={valueName}>{label}</label>
    </CheckboxContainer>
  )
}

interface CheckboxProps {
  ischecked?: number
}

const CheckboxContainer = styled.section<CheckboxProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  label {
    color: ${(props) => (props.ischecked ? '#363F63' : '#A2ABCC')};
  }
`

const CheckboxRoot = styled(Checkbox.Root)<CheckboxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  min-width: 1.5rem;
  border: 1px solid var(--gray-500);

  background: ${(props) =>
    props.ischecked
      ? 'linear-gradient(270deg, #9D37F2 7.35%, #65BAFA 99.98%)'
      : '#D0D5E5'};
  border-radius: 4px;
`

const CheckboxIndicator = styled(Checkbox.Indicator)`
  font-size: 1.2rem;
  color: #fff;
`
