## Description of the "Network Monitor" Program

**Network Monitor** is a utility for monitoring internet connection status, developed using TypeScript and Bun. The program periodically checks the availability of specified hosts (such as DNS servers and websites) using ping and DNS queries, notifying the user about the connection status.

### Key Features:

- **Host Availability Check**: The program periodically checks the availability of specified hosts using ping and DNS queries.
- **Status Notifications**: Users receive notifications about the internet connection status:
    - ❌ **Internet is down**: If all hosts are unreachable.
    - 🔍 **Error checking host**: If an error occurs while checking a specific host.
    - ✅ **Internet is working**: If all hosts are reachable and the internet connection is restored.
- **Customizable Host List**: Users can specify a list of hosts to check via the command line.
- **Configurable Check Schedule**: The program supports cron scheduling to set the frequency of checks.
- **Quiet Mode**: The program can be run in quiet mode, where notifications are only displayed as system notifications without console output.

### Installation and Running:

1. Ensure you have [Bun](https://bun.sh/) installed.
2. Clone the repository and navigate to the project directory.
3. Install dependencies using the command:
   ```bash
   bun install
   ```
4. Run the program with the command:
   ```bash
   bun run build
   bun monitor.ts --hosts "8.8.8.8,1.1.1.1,example.com" --schedule "*/5 * * * *" --quiet
   ```

### Usage Examples:

- Check the availability of standard DNS servers:
  ```bash
  bun monitor.ts --hosts "8.8.8.8,1.1.1.1" --schedule "*/5 * * * *"
  ```

- Run in quiet mode:
  ```bash
  bun monitor.ts --hosts "example.com" --schedule "*/10 * * * *" --quiet
  ```

### License

The program is distributed under the MIT License. You are free to use, modify, and distribute it in accordance with the terms of the license.

---

Feel free to adapt this description according to your preferences and the specific features of your program.

---

## Описание программы "Network Monitor"

**Network Monitor** — это утилита для мониторинга состояния интернет-соединения, разработанная с использованием TypeScript и Bun. Программа проверяет доступность заданных хостов (например, DNS-серверов и веб-сайтов) с помощью ping и DNS-запросов, уведомляя пользователя о состоянии соединения.

### Основные функции:

- **Проверка доступности хостов**: Программа периодически проверяет доступность заданных хостов, используя ping и DNS-запросы.
- **Уведомления о состоянии**: Пользователь получает уведомления о состоянии интернет-соединения:
    - ❌ **Internet is down**: Если все хосты недоступны.
    - 🔍 **Error checking host**: Если произошла ошибка при проверке конкретного хоста.
    - ✅ **Internet is working**: Если все хосты доступны и интернет-соединение восстановлено.
- **Настраиваемый список хостов**: Пользователь может указать список хостов для проверки через командную строку.
- **Настраиваемый график проверок**: Программа поддерживает cron-расписание для настройки частоты проверок.
- **Тихий режим**: Возможность запуска программы в тихом режиме, при котором уведомления выводятся только в виде системных уведомлений, без вывода в консоль.

### Установка и запуск:

1. Убедитесь, что у вас установлен [Bun](https://bun.sh/).
2. Клонируйте репозиторий и перейдите в директорию проекта.
3. Установите зависимости с помощью команды:
   ```bash
   bun install
   ```
4. Запустите программу с помощью команды:
   ```bash
   bun run build
   bun monitor.ts --hosts "8.8.8.8,1.1.1.1,example.com" --schedule "*/5 * * * *" --quiet
   ```

### Примеры использования:

- Проверка доступности стандартных DNS-серверов:
  ```bash
  bun monitor.ts --hosts "8.8.8.8,1.1.1.1" --schedule "*/5 * * * *"
  ```

- Запуск в тихом режиме:
  ```bash
  bun monitor.ts --hosts "example.com" --schedule "*/10 * * * *" --quiet
  ```

### Лицензия

Программа распространяется под лицензией MIT. Вы можете свободно использовать, изменять и распространять её в соответствии с условиями лицензии.

---

Вы можете адаптировать это описание в зависимости от ваших предпочтений и особенностей программы.