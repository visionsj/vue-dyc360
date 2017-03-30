<template>
    <div class="loginContainer">
何艳辉sfdf
     <li v-for="todo in todos">
      {{ todo.text }}
    </li>
          
    </div>
</template>

<script>

export default {
    data(){
        return {
            todos: [
              { text: '1ssssss' },
              { text: '2' },
              { text: '3' }
            ]
        }
    }
}

</script>


