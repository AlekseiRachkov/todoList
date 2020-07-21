<template>
  <div class="main">
    <todolist />
  </div>
</template>

<script>
// @ is an alias to /src
import todolist from '@/components/todolist.vue'

export default {
  name: 'Home',
  components: {
    todolist
  }
}
</script>
