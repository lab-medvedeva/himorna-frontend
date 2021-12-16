<template>
    <div class="notification">
        <p class="notification-title">{{title}}</p>
    </div>
</template>
<script>
export default {
    name: 'notification',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>