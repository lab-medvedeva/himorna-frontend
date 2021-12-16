<template>
    <header class="header">
        <div class="wrap">
            <a href="/" class="header__logo">
                <img src="@/assets/images/logo.svg">
            </a>
            <nav class="navigation">
                <ul class="navigation-list">
                    <router-link tag="li" class="navigation-list__item" exact-active-class="active" to="/">Dashboard</router-link>
                    <router-link tag="li" class="navigation-list__item" exact-active-class="active" to="/search">Search</router-link>
                    <!-- <router-link tag="li" class="navigation-list__item" exact-active-class="active" to="/help">Help</router-link> -->
                </ul>
            </nav>
        </div>
    </header>
</template>