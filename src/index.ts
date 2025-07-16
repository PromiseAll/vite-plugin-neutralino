import { type ResolvedConfig, type Plugin, type HtmlTagDescriptor } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';

interface AuthInfo {
    nlPort: number;
}

/**
 * Gets the script tag for development mode by reading the auth info from the .tmp directory.
 * @param root - The project root directory.
 * @returns A promise that resolves to the script tag or null if not applicable.
 */
async function getDevScriptTag(root: string): Promise<HtmlTagDescriptor | null> {
    const authInfoPath = path.join(root, '.tmp', 'auth_info.json');
    try {
        const authInfoFile = await fs.readFile(authInfoPath, { encoding: 'utf-8' });
        const authInfo: AuthInfo = JSON.parse(authInfoFile);
        const port = Number.isInteger(authInfo.nlPort) ? authInfo.nlPort : 0;

        if (port > 0) {
            return {
                tag: 'script',
                attrs: {
                    src: `http://localhost:${port}/__neutralino_globals.js`,
                },
                injectTo: 'head-prepend',
            };
        }
        
        console.warn('[vite-plugin-neutralino] Invalid Neutralino port, script not injected.');
        return null;
    } catch (error) {
        console.warn(`[vite-plugin-neutralino] Could not read Neutralino auth file: ${authInfoPath}, script not injected. Please make sure the Neutralino app is running.`);
        return null;
    }
}

/**
 * Gets the script tag for production mode.
 * @returns The script tag for production.
 */
function getProdScriptTag(): HtmlTagDescriptor {
    return {
        tag: 'script',
        attrs: {
            src: '%PUBLIC_URL%/__neutralino_globals.js',
        },
        injectTo: 'head-prepend',
    };
}

const neutralino = (): Plugin => {
    let config: ResolvedConfig;

    return {
        name: 'vite-plugin-neutralino',
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        async transformIndexHtml() {
            try {
                if (config.mode === 'production') {
                    return [getProdScriptTag()];
                }

                if (config.mode === 'development') {
                    const devTag = await getDevScriptTag(config.root);
                    return devTag ? [devTag] : [];
                }

                return [];
            } catch (error) {
                console.error('[vite-plugin-neutralino] An unexpected error occurred:', error);
                return [];
            }
        },
    };
};

export default neutralino;