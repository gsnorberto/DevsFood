let BASE = 'https://api.b7web.com.br/devsfood/api'



//CONSULTAS
export default {
   getCategories: async () => {
      const res = await fetch(BASE+'/categories');
      const json = await res.json();
      return json;
   }
};