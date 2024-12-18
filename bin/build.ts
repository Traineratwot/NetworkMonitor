import {$} from "bun";
import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
fs.rmdirSync(path.join(projectRoot, "dist"), {recursive: true});
// Компиляция для разных платформ
await $`bun build --compile --target=bun-windows-x64 --outfile './dist/win/network_monitor_x86' './src/index.ts'`
await $`bun build --compile --target=bun-linux-x64 --outfile './dist/linux/network_monitor_x86' './src/index.ts'`
await $`bun build --compile --target=bun-linux-arm64 --outfile './dist/linux/network_monitor_arm64' './src/index.ts'`
await $`bun build --compile --target=bun-darwin-arm64 --outfile './dist/mac/network_monitor_darwin_arm64' './src/index.ts'`
await $`bun build --compile --target=bun-darwin-x64 --outfile './dist/mac/network_monitor_darwin_x86' './src/index.ts'`

// Создание структуры для .deb пакета
async function build_deb(arch: string = 'x86') {
    const debDir = path.join(projectRoot, 'dist', 'deb');
    const binDir = path.join(debDir, 'usr', 'local', 'bin');
    const serviceDir = path.join(debDir, 'etc', 'systemd', 'system');

    // Создание необходимых директорий
    fs.mkdirSync(binDir, {recursive: true});
    fs.mkdirSync(serviceDir, {recursive: true});

    // Копирование бинарного файла в пакет
    fs.copyFileSync(path.join(projectRoot, 'dist', 'linux', `network_monitor_${arch}`), path.join(binDir, 'network_monitor'));

    // Создание файла службы systemd
    const serviceFile = `
[Unit]
Description=Network Monitor Service
After=network.target

[Service]
ExecStart=/usr/local/bin/network_monitor --quiet
Restart=always

[Install]
WantedBy=multi-user.target
`.trim();

    fs.writeFileSync(path.join(serviceDir, 'network_monitor.service'), serviceFile);

    // Создание файла control
    const controlFile = `
Package: network-monitor
Version: 1.0.0
Section: utils
Priority: optional
Architecture: amd64
Maintainer: Traineratwot <traineratwot@yandex.ru>
Description: A network monitoring tool that checks internet connectivity.
`.trim() + '\n'; // Добавляем новую строку в конце

    fs.mkdirSync(path.join(debDir, 'DEBIAN'), {recursive: true});
    fs.writeFileSync(path.join(debDir, 'DEBIAN', 'control'), controlFile);

    // Создание .deb пакета
    await $`dpkg-deb --build ${debDir} ${path.join(projectRoot, 'dist', 'linux', `network_monitor_${arch}.deb`)}`;
}

await build_deb('x86')
await build_deb('arm64')

// Создание установщика для Windows
{
    const nsisScriptPath = path.join(projectRoot, 'bin', 'installer.nsi');
    await $`makensis ${nsisScriptPath}`;
}