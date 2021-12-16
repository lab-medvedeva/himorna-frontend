<template>
    <div class="block links" v-if="data">
        <a :href=item.link class="link" target="_blank" v-for="(item, index) in data" :key="index">
            <img src="@/assets/images/icon_link.svg">
            <p class="link__name">{{item.name}}</p>
        </a>
    </div>
</template>
<script>
export default {
    name: 'link',
    props: {
        data: {
            type: Array,
            required: false
        }
    }
}
</script>