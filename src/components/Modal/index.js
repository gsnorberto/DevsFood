import React from "react";
import { Container, ModalBody } from './styled'

export default ({ status, children }) => {
   return(
      <Container>
         <ModalBody status={status}>
            {children}
         </ModalBody>
      </Container>
   );
}