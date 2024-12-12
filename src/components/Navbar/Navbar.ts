import {reactive} from "vue";
import {DocumentFolder, Home, IcecreamTwo} from "@icon-park/svg";

interface navItem {
    name: string,
    path: string,
    icon?: Function
    showContext: boolean
}
const navContext = reactive<Array<navItem>>([
    {
        name: "首页",
        path: "/",
        icon: Home,
        showContext: false
    },
    {
        name: "归档",
        path: "/archive",
        icon:DocumentFolder,
        showContext: false
    },
    {
        name: "动漫世界",
        path: "/bangumi",
        icon:IcecreamTwo,
        showContext: false
    }
])


export default navContext