const initialState = {
   products: [],
   address:[],
   discount: 0,
   delivery: 0
};

export default (state = initialState, action) => {
   let products = [...state.products] //Cópia dos produtos já existentes no carrinho

   switch(action.type) {
      case 'ADD_PRODUCT':
         
         let id = action.payload.data.id
         let index = products.findIndex(item => item.id === id)

         if(index > -1){
            products[index].qt += action.payload.qt
         } else {
            products.push({ //Adiciona o produto e a quantidade em um único objeto
               ...action.payload.data,
               qt: action.payload.qt
            })
         }
         return {...state, products}
      break;

      case 'CHANGE_PRODUCT':
         switch(action.payload.type){
            case '-':
               if(products[action.payload.key]){
                  products[action.payload.key].qt--;
               }

               //remover produto da lista
               if(products[action.payload.key].qt <= 0){
                  products = products.filter((item, index) => (
                     index != action.payload.key
                  ))
               }
            break;

            case '+':
               if(products[action.payload.key]){
                  products[action.payload.key].qt++;
               }
            break;
         }
         return {...state, products}
      break;
   }

   return state;
}