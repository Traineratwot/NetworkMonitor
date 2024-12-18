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

To use Network Monitor, you need to have Node.js and Bun installed. You can install the required dependencies using npm:

```bash
npm install node-cron ping dns node-notifier cron-schedule
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

Монитор сети — это простой, но мощный инструмент, который проверяет доступность указанных хостов и отслеживает подключение к интернету. Он использует ping и DNS-запросы для определения статуса сети и может выполнять пользовательские команды в зависимости от статуса подключения. Уведомления могут быть отправлены для оповещения пользователей о любых изменениях в статусе сети.

## Возможности

- Проверка нескольких хостов на доступность с помощью ping и DNS-запросов.
- Настраиваемый график с использованием cron-выражений.
- Выполнение команд при определенных событиях сети (включение, отключение, проблемы с DNS).
- Уведомления об изменениях статуса сети.
- Тихий режим для подавления вывода в консоль.

## Установка

Чтобы использовать Монитор сети, вам необходимо установить Node.js и Bun. Вы можете установить необходимые зависимости с помощью npm:

```bash
npm install node-cron ping dns node-notifier cron-schedule
```

## Сборка приложения

Вы можете собрать приложение Монитор сети для различных платформ, используя предоставленный скрипт сборки. Скрипт компилирует приложение для Windows, Linux и macOS, а также создает пакет `.deb` для дистрибутивов на базе Debian.

### Шаги сборки

1. **Клонируйте репозиторий** и перейдите в директорию проекта.
2. **Запустите скрипт сборки** с помощью Bun:

```bash
bun run build.js
```

### Выходные данные

- Скомпилированные бинарные файлы будут находиться в директории `dist`:
    - Windows: `dist/win/network_monitor`
    - Linux: `dist/linux/network_monitor`
    - macOS (ARM): `dist/mac/network_monitor_arm`
    - macOS (x86): `dist/mac/network_monitor_x86`

- Пакет `.deb` для систем на базе Debian будет создан по адресу `dist/linux/network_monitor.deb`.

### Установка .deb пакета

Чтобы установить `.deb` пакет, используйте следующую команду:

```bash
sudo dpkg -i dist/linux/network_monitor.deb
```

Это установит Монитор сети и настроит его как службу systemd.

### Установщик для Windows

Установщик для Windows также будет создан с помощью NSIS. Вы можете найти установщик в директории `dist` после выполнения скрипта сборки.

## Использование

Вы можете запустить Монитор сети с различными параметрами:

```bash
node NetworkMonitor.js [options]
```

### Параметры

- `--hosts, -h <host1,host2,...>`: Список хостов через запятую для проверки (по умолчанию: `8.8.8.8,1.1.1.1,example.com`).
- `--schedule, -s <cron_schedule>`: Расписание для проверок (по умолчанию: `*/5 * * * *`).
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