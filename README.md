# Network Monitor

## Overview

Network Monitor is a simple yet powerful tool that checks the availability of specified hosts and monitors internet connectivity. It uses ping and DNS lookup to determine the status of the network and can execute custom commands based on the connectivity status. Notifications can be sent to alert users of any changes in network status.

## Features

- Check multiple hosts for connectivity using ping and DNS lookup.
- Customizable schedule using cron expressions.
- Execute commands on specific network events (up, down, DNS issues).
- Notifications for network status changes.
- Quiet mode to suppress console output.

## Installation

- linux
  1) download `network_monitor.deb` form release
  2) run `sudo apt install ./network_monitor.deb`
  3) run `sudo systemctl start network_monitor.service`
  4) run `sudo systemctl enable network_monitor.service`
- windows
  1) download `network_monitor_installer.exe` form release
  2) install
- macos
  - ¯\_(ツ)_/¯

## development
To use Network Monitor, you need to have and Bun installed. You can install the required dependencies using bun:

```bash
bun install node-cron ping dns node-notifier cron-schedule
```

## Building the Application

You can build the Network Monitor application for different platforms using the provided build script. The script compiles the application for Windows, Linux, and macOS, and creates a `.deb` package for Linux distributions.

### Build Steps

1. **Clone the repository** and navigate to the project directory.
2. **Run the build script** using Bun:

```bash
bun run build.js
```

### Output

- The compiled binaries will be located in the `dist` directory:
    - Windows: `dist/win/network_monitor`
    - Linux: `dist/linux/network_monitor`
    - macOS (ARM): `dist/mac/network_monitor_arm`
    - macOS (x86): `dist/mac/network_monitor_x86`

- A `.deb` package for Debian-based systems will be created at `dist/linux/network_monitor.deb`.

### Installing the .deb Package

To install the `.deb` package, use the following command:

```bash
sudo dpkg -i dist/linux/network_monitor.deb
```

This will install the Network Monitor and set it up as a systemd service.

### Windows Installer

An installer for Windows will also be created using NSIS. You can find the installer in the `dist` directory after running the build script.

## Usage

You can run the Network Monitor with various options:

```bash
node NetworkMonitor.js [options]
```

### Options

- `--hosts, -h <host1,host2,...>`: Comma-separated list of hosts to check (default: `8.8.8.8,1.1.1.1,example.com`).
- `--schedule, -s <cron_schedule>`: Cron schedule for checks (default: `*/5 * * * *`).
- `--quiet, -q`: Run in quiet mode (no console output).
- `--disable-notifications`: Disable notifications.
- `--on-up <command>`: Command to execute when status is up.
- `--on-down <command>`: Command to execute when status is down.
- `--on-dns-issue <command>`: Command to execute when there is a DNS issue.
- `--help, -h`: Show this help message.

### Example

To check the connectivity of Google DNS and Cloudflare DNS every minute and execute a command when the status changes, you can run:

```bash
node NetworkMonitor.js --hosts 8.8.8.8,1.1.1.1 --schedule '* * * * *' --on-up 'echo "Internet is up!"' --on-down 'echo "Internet is down!"'
```

## License

This project is licensed under the MIT License.

---

# Монитор сети

## Обзор

Монитор сети — это простой, но мощный инструмент, который проверяет доступность указанных хостов и отслеживает подключение к интернету. Он использует ping и DNS-запросы для определения статуса сети и может выполнять пользовательские команды в зависимости от состояния подключения. Уведомления могут быть отправлены, чтобы оповестить пользователей о любых изменениях в статусе сети.

## Особенности

- Проверка нескольких хостов на доступность с помощью ping и DNS-запросов.
- Настраиваемый график с использованием cron-выражений.
- Выполнение команд при определенных сетевых событиях (включение, отключение, проблемы с DNS).
- Уведомления об изменениях статуса сети.
- Режим тихой работы для подавления вывода в консоль.

## Установка

- Linux
  1) Скачайте `network_monitor.deb` из релиза.
  2) Выполните `sudo apt install ./network_monitor.deb`.
  3) Запустите `sudo systemctl start network_monitor.service`.
  4) Выполните `sudo systemctl enable network_monitor.service`.
- Windows
  1) Скачайте `network_monitor_installer.exe` из релиза.
  2) Установите.
- macOS
  - ¯\_(ツ)_/¯

## Разработка
Чтобы использовать Монитор сети, вам необходимо установить Bun. Вы можете установить необходимые зависимости с помощью bun:

```bash
bun install node-cron ping dns node-notifier cron-schedule
```

## Сборка приложения

Вы можете собрать приложение Монитор сети для различных платформ, используя предоставленный скрипт сборки. Скрипт компилирует приложение для Windows, Linux и macOS и создает пакет `.deb` для дистрибутивов на базе Debian.

### Шаги сборки

1. **Клонируйте репозиторий** и перейдите в каталог проекта.
2. **Запустите скрипт сборки** с помощью Bun:

```bash
bun run build.js
```

### Вывод

- Скомпилированные бинарные файлы будут находиться в каталоге `dist`:
  - Windows: `dist/win/network_monitor`
  - Linux: `dist/linux/network_monitor`
  - macOS (ARM): `dist/mac/network_monitor_arm`
  - macOS (x86): `dist/mac/network_monitor_x86`

- Пакет `.deb` для систем на базе Debian будет создан в `dist/linux/network_monitor.deb`.

### Установка пакета .deb

Чтобы установить пакет `.deb`, используйте следующую команду:

```bash
sudo dpkg -i dist/linux/network_monitor.deb
```

Это установит Монитор сети и настроит его как службу systemd.

### Установщик для Windows

Установщик для Windows также будет создан с использованием NSIS. Вы можете найти установщик в каталоге `dist` после выполнения скрипта сборки.

## Использование

Вы можете запустить Монитор сети с различными параметрами:

```bash
node NetworkMonitor.js [options]
```

### Параметры

- `--hosts, -h <host1,host2,...>`: Список хостов для проверки, разделенный запятыми (по умолчанию: `8.8.8.8,1.1.1.1,example.com`).
- `--schedule, -s <cron_schedule>`: Расписание cron для проверок (по умолчанию: `*/5 * * * *`).
- `--quiet, -q`: Запуск в тихом режиме (без вывода в консоль).
- `--disable-notifications`: Отключить уведомления.
- `--on-up <command>`: Команда для выполнения, когда статус "включен".
- `--on-down <command>`: Команда для выполнения, когда статус "выключен".
- `--on-dns-issue <command>`: Команда для выполнения, когда возникает проблема с DNS.
- `--help, -h`: Показать это сообщение помощи.

### Пример

Чтобы проверить подключение к DNS Google и DNS Cloudflare каждую минуту и выполнить команду при изменении статуса, вы можете запустить:

```bash
node NetworkMonitor.js --hosts 8.8.8.8,1.1.1.1 --schedule '* * * * *' --on-up 'echo "Интернет работает!"' --on-down 'echo "Интернет не работает!"'
```

## Лицензия

Этот проект лицензирован под лицензией MIT.

---

