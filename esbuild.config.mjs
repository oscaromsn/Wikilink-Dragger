import esbuild from 'esbuild';
import process from 'node:process';

const banner = `/* your banner */`;

const prod = process.argv[2] === "production";

try {
  if (prod) {
    await esbuild.build({
      banner: { js: banner },
      entryPoints: ["src/main.ts"],
      bundle: true,
      external: ["obsidian", "electron", /* ... */],
      format: "esm",
      platform: "node",
      target: "es2022",
      outfile: "dist/main.mjs",
      minify: true,
      sourcemap: "linked",
      treeShaking: true,
    });
    process.exit(0);
  } else {
    const ctx = await esbuild.context({
      banner: { js: banner },
      entryPoints: ["src/main.ts"],
      bundle: true,
      external: ["obsidian", "electron", /* ... */],
      format: "esm",
      platform: "node",
      target: "es2022",
      outfile: "dist/main.mjs",
      sourcemap: "inline",
      treeShaking: true,
    });

    await ctx.watch();
    console.log('Watching for changes... (Press Ctrl+C to exit)');

    // Keep process alive until interrupted
    await new Promise((resolve) => {
      process.on('SIGINT', resolve); // Handle Ctrl+C
      process.on('SIGTERM', resolve); // Handle termination signals
    });

    await ctx.dispose();
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}
