import styled from 'styled-components'

export const Container = styled.div`
   display: ${props => props.status ? 'flex' : 'none'};
   justify-content: center;
   align-items: center;
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   background-color: rgba(0,0,0, 0.7);
   z-index: 900;
`

export const ModalBody = styled.div`
   background-color: #FFFFFF;
   border-radius: 20px;
   box-shadow: 0 0 50px #000000;
   max-width: 100vw;
   max-height: 95vh;
   overflow: auto;
`
