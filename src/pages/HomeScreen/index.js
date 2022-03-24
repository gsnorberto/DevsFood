import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import api from "../../api";
import Header from "../../components/Header"
import CategoryItem from '../../components/CategoryItem';
import ProductItem from '../../components/ProductItem'
import Modal from '../../components/Modal'
import ModalProduct from '../../components/ModalProduct';
import {
   Container,
   CategoryArea,
   CategoryList,
   ProductArea,
   ProductList,
   ProductPaginationArea,
   ProductPaginationItem
} from './styled';

let searchTimer = null;

export default () => {
   const [headerSearch, setHeaderSearch] = useState('');
   const [categories, setCategories] = useState([]);
   const [activeCategory, setActiveCategory] = useState(0);
   const [products, setProducts] = useState([]);
   const [totalPages, setTotalPages] = useState(0);
   const [activePage, setActivePage] = useState(1);
   const [activeSearch, setActiveSearch] = useState('');
   const [modalStatus, setModalStatus] = useState(false);
   const [modalData, setModalData] = useState({});

   //Obter lista de produtos atualizada, total de página páginas e página atual.
   const getProducts = async () => {
      const prods = await api.getProducts(activeCategory, activePage, activeSearch);

      if (prods.error === '') {
         setProducts(prods.result.data);
         setTotalPages(prods.result.pages);
         setActivePage(prods.result.page)
      }
   }

   const handleProductClick = (data) => {
      setModalData(data);
      setModalStatus(true);
   }

   //Obter Lista de Categorias
   useEffect(() => {
      const getCategories = async () => {
         const cat = await api.getCategories();

         if (cat.error === '') {
            setCategories(cat.result)
         }

         ReactTooltip.rebuild();
      };

      getCategories();
   }, []);

   //Chama função de obter lista de produtos acima.
   useEffect(() => {
      setProducts([]);
      getProducts();
   }, [activeCategory, activePage, activeSearch]);

   //Quando o usuário digita na caixa de pesquisa
   useEffect(() => {
      clearTimeout(searchTimer);

      searchTimer = setTimeout(() => {
         setActiveSearch(headerSearch);
      }, 2000)
   }, [headerSearch]);

   return (
      <Container>
         <Header search={headerSearch} onSearch={setHeaderSearch} />

         {/* LISTA DE CATEGORIAS */}
         {categories.length > 0 &&
            <CategoryArea>
               Selecione uma categoria
               <CategoryList>
                  <CategoryItem
                     data={{
                        id: 0,
                        name: 'Todas as categorias',
                        image: '/assets/food-and-restaurant.png'
                     }}
                     activeCategory={activeCategory}
                     setActiveCategory={setActiveCategory}
                  />

                  {categories.map((item, index) => (
                     <CategoryItem
                        key={index}
                        data={item}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                     />
                  ))}
               </CategoryList>
            </CategoryArea>
         }

         {/* LISTA DE PRODUTOS */}
         {products.length > 0 &&
            <ProductArea>
               <ProductList>
                  {products.map((item, index) => (
                     <ProductItem
                        key={index}
                        data={item}
                        onClick={handleProductClick}
                     />
                  ))}
               </ProductList>
            </ProductArea>
         }

         {/* PAGINAÇÃO */}
         {totalPages > 0 &&
            <ProductPaginationArea>
               {/* Cria um array com qnt. de posições = qnt. total de páginas, e preenche todos as posições com o valor "0" */}
               {Array(totalPages).fill(0).map((item, index) => (
                  <ProductPaginationItem
                     key={item}
                     active={activePage}
                     current={index + 1}
                     onClick={() => setActivePage(index + 1)}
                  >
                     {index + 1}
                  </ProductPaginationItem>
               ))}
            </ProductPaginationArea>
         }

         {/* MODAL */}
         <Modal status={modalStatus} setStatus={setModalStatus}>
            <ModalProduct data={modalData} status={modalStatus} setStatus={setModalStatus}/>
         </Modal>
      </Container>
   );
}