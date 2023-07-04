import Image from 'next/image'
import styled from 'styled-components'

interface CardProps {
  img: string
  Name: string
  cardSelected: string
  firstOption: string
}

export function Card({ Name, img, cardSelected, firstOption }: CardProps) {
  return (
    <CardOp firstOption={firstOption} Name={Name} cardSelected={cardSelected}>
      <Image src={img} alt={img} />

      <p>{Name}</p>
    </CardOp>
  )
}

interface CardOpProps {
  firstOption: string
  Name: string
  cardSelected: string
}

export const CardOp = styled.div<CardOpProps>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  transform-origin: center;
  transform: scale(
    ${(props) => (props.Name === props.cardSelected ? '1.1' : '1')}
  );

  width: 100%;
  aspect-ratio: 1 / 1.1;

  ${(props) =>
    props.Name === props.cardSelected
      ? '  border-radius: 14px; border: 4px double transparent; background-image: linear-gradient(#fff, #fff),linear-gradient(90deg, #65bafa, #7a40d3);background-origin: border-box;background-clip: content-box, border-box;'
      : ''};

  filter: ${(props) =>
    props.Name === props.firstOption ? 'saturate(0%)' : ''};

  img {
    width: 77%;
    height: fit-content;
  }

  p {
    padding-top: 0.5rem;
    font-size: 1.125rem;
    color: #535353;
  }
`
