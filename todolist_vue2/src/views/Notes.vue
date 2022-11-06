<template>
  <div id="" class="Notes">
    <p class="NotesH">
      功能介绍 <span class="HTips">JiHua TodoList V-1.0.0</span>
      <router-link to="/User" class="cbbtn">返回</router-link>
    </p>
    <p>1. 第一次使用</p>
    <p class="textContent">
      JiHua TodoList V-1.0.0
      属于Web端功能项目，在使用的过程中需要写入浏览器本地localStorage来存储您的数据
    </p>
    <p>
      【Tips:
      此功能只用于存储用户的数据，不会存储任何有害信息或者收集统计用户信息】
    </p>
    <p>2. 模式逻辑</p>
    <p class="textContent">
      JiHua TodoList V-1.0.0 项目有两种模式，分为本地模式和云端模式以及混合模式
    </p>
    <p class="textContent">
      本地模式：添加所有的代办，包括代办、完成、删除状态等一系列操作皆为操作本地数据，当您更换设备或者删除本地存储数据或者清除浏览器等一系列操作，数据则无法保存会随之消失。
    </p>
    <p class="textContent">
      云端模式：添加所有的代办，包括代办、完成、删除状态等一系列操作皆为操作云端数据，当您更换设备或者删除本地存储数据或者清除浏览器等一系列操作，云端数据不受影响，不会随之消失。
    </p>
    <p class="textContent">
      混合模式：当您选择登录但是不开启云端上传功能时添加所有的代办，包括代办、完成、删除状态等一系列操作皆为操作本地数据，当您更换设备或者删除本地存储数据或者清除浏览器等一系列操作，数据则无法保存会随之消失，当您再次点击开启云端上传时，系统会自动检测本地已存在的数据并询问您是否选择上传至云端数据库。
    </p>
    <p>3. 功能说明</p>
    <p>主页</p>

    <p>
      <img
        alt=""
        src="https://jihau.top/api/public/uploads/search.png"
        style="height: 79px; width: 350px"
      />
    </p>

    <p class="textContent">
      左侧第一个向下的箭头为全选按钮，当你想一次性完成所有代办时尝试点击(当然是在有代办的情况下)
    </p>

    <p class="textContent">
      中间则是输入框，输入您要记录的代办事项，您可以选择键盘回车或者点击最右侧添加按钮即可添加代办
    </p>

    <p>3-1 点击添加代办时</p>

    <p>
      <img
        alt=""
        src="https://jihau.top/api/public/uploads/addtodo.png"
        style="height: 256px; width: 350px"
      />
    </p>

    <p>下方红色框则为您添加的代办事件</p>

    <p class="textContent">
      左侧CheckBox选择框点击时会询问&ldquo;要进行变更吗？&rdquo;意为是否完成；点击确定则将此代办列入已完成事件，您可以在下方点击
      完成 按钮查看您已完成的代办事件，当您已经登录则可以点击页面下方 历史
      按钮查看当前账户所完成的所有事件以及所花时间；点击取消则取消该操作
    </p>
    <h4>更多详情点击 <a href="https://jihau.top/article/9K2X88">更多介绍</a></h4>
  </div>
</template>

<script>
export default {
  name: 'NotesPage',
  components: {}
}
</script>

<style lang="less" scoped>
.Notes{
  overflow: scroll;
}
.NotesH {
  border-bottom: 1px black solid;
  margin-bottom: 10px;
  font-size: 1.8rem;
  font-weight: 400;
  padding-bottom: 10px;
  .HTips {
    font-size: 1rem;
  }
  .cbbtn{
    padding: 10px;
    display: block;
    font-size: 1.1rem;
    float: right;
    color: rgba(54, 33, 33, 0.8);
    font-weight: 600;
  }
}
.textContent {
  text-indent: 2rem;
}
</style>
