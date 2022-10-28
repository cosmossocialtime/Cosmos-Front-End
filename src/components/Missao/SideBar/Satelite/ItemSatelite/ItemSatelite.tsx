import styled from "styled-components";

interface ItemSateliteProps{
    sateliteImg: string;
    imgAlt: string;
    sateliteName: string;
    width?: string;
    margin?: string;
}

interface SateliteItemContainerProps {
    width?: string;
    margin?: string;
}

const SateliteItemContainer = styled.div<SateliteItemContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .8rem;
    width: fit-content;
    height: fit-content;
    cursor: pointer;

    margin: ${props => props.margin};

    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    padding: .7rem;

    p{
        font-size: 1rem;
        max-width: 120px;
        text-align: center;
    }

    img{
        width: ${props => props.width}px;
        height: fit-content;
        
    }
`


export function ItemSatelite( { sateliteImg, imgAlt, sateliteName, width, margin}: ItemSateliteProps){
    return(
     
     <>
        <SateliteItemContainer width={width} margin={margin}> 

            <img src={sateliteImg} alt={imgAlt} />
            <p>{sateliteName}</p>

        </SateliteItemContainer>
     </>
    );

}

