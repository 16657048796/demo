<template>
    <div class="indexMain" :class=" isCollapse ? 'open':'close'">
        <Nav />
        <Header />
        <Main />
    </div>
</template>

<script>
import Nav from "./modules/nav"
import Header from "./modules/header"
import Main from "./modules/main"
import { ref ,computed} from '@vue/composition-api'
export default {
    setup(props,{refs,root}){
        const isCollapse= computed(()=>{
            return root.$store.state.app.isCollapse
        })
        return {
            isCollapse
        }
    },  
    components:{
        Nav,
        Header,
        Main
    }
}   
</script>

<style lang="scss" scoped>

</style>