import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import qs from "qs"

Vue.use(Vuex);
axios.interceptors.response.use(function (res) {
  if (res.status === 200 && res.statusText === "OK") {
    return res.data;
  }
  return res
}, function (error) {
  return Promise.reject(error)
});
export const store = new Vuex.Store({
    state: {
      //公众状态
      tempData: {},
      showData: [],
    },

    getters: {
      changeState: state => {
        //相当于vue实例中的methods，用来处理公用data
        //自vuex面向组件的数据处理
        //处理数据，把不同商品的同类数据写成数组

      }
    },
    mutations: {
      //写法与getters相似
      // 组件想要对于vuex中的数据进行的处理
      //  组件中采用this.$store.commit('方法名')的方式调用，实现充分耦合
      //  内部操作必须在此刻完成（同步）

      addData(state, data){
        let title = data;
        axios({
          method: 'post',
          url: 'http://192.168.100.182:3000/search',
          data: qs.stringify({
            parameter: data
          })
        }).then(data => {
          if (data.code === "0000") {
            data = data.data.params;
            let show = state.tempData;
            for (let key in data) {
              if (!show[data[key]["name"]]) {
                let l = show.length;
                show[data[key]["name"]] = {};
                for (let i = 0; i < l; i++) {
                  show[data[key]["name"]][title] = "-"
                }
              }
              show[data[key]["name"]][title] = (data[key]["value"])
            }
            state.data = {};
            state.tempData = show;
            let ary = [];
            let i = 0;
            for (let key in show) {
              ary[i] = {};
              ary[i]["title"] = key;
              for (let l in show[key]) {
                ary[i][l] = show[key][l];
              }
              i++;
            }
            state.showData = ary;
          } else alert(data.msg)
        })
      },
      delAllData(state){
        state.data = {};
        state.tempData = {};
        state.showData = {};
      },
      delData(state, data){
        let temp = state.tempData;

      }
    }
    ,
    actions: {
      //  使得mutations 能够实现异步调用，实现例如延迟调用
      increment({commit}, payload)
      {
        commit('突变方法名')
        //payload应该是一个对象，可通过末班方法调用传入对象的方式将数据从组件传入VUEX
      }
      ,
      asyncIncrement({commit})
      {
        setTimeout(() => {
          commit(() => {
            commit("increment")
          }, 1000)
        })
      }
    }
  })
;
