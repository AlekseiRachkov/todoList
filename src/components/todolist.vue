<template>
  <div class="container">
    <form action="">
      <div class="main-item">
        <div class="main-item__title">
          <h3>Мой список дел</h3>
          <input type="text" v-model.trim="title" placeholder="Заголовок">
        </div>
        <div class="main-item__date">
          <h3>deadline</h3>
          <input type="date" v-model="date" >
        </div>
        <div class="main-item__description">
          <h3>Заметки к задаче</h3>
          <textarea name="" id="" cols="40" rows="2" v-model.trim="description"></textarea>
        </div>
      </div>
      <div class="main-item" >
          <input class="main-item__button" type="button" value="Добавить в список дел" @click="loadTodoList()">
          <input class="main-item__button" type="button" value="Очистить список дел" @click="cleanStorage()">
          <input class="main-item__button" type="button" value="Сохранить изменения" @click="loadStorage()">
      </div>
    </form>
    <div class="main-item-list">
      <div class="main-item">
        <h4>Список дел</h4>
        <h4 @click="sortCloseDate(list)">Сделать до</h4>
        <h4 @click="sortNowDate(list)">Дата создания</h4>
        <h4>Описание</h4>
        <h4 @click="sortCheck(list)">Не выполнено / <br> выполнено</h4>
      </div>
      <div class="main-item" v-for="(i, ind) of list" :key="i.id">
        <p>
          {{i.title}}
        </p>
        <p>
          {{i.dateClose}}
        </p>
        <p>
          {{i.dateNow}}
        </p>         
        <p>
          {{i.description}}
        </p>
        <p>
          <input type="radio" v-model="checked" :value="!i.check" @click="i.check = !i.check">
          <span v-if="i.check === false">Не выполнено</span>
          <span v-else>Сделано</span>
        </p>
        <span class="main-item__delete" @click="deleteItem(list, ind)" >
          X
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'todolist',
  data() {
    return {
      title: '',
      date: new Date().toISOString().substr(0, 10),
      description: '',
      list: this.$store.getters.allTodo,
      checked: false
    }
  },
  methods: {
    loadTodoList() {
      let title = this.title,
        description = this.description,
        id = new Date().getTime(),
        dateClose = this.date,
        nowDate = new Date().toISOString().substr(0, 10)
      
      function normalizeDate(x) {
          return x.split('-').reverse().join('-')
        }

      let x = {
        title,
        description,
        id,
        check: false,
        dateClose: normalizeDate(dateClose),
        dateNow: normalizeDate(nowDate)
      }

      this.$store.commit('createTodo', x)
      this.loadStorage()
      
      this.title = this.description = ''
      this.date = nowDate
    },
    loadStorage() {
      const parsed = JSON.stringify(this.list)
      localStorage.setItem('todo', parsed);
    },
    cleanStorage() {
      localStorage.removeItem('todo');
      document.location.reload(true)
    },
    sortCloseDate(x) {
      x.sort((a, b) => a.dateClose.localeCompare(b.dateClose))
    },
    sortNowDate(x) {
      x.sort((a, b) => a.dateNow.localeCompare(b.dateNow))
    },
    sortCheck(x) {
      x.sort((a, b) => a.check - b.check)
    },
    deleteItem(list, x) {
      list.splice(x,1)
      this.loadStorage()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.main-item
  margin 5px 0
  display flex
  justify-content center
  &__date
    margin-left 20px
  &__description
    margin-left 20px
  &__button
    margin 20px 10px 0
    padding 10px
    cursor pointer
    border-radius 5px
  &__delete
    width 100%
    max-width 20px
    height 20px
    padding 2px
    border 1px solid black
    border-radius 5px
    cursor pointer
  &-list
    margin 10px -20px 0
    display flex
    flex-direction column
    & h4
      margin 0 10px
      width calc(100%/5 - 20px)
      cursor pointer
    & p
      margin 0 10px
      width calc(100%/5 - 20px)
</style>
