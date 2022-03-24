import React, { useState } from "react";
import { Container, Logo, SearchInput } from "./styled"


export default ( {search, onSearch} ) => {
   const [inputActive, setinputActive] = useState(search ? false : true);

   const handleInputFocus = () => {
      setinputActive(true);
   }

   const handleInputBlur = () => {
      if(search === ''){
         setinputActive(false);
      }
   }

   const handleChange = (e) => {
      onSearch(e.target.value)
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