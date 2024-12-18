import cron from 'node-cron';
import ping from 'ping';
import dns from 'dns';
import notifier from 'node-notifier';
import {parseCronExpression} from 'cron-schedule';

// Значения по умолчанию
const DEFAULT_HOSTS = '8.8.8.8,1.1.1.1,example.com';
const DEFAULT_SCHEDULE = '*/5 * * * * *';

// Флаг для тихого режима
let isQuietMode = false;

// Хранение состояния хостов
const hostStatus: { [key: string]: { ping: boolean; dns: boolean } } = {};
let lastInternetStatus: 'up' | 'down' | 'dnsIssue' = 'up';
let lastErrorHost: string | null = null;

// Функция для проверки соединения
async function checkConnection(hosts: string[], timeout: number): Promise<void> {
    let allHostsReachable = true;
    let allHostsDnsReachable = true;

    const timeoutPromise = new Promise<void>((_, reject) => {
        setTimeout(() => {
            reject(new Error('Check connection timed out'));
        }, timeout);
    });

    const checkPromises = hosts.map(async (host) => {
        try {
            // Проверка ping
            const res = await ping.promise.probe(host);
            hostStatus[host] = {ping: res.alive, dns: false}; // Изначально DNS статус не проверен

            if (!res.alive) {
                allHostsReachable = false; // Если хотя бы один хост недоступен по ping
            }

            // Проверка DNS
            await new Promise<void>((resolve, reject) => {
                dns.lookup(host, (err) => {
                    if (err) {
                        hostStatus[host].dns = false; // DNS недоступен
                        allHostsDnsReachable = false; // Если хотя бы один хост недоступен по DNS
                        reject(err);
                    } else {
                        hostStatus[host].dns = true; // DNS доступен
                        resolve();
                    }
                });
            });
        } catch (error) {
            if (!isQuietMode) {
                console.error(`Error checking host ${host}: ${(error as Error).message}`);
            }
            lastErrorHost = host; // Запоминаем последний хост с ошибкой
        }
    });

    try {
        await Promise.race([Promise.all(checkPromises), timeoutPromise]);
    } catch (error) {
        if (error instanceof Error && error.message === 'Check connection timed out') {
            allHostsReachable = false; // Если таймаут, считаем, что интернет недоступен
        }
    }

    // Уведомления в зависимости от состояния
    if (!allHostsReachable) {
        if (lastInternetStatus !== 'down') {
            notifyUser(`❌ Internet is down! All hosts are unreachable.`);
            lastInternetStatus = 'down';
        }
    } else if (lastErrorHost) {
        if (lastInternetStatus !== 'dnsIssue') {
            notifyUser(`🔍 Error checking host ${lastErrorHost}.`);
            lastInternetStatus = 'dnsIssue';
        }
    } else {
        if (lastInternetStatus !== 'up') {
            notifyUser(`✅ Internet is working! All hosts are reachable.`);
            lastInternetStatus = 'up';
        }
        if (!isQuietMode) {
            console.log(`✅ Internet is working! All hosts are reachable.`);
        }
    }
}

// Функция для отправки уведомлений
function notifyUser(message: string): void {
    notifier.notify({
        title: 'Network Monitor',
        message: message,
        sound: true, // Включить звук уведомления
    });
}

// Функция для вывода справки
function printHelp(): void {
    console.log('Usage: bun monitor.ts [options]');
    console.log('Options:');
    console.log('  --hosts, -h <host1,host2,...>   Comma-separated list of hosts to check (default: 8.8.8.8,1.1.1.1,example.com)');
    console.log('  --schedule, -s <cron_schedule>   Cron schedule for checks (default: */5 * * * *)');
    console.log('  --quiet, -q                      Run in quiet mode (no console output)');
    console.log('  --help, -h                       Show this help message');
}

// Получение аргументов командной строки
const args = process.argv.slice(2);
let hostsArg = DEFAULT_HOSTS;
let scheduleArg = DEFAULT_SCHEDULE;

// Обработка аргументов
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--help' || args[i] === '-h') {
        printHelp();
        process.exit(0);
    } else if (args[i] === '--hosts' || args[i] === '-h') {
        hostsArg = args[++i] || DEFAULT_HOSTS; // Получаем следующий аргумент
    } else if (args[i] === '--schedule' || args[i] === '-s') {
        scheduleArg = args[++i] || DEFAULT_SCHEDULE; // Получаем следующий аргумент
    } else if (args[i] === '--quiet' || args[i] === '-q') {
        isQuietMode = true; // Включаем тихий режим
    }
}

// Преобразование аргумента hosts в массив
const hosts = hostsArg.split(',').map(host => host.trim());

// Запланировать выполнение задачи по указанному расписанию
cron.schedule(scheduleArg, () => {
    const taskDelay = parseCronExpression(scheduleArg).getNextDate().getTime() - new Date().getTime();
    const timeout = Math.min(taskDelay, 10000); // Ограничение по времени: taskDelay или 10 секунд
    checkConnection(hosts, timeout).catch(console.error);
});

// Запуск проверки при старте скрипта
await checkConnection(hosts, 10000); // Начальная проверка с таймаутом 10 секунд
console.log('next run', parseCronExpression(scheduleArg).getNextDate());