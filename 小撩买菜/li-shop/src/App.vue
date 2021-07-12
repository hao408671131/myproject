<template>
  <div id="app">
    <!--路由动画-->
    <transition :name="Animations" mode="out-in">
      <router-view></router-view>
    </transition>



  </div>
</template>
<script>
  export default {
    name: "App",
    data(){
      return{
      Animations:''
      }
    },
 watch:{
      '$route'(to,from){//监听路由的进出
        if(to.meta.animations==='one'&&from.meta.animations==='zero'){//Order->MyAddress
            this.Animations='one';
        }
        else if(from.meta.animations==='one'&&to.meta.animations==='zero'){//Order<-MyAddress
          this.Animations='two';
        }
        else if(to.meta.animations==='two'&&from.meta.animations==='one'){//MyAddress->AddAddress
          this.Animations='one';
        }
        else if(from.meta.animations==='two'&&to.meta.animations==='one'){//MyAddress<-AddAddress
          this.Animations='two';
        }
        else if(to.meta.animations==='three'&&from.meta.animations==='one'){//MyAddress->EditAddress
          this.Animations='one';
        }
        else if(from.meta.animations==='three'&&to.meta.animations==='one'){//MyAddress<-EditAddress
          this.Animations='two';
        }
        else if(to.meta.animations==='four'&&from.meta.animations==='five'){//MyAddress->EditAddress
          this.Animations='one';
        }
        else if(from.meta.animations==='four'&&to.meta.animations==='five'){//MyAddress<-EditAddress
          this.Animations='two';
        }
        else if(to.meta.animations==='seven'&&from.meta.animations==='zero'){//MyAddress->EditAddress
          this.Animations='one';
        }
        else if(from.meta.animations==='seven'&&to.meta.animations==='zero'){//MyAddress<-EditAddress
          this.Animations='two';
        }
        else if(to.meta.animations==='six'&&from.meta.animations==='five'){//MyAddress->EditAddress
          this.Animations='one';
        }
        else if(from.meta.animations==='six'&&to.meta.animations==='five'){//MyAddress<-EditAddress
          this.Animations='two';
        }
        else{
          this.Animations='';
        }
      }
 }

  }
</script>
<style lang="less">

#app{
  width: 100%;
  height: 100%;
}
.one-enter-active{
  transition:all 0.3s;
}
.one-enter{
  transform: translate3d(2rem,0,0);
  opacity: 0;
}


 .two-leave-active{
  transition: all 0.3s;
}

 .two-leave-active{
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>
