<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
       <div class="container">
         <div class="row">
           <div class="col-md-10 mx-auto  border-bottom">
             <div class="row">
               <div class="col-md-4">
                  <input type="number" @keyup="ChangePerpagePost()" v-model="postsPerPage" class="form-control">
               </div>
               <div class="col-md-4  ">
                 <select class="form-select" @change="dataShorting()" v-model="shortWay">
                   <option  value="">---Shorting By Title ---</option>
                   <option value="asc">ASC</option>
                   <option value="desc">DESC</option>
                 </select>
               </div>
               <div class="col-md-4    ">
                 <div class="input-group mb-3">
                   <input type="text" class="form-control" @keyup="filteredPosts()" v-model="searchText" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
<!--                   <button class="btn btn-outline-secondary" type="button" id="button-addon2">search</button>-->
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div class="row">
              <div class="col-md-10 mx-auto">
                 <div class="card">
                  <table class="table table-bordered">
               <thead>
               <tr>
                 <th scope="col">#</th>
                 <th scope="col">Title</th>
                 <th scope="col">User Id</th>
                 <th scope="col">Body</th>
               </tr>
               </thead>
               <tbody v-if="searchesData.length<=0" >
                 <tr v-for="item in currentPagePosts" :key="item.id">
                   <th scope="row">{{ item.id }}</th>
                   <td>{{ item.title }}</td>
                   <td>{{ item.userId }}</td>
                   <td>{{item.body}}</td>
                 </tr>
               </tbody>
               <tbody v-else >
                 <tr v-for="item in searchesData" :key="item.id">
                   <th scope="row">{{ item.id }}</th>
                   <td>{{ item.title }}</td>
                   <td>{{ item.userId }}</td>
                   <td>{{item.body}}</td>
                 </tr>
               </tbody>
                    <tfoot v-if="searchesData.length<=0">
                    <tr>
                      <td colspan="5">
                        <button class="btn btn-primary px-3" :disabled="currentPage===1" @click="setCurrentPage(-1)">PREV</button>
                        <button class="btn btn-info px-3" :disabled="currentPage===items.length/postsPerPage" @click="setCurrentPage(1)">NEXT</button>
                      </td>
                    </tr>
                    </tfoot>
                    <tfoot v-else>
                    <tr>
                      <td colspan="5">
                        <button class="btn btn-primary px-3" :disabled="currentPage===1" @click="setCurrentPage(-1)">PREV</button>
                        <button class="btn btn-info px-3" :disabled="currentPage===searchesData.length/postsPerPage" @click="setCurrentPage(1)">NEXT</button>
                      </td>
                    </tr>
                    </tfoot>
             </table>
                 </div>
           </div>
         </div>
       </div>

  </div>
</template>



<script setup>

// import helloWorld from "@/components/HelloWorld";
import { ref,  onMounted, computed,onBeforeMount  } from 'vue'
import { useStore } from 'vuex'

// reactive state

const store = useStore()
let  currentPage = ref(1)
let postsPerPage=ref(10)
let searchText=ref()
let searchesData =ref([]);
let shortWay =ref('');

// eslint-disable-next-line vue/return-in-computed-property

 const items = computed(() => {
  return store.getters.post
})
// eslint-disable-next-line vue/return-in-computed-property

 let currentPagePosts = computed(()=> {
   return  items.value.slice((currentPage.value - 1) * postsPerPage.value, currentPage.value * postsPerPage.value)
 })

function setCurrentPage(direction) {
   if (direction === -1 && currentPage.value > 1) {
       currentPage.value -= 1
     } else if (direction === 1 && currentPage.value < this.items.length / postsPerPage.value) {
       currentPage.value += 1
    }
   currentPagePosts =  items.value.slice((currentPage.value - 1) * postsPerPage.value, currentPage.value * postsPerPage.value)
}
function ChangePerpagePost(){
  currentPage.value=1;
  currentPagePosts =  items.value.slice((currentPage.value - 1) * postsPerPage.value, currentPage.value * postsPerPage.value)
 }
function filteredPosts() {
  if(searchText.value.length>0){
    let dataLists = items.value.filter((item) =>
        item.title.toLowerCase().includes(searchText.value.toLowerCase())
    );
    console.log(dataLists);
    searchesData.value = dataLists.slice((currentPage.value - 1) * postsPerPage.value, currentPage.value * postsPerPage.value);
  }else {
    searchesData.value=[];
    ChangePerpagePost();
  }


}
function dataShorting(){
  if (shortWay.value==='desc') {
    items.value.sort((x, y) => (x['title'] > y['title'] ? -1 : 1));

  } else {
    items.value.sort((x, y) => (x['title'] < y['title'] ? -1 : 1));

  }
}

 onBeforeMount(()=>{
  store.dispatch('getPosts');
})
// lifecycle hooks
onMounted(() => {
  // console.log(`The initial count is ${count.value}.`);
   //store.dispatch('getPosts');
  // posts = items
  // console.log(items);

  console.log(currentPagePosts);

})


</script>