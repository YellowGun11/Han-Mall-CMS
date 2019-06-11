import {CHANGE_COMMENT_DATA,SAVE_ID,Comment_DETAIL} from './mutations_type'

const comment={
  state:{
    commentData:[],
    commentId:'',
    commentDetail:''
  },
  actions: {
    changeCommentData(context,obj){
      context.commit(CHANGE_COMMENT_DATA,obj)
    },
    saveCommentId({commit},ono){
      commit(SAVE_ID,ono)
    },
    getCommentDetail({commit},obj){
      commit(Comment_DETAIL,obj)
    }
  },
  mutations:{
    [CHANGE_COMMENT_DATA](state,payload){
      state.commentData=payload;
    },
    [SAVE_ID](state,ono){
      state.commentId=ono;
    },
    [Comment_DETAIL](state,payload){
      state.commentDetail=payload
    }
  },
  getters:{
    getCommentData(state){
      return state.commentData
    },
    getCommentId(state){
      return state.commentId
    },
    getCommentDetail(state){
      return state.commentDetail
    }
  }
}

export default comment