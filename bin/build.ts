import { $ } from "bun";

await $`bun build --compile --target=bun-windows-x64 --outfile './dist/win/network_monitor' './src/index.ts'`
await $`bun build --compile --target=bun-linux-x64 --outfile './dist/linux/network_monitor' './src/index.ts'`
await $`bun build --compile --target=bun-darwin-arm64 --outfile './dist/mac/network_monitor_arm' './src/index.ts'`
await $`bun build --compile --target=bun-darwin-x64 --outfile './dist/mac/network_monitor_x86' './src/index.ts'`