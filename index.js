const path = require('path')

module.exports = function vkPixelModule (moduleOptions) {
    const defaults = {
        version: '169'
    }

    // Don't include on dev mode
    if (this.options.dev && process.env.NODE_ENV !== 'production') {
        return
    }

    if (!moduleOptions.id)
        throw new Error('The `id` option is required.')

    const options = Object.assign({}, defaults, moduleOptions)

    const scriptUrl = `https://vk.com/js/api/openapi.js?${options.version}`

    this.options.head.script.push({
        src: scriptUrl,
        async: true
    })

    this.addPlugin({
        src: path.resolve(__dirname, './plugin.js'),
        ssr: false,
        options
    })
}

module.exports.meta = require('./package.json')
