<script>
import Button from './components/Button.vue';
import Header from './components/Header.vue';

export default {
    components: {
        Button,
        Header
    }
}
</script>

<template>
    <form action="">
        <Header></Header>
        <br>
        <br>
        <br>
        <br>
        <div style="padding-top: 0;">
            <Button class="return-button">
                返回
            </Button>
        </div>
        <!-- 按钮 -->
        <div class="bingli">
            <div class="bingli-label">
                <p>病历号</p>
            </div>
            <input class="input-field" placeholder="请输入病历号" clearable />
        </div>
        <div class="button-container">
            <Button>
                确定
            </Button>
        </div>
    </form>
</template>

<style>
.btn {
    width: 200px;
    height: 50px;
    border-radius: 15px;
    font-size: 22px;
}
.button-container {
    height: 100px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}
.return-button{
    margin-left: 15vw;
}
.bingli {
    width: 100vw;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.bingli-label p {
    font-size: 200%;
    height: 100px;
    margin: 0;
    /* 去掉默认的上下边距 */
    position: relative;
    left: -130px;
    /* 向左移动20px */
}
.input-field {
    width: 360px;
    border: none;
    outline: none;
    font-size: 140%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
}
</style>