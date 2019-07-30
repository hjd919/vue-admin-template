<template>
  <user-form :is-edit="false" />
</template>

<script>
import UserForm from './components/UserForm'

export default {
  name: 'CreateUser',
  components: { UserForm }
}
</script>

