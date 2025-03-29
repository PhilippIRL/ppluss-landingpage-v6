// @ts-check

import fs from 'fs'

function tryReadGitCommit() {
    try {
        if(!fs.existsSync('.git')) {
            throw new Error()
        }
        const text = fs.readFileSync('.git/FETCH_HEAD').toString()
        return '#' + text.substring(0,8).toUpperCase()
    } catch(e) {
        return e.toString()
    }
}

/**
 * @type {import('next').NextConfig}
 */
const NextConfig = {
    trailingSlash: true,
    env: {
        'NEXT_PUBLIC_APP_VERSION': tryReadGitCommit(),
    },
    compiler: {
        styledComponents: true,
    },
}

export default NextConfig
