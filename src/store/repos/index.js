import {Axios} from "@/axios/axios";

export default {
    namespaced: true,
    state: {
        current: {},
        all: [],
        files: [],
    },
    mutations: {
        setCurrent: (state, data) => state.current = data,
        setAll: (state, data) => state.all = data,
        setFiles: (state, data) => state.files = data,
    },
    getters: {
        getCurrent: state => state.current,
        listAll: state => state.all,
        listFiles: state => state.files,
    },
    actions: {
        create: async (ctx, {name}) => {
            let m = await Axios.post("/api/v1/repos", {name})
            if (m.status === 200) {
                ctx.dispatch("notification/pushNotification", {
                    title: `Repo "${name}" created` ,
                    body: "Success",
                    type: "info"
                }, { root: true })
                return m.data.result
            }
            return null
        },
        getAll: async (ctx) => {
            let r = await Axios.get("/api/v1/repos")
            ctx.commit('setAll', r.data.result)
        },
        beginWs: async (ctx, {id}) => {
            await Axios.wsOpen(`/api/v1/repos/w/${id}/`)
        },
        fetchCurrent: async (ctx, repo) => {
            let r = await Axios.get(`/api/v1/repos/u/${repo.username}/${repo.repo}`)
            ctx.commit('setCurrent', r.data.result)
        },
        files: async (ctx, list) => {
            ctx.commit("setFiles", list)
        }
    }
}
