<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{ categoryList }}</h1> -->
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由的跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级，三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category1Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
// console.log(_);
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标以上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库当中
    // this.$store.dispatch("categoryList");
    //第31节将其转到app.Vue文件下

    // 当组件挂载完毕，让show属性变为false
    // 如果不是home组件，将其进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },

  computed: {
    ...mapState({
      // 右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },

  methods: {
    // 传统无节流方法：
    // changeIndex(index) {
    //   // console.log(this)
    //   this.currentIndex = index;
    // },

    // 引入lodash的节流方法
    // throttle回调函数最好别用箭头函数，可能会出现上下文this问题
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    // 鼠标移除时“全部商品分类”：
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") this.show = false;
    },

    // 鼠标进入时“全部商品分类”：
    enterShow() {
      this.show = true;
    },

    // 三级联动里面的跳转
    goSearch(event) {
      let element = event.target;
      // console.log(element);
      let {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = element.dataset;

      if (categoryname) {
        // 整理路由跳转的传参
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类,二级分类,三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 整理完参数
        // console.log(location,query)
        // 判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 动态添加query参数
          location.query = query;
          // 进行路由跳转
          this.$router.push(location);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: salmon;
        }
      }
    }

    // 过渡动画样式
    // 过渡动画开始状态（进入）
    .sort-enter {
      height: 0;
      opacity: 0;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
      opacity: 100;
    }
    // 定义动画时间
    .sort-enter-active {
      transition: opacity 0.5s ease-out;
    }

    .sort-leave {
      height: 461px;
      opacity: 100;
    }
    .sort-leave-to {
      height: 0;
      opacity: 0;
    }
    .sort-leave-active {
      transition: opacity 0.5s ease-out;
    }
  }
}
</style>