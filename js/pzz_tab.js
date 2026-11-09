/* ============================================================
   作者：朴哲震
   建立时间：2026-11-02 13:39
   使用模型：GLM-5.3-Flash
   功能名称及简介：pzz_tab.js —— 可复用的 Tab 选项卡组件
   说明：
     - 对外暴露 pzz_initTabs(选项卡容器id, 面板容器id) 一个工厂函数
     - 任何页面只要按约定写好选项卡按钮（带 data-pzz-tab 属性）
       与同数量的面板，即可调用本函数复用整套切换逻辑
     - 核心思路：事件监听（事件委托）→ 先清除所有选项卡的
       选中状态 → 再设置当前元素的选中状态
   ============================================================ */
"use strict";

/**
 * 作者：朴哲震 | 建立时间：2026-11-02 13:39 | 使用模型：GLM-5.3-Flash
 * 功能：pzz_initTabs —— 初始化一组选项卡（可复用入口）
 * @param {string} pzz_tabBoxId   选项卡按钮容器 id
 * @param {string} pzz_panelBoxId 内容面板容器 id（子元素顺序与按钮一一对应）
 * @returns {{pzz_switchTo: Function}} 返回切换接口，供外部编程式控制
 */
function pzz_initTabs(pzz_tabBoxId, pzz_panelBoxId) {
  var pzz_tabBox = document.getElementById(pzz_tabBoxId);
  var pzz_panelBox = document.getElementById(pzz_panelBoxId);
  var pzz_tabs = pzz_tabBox.querySelectorAll("[data-pzz-tab]");
  var pzz_panels = pzz_panelBox.children;

  /**
   * 作者：朴哲震 | 建立时间：2026-11-02 13:39 | 使用模型：GLM-5.3-Flash
   * 功能：pzz_clearActive —— 清除所有选项卡与面板的选中状态（移除 pzz_active 类）
   */
  function pzz_clearActive() {
    var pzz_i;
    for (pzz_i = 0; pzz_i < pzz_tabs.length; pzz_i++) {
      pzz_tabs[pzz_i].classList.remove("pzz_active");
    }
    for (pzz_i = 0; pzz_i < pzz_panels.length; pzz_i++) {
      pzz_panels[pzz_i].classList.remove("pzz_active");
    }
  }

  /**
   * 作者：朴哲震 | 建立时间：2026-11-02 13:39 | 使用模型：GLM-5.3-Flash
   * 功能：pzz_setActive —— 设置第 pzz_index 个选项卡与对应面板为选中状态
   */
  function pzz_setActive(pzz_index) {
    pzz_tabs[pzz_index].classList.add("pzz_active");
    pzz_panels[pzz_index].classList.add("pzz_active");
  }

  /**
   * 作者：朴哲震 | 建立时间：2026-11-02 13:39 | 使用模型：GLM-5.3-Flash
   * 功能：pzz_switchTo —— 切换到第 pzz_index 个选项卡
   *       核心模式：先清除所有选中状态，再设置当前元素的选中状态
   */
  function pzz_switchTo(pzz_index) {
    pzz_clearActive();
    pzz_setActive(pzz_index);
  }

  /* 事件监听（事件委托）：点击容器内任意 [data-pzz-tab] 按钮即触发切换 */
  pzz_tabBox.addEventListener("click", function (pzz_e) {
    var pzz_btn = pzz_e.target.closest("[data-pzz-tab]");
    if (!pzz_btn) { return; }                       // 点在按钮以外不处理
    pzz_switchTo(Number(pzz_btn.getAttribute("data-pzz-tab")));
  });

  /* 初始化：默认选中第 0 个选项卡（国内新闻） */
  pzz_switchTo(0);

  /* 返回接口，供外部（如自动轮播、键盘导航）复用 */
  return { pzz_switchTo: pzz_switchTo };
}
