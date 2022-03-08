import React, { useState } from "react";
import { Container, Logo, SearchInput } from "./styled"

export default ( {search, onSearch} ) => {
   const [inputActive, setinputActive] = useState(false);

   const handleInputFocus = () => {
      setinputActive(true);
   }

   const handleInputBlur = () => {
      setinputActive(false);
   }

   return (
      <Container>
         <Logo src="/assets/logo.png" />
         <SearchInput
            type="text"
            placeholder="Digite um Produto..."
            value={search}
            onChange={handleChange}
            active={inputActive}
            onFocus={handleInputFocus} //qnd coloca o cursor no campo
            onBlur={handleInputBlur} //qnd retira o cursor do campo
         />
      </Container>
   );
}