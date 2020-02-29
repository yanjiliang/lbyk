import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

// export default new Vuex.Store({   // 注意Store的S大写
//     state: {
//         resmsg:'该课程已下架',

//     },
//     mutations:{
//         Newresmsg: (state,newmsg)=>{
//             state.resmsg = newmsg
//         }
//     },
//     actions:{
//         newMsg:(context,object)=>{
//             context.commit('Newresmsg',object)
//         }
//     }
// })

export const store = new Vuex.Store({
    state: {
        resmsg:'该课程已下架',

    },
    mutations:{
        newresmsg: (state,newmsg)=>{
            state.resmsg = newmsg
        }
    },
    actions:{
        newMsg:(context,object)=>{
            context.commit('Newresmsg',object)
        }
    }
})
// export default store