import * as dom from '../../utils/dom.js'
import Popper from '../../utils/Popper/popper.js'
import './index.scss'

let addClass = dom.addClass

import Vue from 'vue'
const vm = new Vue()
let elStore = [];



/**
 * description:做权限的拦截处理
 */
export default {
    bind: (el, binding, vnode) => {
        Vue.nextTick(() => {
            elStore.push({
                el: el,
                parentNode: vnode.elm.parentNode,
                nextSibling: vnode.elm.nextSibling,
                active: true,
                placeTag: null,// 纯样式节点
                popper: null, // 提示节点
                Popper: null, // Popper实例
            })
            middleware(el, binding, vnode)

        })
    },
    update: (el, binding, vnode) => {
        Vue.nextTick(() => {
            middleware(el, binding, vnode)
        })

    },
    unbind: (el, binding, vnode) => {
        Vue.nextTick(() => {
            let cur = getCur(el);
            elStore = elStore.filter((item) => {
                return item.el !== el
            })
        })
    }
}

function middleware(el, binding, vnode) {
    [...document.querySelectorAll('.permission-tips')].forEach((node) => {
        node.style.display = 'none'
    })
    if (Array.isArray(binding.value)) {
        checkVisible(el, binding, vnode)
    }
}

// 检测权限  仅当权限列表变更时触发
function checkVisible(el, binding, vnode) {
    const kind = binding.arg
    const codelist = binding.modifiers
    const permissions = binding.value
    let hasPermission = false;
    for (var code in codelist) {
        hasPermission = permissions.some(item => item == code)
        if (hasPermission) break;
    }
    let cur = getCur(el);
    let errorMsg = el.getAttribute('permission-tips');
    //  有权限                                 无权限
    if ((hasPermission && !cur.active) || (!hasPermission && cur.active)) {
        cur.active = !cur.active;

        switch (kind) {
            case 'render':
                if (hasPermission) {
                    insertNode(cur, el)
                } else {
                    cur.parentNode.removeChild(el)
                }
                break;
            case 'disable':
                if (hasPermission) {
                    nodeReplace(cur.el, cur.placeTag)
                } else {
                    if (!cur.placeTag) {

                        // 创建占位节点
                        let placeTag = createPlaceTag({
                            vnode,
                            cb: () => {
                                errorMsg && errorFun(errorMsg)()
                            }
                        })
                        cur.placeTag = placeTag

                    }
                    addListen(cur, binding, vnode)
                    nodeReplace(cur.placeTag, cur.el)
                }
                break;
            case 'hover':
                if (hasPermission) {
                    nodeReplace(cur.el, cur.placeTag)
                } else {
                    if (!cur.placeTag) {
                        let placeTag = createPlaceTag({
                            vnode,
                        })

                        createPopper({
                            el,
                            placeTag,
                            cur,
                            errorMsg
                        })
                        placeTag.style.cursor = 'not-allowed';
                        addClass(placeTag, 'permissions-disabled')
                        cur.placeTag = placeTag;
                    }
                    addListen(cur, binding, vnode)
                    nodeReplace(cur.placeTag, cur.el)

                }
                break;
            default: break;
        }
    }
}

/**
 * @description 添加监听
 */
function addListen(cur, binding, vnode) {
    var observer = new MutationObserver(function (res) {
        if (document.body.contains(cur.placeTag)) {

            let errorMsg = cur.el.getAttribute('permission-tips');
            switch (binding.arg) {
                case 'disable':
                    let newPlaceTag = createPlaceTag({
                        vnode,
                        cb: () => {
                            errorMsg && errorFun(errorMsg)()
                        }
                    })
                    nodeReplace(newPlaceTag, cur.placeTag)
                    cur.placeTag = newPlaceTag;

                    break;
                case 'hover':

                    let newPlaceTag1 = createPlaceTag({
                        vnode,
                    })

                    createPopper({
                        el: cur.el,
                        placeTag: newPlaceTag1,
                        cur,
                        errorMsg
                    })

                    newPlaceTag1.style.cursor = 'not-allowed';
                    addClass(newPlaceTag1, 'permissions-disabled')

                    nodeReplace(newPlaceTag1, cur.placeTag)
                    cur.placeTag = newPlaceTag1;
                    break;

            }
        }

    });
    observer.observe(cur.el, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
    });
}

// 节点替换
function nodeReplace(newEl, oldEl) {
    oldEl.parentNode.insertBefore(newEl, oldEl)
    oldEl.parentNode.removeChild(oldEl)
}

/**
 * @description  创建占位节点
 */
function createPlaceTag({
    vnode,
    cb
}) {
    let placeTag = getTagFromStr(vnode.elm.outerHTML)
    let listener = vnode.componentInstance && vnode.componentInstance.$listeners
    let events = Object.assign({ click: null }, listener, vnode.data.on)
    Object.keys(events).forEach((item) => {
        placeTag.addEventListener(item, (e) => {
            cb && cb()
            e.stopPropagation()
        })
    })
    return placeTag
}

/**
 * @description 创建Popper节点
 */
function createPopper({
    el,
    placeTag,
    cur,
    errorMsg
}) {
    let placement = el.getAttribute('placement')
    let odiv = cur.popper || createTipEle(errorMsg);
    placeTag.events = {
        mouseenter: function (e) {
            odiv.style.display = "block";
            cur.Popper.update()
            e.stopPropagation()
        },
        mouseleave: function (e) {
            odiv.style.display = "none";
            e.stopPropagation()
        }
    }
    Object.keys(placeTag.events).forEach((key) => {
        placeTag.addEventListener(key, placeTag.events[key])
    })
    cur.Popper && cur.Popper.destroy()
    Vue.nextTick(() => {
        cur.Popper = new Popper(placeTag, odiv, {
            placement: placement || 'top'
        })
    })
    cur.popper = odiv;
}

/**
 * @description 创建提示节点
 */
function createTipEle(errorMsg) {
    let odiv = document.createElement('div');
    odiv.className = 'permission-tips';
    odiv.innerHTML = errorMsg;

    // 添加三角形
    appendArrow(odiv)

    document.body.appendChild(odiv)
    return odiv
}


/**
 * @description 创建三角形
 */
function appendArrow(element) {
    if (element.querySelector('popper__arrow')) {
        return;
    }
    const arrow = document.createElement('div');
    arrow.setAttribute('x-arrow', '');
    arrow.className = 'popper__arrow';
    element.appendChild(arrow);
}



function errorFun(errorMsg) {
    
    
    return function () {
        vm.Alert({
            type: 'warning',
            message: errorMsg || '你暂无权限'
        })
    }
}
// 将DOM字符串转换为dom节点
function getTagFromStr(str) {
    let oDiv = document.createElement('div');
    oDiv.innerHTML = str;
    return oDiv.children[0];
}

// 将节点插入原位
function insertNode(cur, el) {
    if (cur.nextSibling) {
        cur.parentNode.insertBefore(el, cur.nextSibling)
    } else {
        cur.parentNode.appendChild(el)
    }
}

// 获取当前节点
function getCur(el) {
    return elStore.filter((item) => {
        return item.el === el;
    })[0] || {};
}