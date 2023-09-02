const fs = require('fs')

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

module.exports = {
    trailingSlash: true,
    env: {
        'NEXT_PUBLIC_APP_VERSION': tryReadGitCommit(),
    },
    compiler: {
        styledComponents: true,
    },
}
