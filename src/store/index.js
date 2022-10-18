import { createStore } from 'vuex'
import axios from "axios";
export default createStore({
  state: {
      post_data:[]
  },
  getters:{
      post(state){
         return state.post_data;
    }
  },

  actions: {
    getPosts(post){
      axios.get('https://jsonplaceholder.typicode.com/posts')
          .then( (response) => {
             post.commit("postAll",response.data )

          })
          .catch((error)=>{
            console.log(error)
          })

    },
  },

  mutations: {
    postAll(state,data){
      return state.post_data = data;
    }
  }


})
