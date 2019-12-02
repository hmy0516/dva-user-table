import * as apis from "../services/example";

export default {
  namespace: "users",
  state: {
    userList: []
  },
  reducers: {
    showAll(state,payload){
        console.log('show',state,payload)
        let newState=JSON.parse(JSON.stringify(state))
        newState.userList=payload.userList;
        console.log('newState',newState)
        return newState;
    },
    create(state,payload){
        console.log('create',payload.payload)
        let newState=JSON.parse(JSON.stringify(state));
        newState.userList.push(payload.payload)
        return newState;
    },
    edit(state,payload){
        console.log('edit',payload.payload)
        let newState=JSON.parse(JSON.stringify(state));
        newState.userList.splice(payload.payload.key-1,1,payload.payload.values)
        return newState;
    },
    remove(state, payload){
        console.log('remove',state,payload)
        let newState=JSON.parse(JSON.stringify(state));
        newState.userList=state.userList.filter(item => item.key !== payload.payload.key)
        return newState;
    },
    search(state, payload){
        console.log('search',payload.payload)
        let newState=JSON.parse(JSON.stringify(state));
        newState.userList=state.userList.filter(item => item.name === payload.payload)
        
        return newState;
    },
  }
};
