<template>
    <v-card color='white' style="height: 100px">
        <v-card dark ripple raised :color= item.color class="cardIconLeft">
            <v-icon class="iconCard" large> {{ item.icon }}</v-icon>
        </v-card>
        <!-- <v-container fluid pa-2 justify-end>
                <v-flex xs6 class='statTitle'>
                {{ item.title }}
            </v-flex>
            <v-flex xs6 class='statValue'>
                {{ item.count }} <strong>|</strong> {{ item.value }}
            </v-flex>
        </v-container> -->

        <div class="statTitle">{{ item.count }} {{ item.title }} </div>
        <div class="statValue"> {{ item.value }} </div>

    </v-card>
</template>

<script>
export default {
    props: ['item'],
}
</script>


<style scoped>

    .cardIconLeft {
        position:absolute;
        top: -20px;
        left: 15px;
        height: 80px;
        min-width:0;
        padding: 4px;
        width: 80px;
        max-width: 30%;
        
    }

    .iconCard {
        vertical-align: middle;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
    }

    .statTitle {
        text-align: right;
        font-size: 18px;
        opacity: 0.4;
        width:55%;
        position: absolute;
        right: 12px;
        top: 4px;
    }

    .statValue {
        text-align: right;
        font-size: 30px;
        opacity: 0.75;
        position: absolute;
        bottom: 4px;
        right: 12px;
        width: 50%;
        font-weight: 100;
    }
</style>

