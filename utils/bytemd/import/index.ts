// 导入主题列表常量
import { themeList as themeMap } from '~/utils/constant';

// 定义环境变量类型
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_APP_DOMAIN: string;
        }
    }
}

// 获取环境变量中的域名
const DOMAIN = import.meta.env.VITE_APP_DOMAIN;

// 初始主题
let m: string = 'github';

// 定义主题插件的选项类型
interface ThemePluginOptions {
    onThemeChange?: (themeName: string) => void;
    themeList?: string[];
}

// 定义查看器效果参数类型
interface ViewerEffectParams {
    markdownBody: HTMLElement;
}

// 定义操作处理程序类型
interface ActionHandler {
    type: 'action';
    click: (params: { editor: any }) => void;
}

// 定义下拉操作项类型
interface DropdownAction {
    title: string;
    handler: ActionHandler;
}

// 定义下拉操作处理程序类型
interface DropdownHandler {
    type: 'dropdown';
    actions: DropdownAction[];
}

// 定义操作项类型
interface Action {
    title: string;
    icon: string;
    handler: DropdownHandler;
}

// 定义主题插件返回值类型
interface ThemePluginReturn {
    viewerEffect: (params: ViewerEffectParams) => void;
    actions: Action[];
}

// 主题插件函数
function themePlugin(options: ThemePluginOptions = {}): ThemePluginReturn {
    if (options.onThemeChange && typeof options.onThemeChange !== 'function') {
        console.error('onThemeChange 必须为函数');
    }
    return {
        viewerEffect({markdownBody}) {
            const themeHTag = markdownBody.getElementsByTagName('h2')[0];
            if (themeHTag && /theme|highlight/.test(themeHTag.innerText)) {
                for (let i = 0; i < markdownBody.childNodes.length; i++) {
                    const child = markdownBody.childNodes[i] as HTMLElement;
                    if (child && child.style) {
                        child.style.display = 'none';
                    }
                    if (child === themeHTag) {
                        break;
                    }
                }
            }
        },
        actions: [
            {
                title: 'Markdown 主题',
                icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V6C2 6.36819 2.29848 6.66667 2.66667 6.66667H6C6.36819 6.66667 6.66667 6.36819 6.66667 6V2.66667C6.66667 2.29848 6.36819 2 6 2Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
        <path d="M6 9.3335H2.66667C2.29848 9.3335 2 9.63197 2 10.0002V13.3335C2 13.7017 2.29848 14.0002 2.66667 14.0002H6C6.36819 14.0002 6.66667 13.7017 6.66667 13.3335V10.0002C6.66667 9.63197 6.36819 9.3335 6 9.3335Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
        <path d="M13.3334 2H10C9.63185 2 9.33337 2.29848 9.33337 2.66667V6C9.33337 6.36819 9.63185 6.66667 10 6.66667H13.3334C13.7016 6.66667 14 6.36819 14 6V2.66667C14 2.29848 13.7016 2 13.3334 2Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
        <path d="M13.3334 9.3335H10C9.63185 9.3335 9.33337 9.63197 9.33337 10.0002V13.3335C9.33337 13.7017 9.63185 14.0002 10 14.0002H13.3334C13.7016 14.0002 14 13.7017 14 13.3335V10.0002C14 9.63197 13.7016 9.3335 13.3334 9.3335Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
        </svg>`,
                handler: {
                    type: 'dropdown',
                    actions: (options.themeList || themeMap).map((item) => ({
                        title: item,
                        handler: {
                            type: 'action',
                            click({editor}) {
                                // 移除旧的样式并加载新的样式
                                loadTheme(item);
                                options.onThemeChange && options.onThemeChange(item);
                                editor.focus();
                            }
                        }
                    }))
                }
            }
        ]
    };
}

// 移除旧的样式并加载新的样式
function loadTheme(themeName: string): void {
    // 清除旧的样式，这可能涉及到删除特定的CSS类或链接
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
        if (link.getAttribute('theme')) {
            link.remove(); // 移除旧的CSS链接
        }
    });

    // 加载新的CSS样式
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = `http://${DOMAIN}/static/md/markdown/${themeName}.min.css`;
    newLink.setAttribute('theme', themeName);
    document.head.appendChild(newLink);
    m = themeName;
}

// 获取当前主题
function getTheme(): string {
    return m;
}

export {
    themePlugin as default,
    loadTheme,
    getTheme
};