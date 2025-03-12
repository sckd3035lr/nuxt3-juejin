// 导入常量
import { codeStyleList as codeStyleMap } from '~/utils/constant';

// 定义环境变量类型
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_APP_DOMAIN: string;
        }
    }
}

// 获取环境变量
const DOMAIN = import.meta.env.VITE_APP_DOMAIN;

// 定义 options 对象的类型
interface CodeStylePluginOptions {
    onCodeStyleChange?: (style: string) => void;
    codeStyleList?: string[];
}

// 定义 action 对象的类型
interface Action {
    title: string;
    icon: string;
    handler: {
        type: 'dropdown';
        actions: {
            title: string;
            handler: {
                type: 'action';
                click: (params: { editor: any }) => void;
            };
        }[];
    };
}

// 定义 viewerEffect 参数的类型
interface ViewerEffectParams {
    markdownBody: any;
}

// 定义插件返回值的类型
interface CodeStylePluginReturn {
    viewerEffect: (params: ViewerEffectParams) => void;
    actions: Action[];
}

// 代码样式插件函数
function codeStylePlugin(options: CodeStylePluginOptions = {}): CodeStylePluginReturn {
    if (options.onCodeStyleChange && typeof options.onCodeStyleChange !== 'function') {
        console.error('onCodeStyleChange 必须为函数');
    }

    return {
        viewerEffect({markdownBody}) {
            // 这里可以添加具体的逻辑
        },
        actions: [
            {
                title: '代码样式',
                icon: `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"></rect><path d="M6 44L6 25H12V17H36V25H42V44H6Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"></path><path d="M17 17V8L31 4V17" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
                handler: {
                    type: 'dropdown',
                    actions: (options.codeStyleList || codeStyleMap).map((item) => ({
                        title: item,
                        handler: {
                            type: 'action',
                            click({editor}) {
                                // 移除旧的样式并加载新的样式
                                loadCodeStyle(item);
                                options.onCodeStyleChange && options.onCodeStyleChange(item);
                                editor.focus();
                            },
                        },
                    })),
                },
            },
        ],
    };
}

// 移除旧的样式并加载新的样式
function loadCodeStyle(style: string): void {
    // 清除旧的样式，这可能涉及到删除特定的CSS类或链接
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
        if (link.getAttribute('code-style')) {
            link.remove(); // 移除旧的CSS链接
        }
    });

    // 加载新的CSS样式
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = `http://${DOMAIN}/static/md/highlightjs/styles/${style}.min.css`;
    newLink.setAttribute('code-style', style);
    document.head.appendChild(newLink);
}

export { codeStylePlugin as default, loadCodeStyle };