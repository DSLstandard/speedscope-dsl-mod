import * as esbuild from 'esbuild'
import {buildOptions, generateIndexHtml} from './esbuild-shared'

async function main() {
  const outdir = 'dist'
  let ctx = await esbuild.context({
    ...buildOptions,
    outdir,
    write: false,
    metafile: true,
    plugins: [
      {
        name: 'speedscope-dev-server',
        setup(build) {
          build.onEnd(buildResult => {
            generateIndexHtml({
              buildResult,
              outdir,
              servingProtocol: 'http',
            })
          })
        },
      },
    ],
  })

  await ctx.rebuild()

  // Reference: https://esbuild.github.io/api/#serve-arguments
  let {host, port} = await ctx.serve({
    servedir: outdir,
    host: "localhost", // esbuild defaults to 0.0.0.0. don't.
  })

  console.log(`Server is running at http://${host}:${port}`)
}

main()
