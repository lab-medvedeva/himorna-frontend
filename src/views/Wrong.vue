<template>
    <main class="main">
        <Header />
        <section class="wrong">
            <div class="wrap">
                <p class="wrong__text">There's nothing here ¯\_(ツ)_/¯</p>
            </div>
        </section>
        <Footer />
    </main>
</template>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
    components: {
        Header,
        Footer
    }
}
</script>