import {defineStore} from 'pinia'

export const useUserStore=defineStore('user',{
    state:()=>({
    username:null as string | null,
    }),
    actions:{
        login(user:string){
            this.username=user
        },
        logout(){
            this.username=null
        },
    },
    persist:true,
})